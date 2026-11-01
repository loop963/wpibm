/* xlsx.js —— 轻量 Excel(.xlsx) 读写，无第三方依赖
 *
 * 读：自己解析 zip 中央目录，STORE / DEFLATE 都支持（DEFLATE 走浏览器原生
 *     DecompressionStream，Chrome 103+ / Safari 16.4+ / Firefox 113+）。
 *     取 workbook.xml 里的第一个工作表，返回二维数组（数字为 number，文本为 string）。
 * 写：生成 STORE（不压缩）方式的 xlsx，字符串用 inlineStr，Excel / WPS / Numbers 均可打开。
 *
 * 只处理第一个工作表，够这个应用用了。
 */
(function (global) {
  "use strict";

  const enc = new TextEncoder();
  const dec = new TextDecoder("utf-8");
  const REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

  /* ---------------- ZIP 读取 ---------------- */

  function findEOCD(dv, len) {
    const min = Math.max(0, len - 66000);
    for (let i = len - 22; i >= min; i--) {
      if (dv.getUint32(i, true) === 0x06054b50) return i;
    }
    return -1;
  }

  function listEntries(bytes) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const eocd = findEOCD(dv, bytes.length);
    if (eocd < 0) throw new Error("不是有效的 xlsx（zip 结构损坏）");
    const count = dv.getUint16(eocd + 10, true);
    let off = dv.getUint32(eocd + 16, true);
    const entries = new Map();
    for (let i = 0; i < count; i++) {
      if (off + 46 > bytes.length || dv.getUint32(off, true) !== 0x02014b50) break;
      const method = dv.getUint16(off + 10, true);
      const compSize = dv.getUint32(off + 20, true);
      const nameLen = dv.getUint16(off + 28, true);
      const extraLen = dv.getUint16(off + 30, true);
      const commentLen = dv.getUint16(off + 32, true);
      const localOff = dv.getUint32(off + 42, true);
      const name = dec.decode(bytes.subarray(off + 46, off + 46 + nameLen));
      entries.set(name, { method, compSize, localOff });
      off += 46 + nameLen + extraLen + commentLen;
    }
    return entries;
  }

  async function entryBytes(bytes, entry) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const lo = entry.localOff;
    if (dv.getUint32(lo, true) !== 0x04034b50) throw new Error("zip 局部头损坏");
    const nameLen = dv.getUint16(lo + 26, true);
    const extraLen = dv.getUint16(lo + 28, true);
    const start = lo + 30 + nameLen + extraLen;
    const raw = bytes.subarray(start, start + entry.compSize);
    if (entry.method === 0) return raw;
    if (entry.method === 8) {
      if (typeof DecompressionStream === "undefined") {
        throw new Error("当前浏览器不支持解压 xlsx，请用新版 Chrome / Edge / Safari 打开");
      }
      const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    throw new Error("不支持的 zip 压缩方式：" + entry.method);
  }

  async function entryText(bytes, entry) {
    return dec.decode(await entryBytes(bytes, entry));
  }

  /* ---------------- XML 解析 ---------------- */

  function parseXml(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw new Error("xlsx 内部 XML 解析失败");
    return doc;
  }

  function allText(node) {
    return [...node.getElementsByTagNameNS("*", "t")].map((t) => t.textContent).join("");
  }

  function sharedStrings(xml) {
    if (!xml) return [];
    const doc = parseXml(xml);
    return [...doc.getElementsByTagNameNS("*", "si")].map((si) => allText(si));
  }

  function colIndex(ref) {
    const m = /^([A-Z]+)/.exec(ref || "");
    if (!m) return -1;
    let n = 0;
    for (const ch of m[1]) n = n * 26 + (ch.charCodeAt(0) - 64);
    return n - 1;
  }

  function sheetRows(xml, shared) {
    const doc = parseXml(xml);
    const rows = [];
    for (const row of doc.getElementsByTagNameNS("*", "row")) {
      const cells = [];
      for (const c of row.getElementsByTagNameNS("*", "c")) {
        const idx = colIndex(c.getAttribute("r"));
        if (idx < 0) continue;
        const type = c.getAttribute("t");
        let value = "";
        if (type === "s") {
          const v = c.getElementsByTagNameNS("*", "v")[0];
          const i = v ? Number(v.textContent) : -1;
          value = i >= 0 && i < shared.length ? shared[i] : "";
        } else if (type === "inlineStr") {
          const is = c.getElementsByTagNameNS("*", "is")[0];
          value = is ? allText(is) : "";
        } else {
          const v = c.getElementsByTagNameNS("*", "v")[0];
          const raw = v ? v.textContent : "";
          value = raw === "" || type === "str" || type === "e" ? raw : Number(raw);
        }
        cells[idx] = value;
      }
      const filled = [];
      for (let i = 0; i < cells.length; i++) filled.push(cells[i] === undefined ? "" : cells[i]);
      rows.push(filled);
    }
    return rows;
  }

  async function firstSheetPath(bytes, entries) {
    const wb = entries.get("xl/workbook.xml");
    const rels = entries.get("xl/_rels/workbook.xml.rels");
    if (wb && rels) {
      try {
        const wbDoc = parseXml(await entryText(bytes, wb));
        const sheet = wbDoc.getElementsByTagNameNS("*", "sheet")[0];
        const rid = sheet && (sheet.getAttribute("r:id") || sheet.getAttributeNS(REL_NS, "id"));
        const relDoc = parseXml(await entryText(bytes, rels));
        for (const rel of relDoc.getElementsByTagNameNS("*", "Relationship")) {
          if (rel.getAttribute("Id") !== rid) continue;
          let target = (rel.getAttribute("Target") || "").replace(/^\/+/, "");
          if (!target) break;
          return target.startsWith("xl/") ? target : "xl/" + target;
        }
      } catch {}
    }
    if (entries.has("xl/worksheets/sheet1.xml")) return "xl/worksheets/sheet1.xml";
    return [...entries.keys()].find((k) => /^xl\/worksheets\/.+\.xml$/.test(k)) || null;
  }

  async function readRows(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (bytes.length < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
      throw new Error("这不是 xlsx 文件。如果是旧版 .xls，请用 Excel 另存为 .xlsx 再导入");
    }
    const entries = listEntries(bytes);
    const shared = entries.has("xl/sharedStrings.xml") ? sharedStrings(await entryText(bytes, entries.get("xl/sharedStrings.xml"))) : [];
    const path = await firstSheetPath(bytes, entries);
    if (!path || !entries.has(path)) throw new Error("xlsx 里没有找到工作表");
    return sheetRows(await entryText(bytes, entries.get(path)), shared);
  }

  /* ---------------- ZIP 写入 ---------------- */

  let CRC_TABLE = null;
  function crc32(bytes) {
    if (!CRC_TABLE) {
      CRC_TABLE = new Uint32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        CRC_TABLE[i] = c >>> 0;
      }
    }
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function zipStore(files) {
    const parts = [];
    const central = [];
    let offset = 0;
    for (const f of files) {
      const nameBytes = enc.encode(f.name);
      const crc = crc32(f.data);
      const head = new Uint8Array(30 + nameBytes.length);
      const dv = new DataView(head.buffer);
      dv.setUint32(0, 0x04034b50, true);
      dv.setUint16(4, 20, true);
      dv.setUint16(6, 0x0800, true); // UTF-8 文件名
      dv.setUint16(8, 0, true); // STORE
      dv.setUint16(10, 0, true);
      dv.setUint16(12, 0x0021, true); // 1980-01-01
      dv.setUint32(14, crc, true);
      dv.setUint32(18, f.data.length, true);
      dv.setUint32(22, f.data.length, true);
      dv.setUint16(26, nameBytes.length, true);
      head.set(nameBytes, 30);
      parts.push(head, f.data);
      central.push({ nameBytes, crc, size: f.data.length, offset });
      offset += head.length + f.data.length;
    }
    const cd = [];
    let cdSize = 0;
    for (const c of central) {
      const h = new Uint8Array(46 + c.nameBytes.length);
      const dv = new DataView(h.buffer);
      dv.setUint32(0, 0x02014b50, true);
      dv.setUint16(4, 20, true);
      dv.setUint16(6, 20, true);
      dv.setUint16(8, 0x0800, true);
      dv.setUint16(10, 0, true);
      dv.setUint16(12, 0, true);
      dv.setUint16(14, 0x0021, true);
      dv.setUint32(16, c.crc, true);
      dv.setUint32(20, c.size, true);
      dv.setUint32(24, c.size, true);
      dv.setUint16(28, c.nameBytes.length, true);
      dv.setUint32(42, c.offset, true);
      h.set(c.nameBytes, 46);
      cd.push(h);
      cdSize += h.length;
    }
    const eocd = new Uint8Array(22);
    const dv = new DataView(eocd.buffer);
    dv.setUint32(0, 0x06054b50, true);
    dv.setUint16(8, central.length, true);
    dv.setUint16(10, central.length, true);
    dv.setUint32(12, cdSize, true);
    dv.setUint32(16, offset, true);
    return [...parts, ...cd, eocd];
  }

  /* ---------------- 生成 sheet ---------------- */

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  }

  function colName(i) {
    let s = "";
    let n = i + 1;
    while (n > 0) {
      const r = (n - 1) % 26;
      s = String.fromCharCode(65 + r) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  const HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

  function sheetXml(rows, widths) {
    const body = rows
      .map((row, ri) => {
        const cells = row
          .map((v, ci) => {
            if (v === null || v === undefined || v === "") return "";
            const ref = colName(ci) + (ri + 1);
            if (typeof v === "number" && isFinite(v)) return `<c r="${ref}"><v>${v}</v></c>`;
            const style = ri === 0 ? ' s="1"' : "";
            return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
          })
          .join("");
        return `<row r="${ri + 1}">${cells}</row>`;
      })
      .join("");

    const cols = (widths || [])
      .map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`)
      .join("");

    return (
      HEAD +
      `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${REL_NS}">` +
      `<dimension ref="A1:${colName((rows[0] || []).length - 1)}${Math.max(rows.length, 1)}"/>` +
      `<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>` +
      `<sheetFormatPr defaultRowHeight="15"/>` +
      (cols ? `<cols>${cols}</cols>` : "") +
      `<sheetData>${body}</sheetData>` +
      `</worksheet>`
    );
  }

  const CONTENT_TYPES =
    HEAD +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>` +
    `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
    `</Types>`;

  const ROOT_RELS =
    HEAD +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="${REL_NS}/officeDocument" Target="xl/workbook.xml"/>` +
    `</Relationships>`;

  const WORKBOOK =
    HEAD +
    `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${REL_NS}">` +
    `<sheets><sheet name="加油记录" sheetId="1" r:id="rId1"/></sheets>` +
    `</workbook>`;

  const WORKBOOK_RELS =
    HEAD +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="${REL_NS}/worksheet" Target="worksheets/sheet1.xml"/>` +
    `<Relationship Id="rId2" Type="${REL_NS}/styles" Target="styles.xml"/>` +
    `</Relationships>`;

  const STYLES =
    HEAD +
    `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>` +
    `<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>` +
    `<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>` +
    `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
    `<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>` +
    `<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>` +
    `<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>` +
    `</styleSheet>`;

  function buildBlob(rows, widths) {
    const files = [
      { name: "[Content_Types].xml", data: enc.encode(CONTENT_TYPES) },
      { name: "_rels/.rels", data: enc.encode(ROOT_RELS) },
      { name: "xl/workbook.xml", data: enc.encode(WORKBOOK) },
      { name: "xl/_rels/workbook.xml.rels", data: enc.encode(WORKBOOK_RELS) },
      { name: "xl/styles.xml", data: enc.encode(STYLES) },
      { name: "xl/worksheets/sheet1.xml", data: enc.encode(sheetXml(rows, widths)) },
    ];
    return new Blob(zipStore(files), {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  function writeFile(filename, rows, widths) {
    const blob = buildBlob(rows, widths);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  global.XLSX_LITE = { readRows, writeFile, buildBlob };
})(window);
