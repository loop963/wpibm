const STORAGE_KEY = "fuel-record-v1";
// 首次打开时是否写入示例数据。false = 空表启动（正式发布用）。
const SEED_ON_FIRST_RUN = false;

const ICONS = {
  drop: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3s7 7.2 7 11.2A7 7 0 1 1 5 14.2C5 10.2 12 3 12 3Z" stroke="currentColor" stroke-width="1.8"/></svg>`,
  yen: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 6l4 6 4-6M8 12h8M8 16h8M12 12v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  route: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="2.2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2.2" stroke="currentColor" stroke-width="1.8"/><path d="M8 8.5c4 0 4 7 8 7" stroke="currentColor" stroke-width="1.8"/></svg>`,
  loop: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 12a8 8 0 0 1-13.7 5.6L4 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pump: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M14 8h3l3 3v7a2 2 0 0 1-4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 8h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  dash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 16a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="16" r="1.6" fill="currentColor"/><path d="M12 16l4-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 12.2l2.4 2.4 4.6-5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg>`,
  car: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.5 14h15v3.2a1 1 0 0 1-1 1h-1.2M7.7 18.2H16M5.5 18.2H4.8a1 1 0 0 1-1-1V14l1.6-4.6A1.6 1.6 0 0 1 6.9 8.2h10.2c.7 0 1.3.4 1.5 1.1L20.3 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="7.2" cy="18.2" r="1.5" stroke="currentColor" stroke-width="1.6"/><circle cx="16.8" cy="18.2" r="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 11.2h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  gear: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z" stroke="currentColor" stroke-width="1.7"/><path d="M19.4 13.2a7.7 7.7 0 0 0 .1-2.4l1.7-1.3-1.6-2.8-2 .5a7.6 7.6 0 0 0-2-1.2l-.4-2.1h-3.2l-.4 2.1a7.6 7.6 0 0 0-2 1.2l-2-.5-1.6 2.8 1.7 1.3a7.7 7.7 0 0 0 .1 2.4L3.7 14.5l1.6 2.8 2-.5a7.6 7.6 0 0 0 2 1.2l.4 2.1h3.2l.4-2.1a7.6 7.6 0 0 0 2-1.2l2 .5 1.6-2.8-1.7-1.3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  chev: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  export: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 8l4-4 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  table: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M10 5v14" stroke="currentColor" stroke-width="1.8"/></svg>`,
  restore: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12a7 7 0 1 0 2-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M5 5v4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevL: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevR: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  note: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.5 3.5h7L18 8v11.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M13.5 3.8V8h4.2M9 12.5h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

const TAB_ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 16.2a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M12 16.2l4.1-5.3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="16.2" r="1.6" fill="currentColor"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 19.2v-6.4M12 19.2V5.2M19 19.2v-9.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 7h11M9 12h11M9 17h11" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="4.6" cy="7" r="1.3" fill="currentColor"/><circle cx="4.6" cy="12" r="1.3" fill="currentColor"/><circle cx="4.6" cy="17" r="1.3" fill="currentColor"/></svg>`,
};

// 空表启动时的默认车辆信息（示例数据只用于识别旧版本残留，不再作为默认值）
const DEFAULT_VEHICLE = { name: "我的车", spec: "", plate: "" };

const seed = {
  vehicle: { name: "本田 CR-V", spec: "240TURBO 两驱", plate: "沪A**K" },
  settings: { theme: "dash-light", accent: "blue" },
  records: [
    { id: "r8", time: "2025-05-20T18:40:00", odometer: 15660, cost: 322.28, price: 7.71, liters: 41.8, grade: "92#", full: true, station: "中石化·古北路站" },
    { id: "r7", time: "2025-05-06T19:10:00", odometer: 15120, cost: 296.42, price: 7.62, liters: 38.9, grade: "92#", full: true, station: "中石化·虹桥路站" },
    { id: "r6", time: "2025-04-22T18:20:00", odometer: 14610, cost: 326.92, price: 7.55, liters: 43.3, grade: "92#", full: true, station: "中石化·延安西路站" },
    { id: "r5", time: "2025-04-08T19:00:00", odometer: 14080, cost: 311.81, price: 7.68, liters: 40.6, grade: "92#", full: true, station: "中石化·仙霞路站" },
    { id: "r4", time: "2025-03-25T19:05:00", odometer: 13560, cost: 326.7, price: 7.76, liters: 42.1, grade: "92#", full: true, station: "中石化·延安西路站" },
    { id: "r3", time: "2025-03-09T18:30:00", odometer: 13010, cost: 320.39, price: 8.05, liters: 39.8, grade: "92#", full: true, station: "中石化·天山路站" },
    { id: "r2", time: "2025-02-24T19:15:00", odometer: 12520, cost: 328.68, price: 7.92, liters: 41.5, grade: "92#", full: true, station: "中石化·遵义路站" },
    { id: "r1", time: "2025-02-10T18:00:00", odometer: 12000, cost: 317.18, price: 7.89, liters: 40.2, grade: "92#", full: true, station: "中石化·江苏路站" },
  ],
};

let state = load();
let currentId = null;
let detailFrom = "view-records";
let lastEdited = "cost";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.records)) {
        // 关掉示例数据后，浏览器里残留的那份“没人动过的示例数据”直接丢弃
        if (!SEED_ON_FIRST_RUN && isDemoData(parsed)) return emptyState();
        return parsed;
      }
    }
  } catch {}
  return SEED_ON_FIRST_RUN ? structuredClone(seed) : emptyState();
}

function emptyState() {
  return { vehicle: { ...DEFAULT_VEHICLE }, settings: { ...seed.settings }, records: [] };
}

// 只能识别“一条都没改过”的示例数据：条数、ID、车辆名都对得上才算
function isDemoData(data) {
  if (data.records.length !== seed.records.length) return false;
  if (data.vehicle && data.vehicle.name !== seed.vehicle.name) return false;
  const demoIds = new Set(seed.records.map((r) => r.id));
  return data.records.every((r) => demoIds.has(r.id));
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("本地保存失败（可能是隐私模式或存储已满）", err);
  }
}

function sortedRecords() {
  return [...state.records].sort((a, b) => a.odometer - b.odometer || a.time.localeCompare(b.time));
}

/* 油耗按“加满到加满”计算：
   中间未加满的加油先累计，等到下次加满时用“累计油量 ÷ 累计里程”得到本次油耗。
   全部加满时与逐次计算完全一致；遇到小熊油耗那种分次加油也不会算出离谱数字。 */
function withStats() {
  const list = sortedRecords();
  const out = [];
  let baseOdo = null; // 上一次加满时的仪表盘里程
  let pending = 0; // 自上次加满以来累计加的油量
  let pendingCost = 0; // 自上次加满以来累计花费

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    const prev = list[i - 1] || null;
    const distance = prev ? round1(r.odometer - prev.odometer) : 0;

    if (baseOdo == null) {
      baseOdo = r.odometer;
      out.push({ ...r, distance: 0, consumption: null, span: 0, tankLiters: 0, tankCost: 0 });
      continue;
    }

    pending += r.liters;
    pendingCost += r.cost;
    const span = round1(r.odometer - baseOdo);
    let consumption = null;
    let tankLiters = 0;
    let tankCost = 0;
    if (r.full && span > 0) {
      consumption = round2((pending / span) * 100);
      tankLiters = round2(pending);
      tankCost = round2(pendingCost);
      baseOdo = r.odometer;
      pending = 0;
      pendingCost = 0;
    }
    out.push({ ...r, distance, consumption, span, tankLiters, tankCost });
  }
  return out;
}

function round1(n) { return Math.round(n * 10) / 10; }
function round2(n) { return Math.round(n * 100) / 100; }
function money(n) { return "¥" + Number(n).toLocaleString("zh-CN", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }); }
function fmtNum(n, d = 0) {
  return Number(n).toLocaleString("zh-CN", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function pad(n) { return String(n).padStart(2, "0"); }

function parseTime(iso) {
  const d = new Date(iso);
  return {
    date: d,
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    day: d.getDate(),
    w: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()],
    hm: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function compute() {
  const items = withStats();
  const trips = items.filter((r) => r.consumption != null);
  const totalCost = items.reduce((s, r) => s + r.cost, 0);
  const totalLiters = items.reduce((s, r) => s + r.liters, 0);
  const first = items[0];
  const last = items[items.length - 1];
  const mileage = first && last ? last.odometer - first.odometer : 0;
  // 平均油耗 / 每公里油费按“每个加满周期”累计，分次加油也能算准
  const span = trips.reduce((s, r) => s + (r.span || 0), 0);
  const tankLiters = trips.reduce((s, r) => s + (r.tankLiters || 0), 0);
  const tankCost = trips.reduce((s, r) => s + (r.tankCost || 0), 0);
  const avg = span > 0 && tankLiters > 0 ? round2((tankLiters / span) * 100) : 0;
  const best = trips.length ? Math.min(...trips.map((r) => r.consumption)) : 0;
  const worst = trips.length ? Math.max(...trips.map((r) => r.consumption)) : 0;
  const lastTrip = trips[trips.length - 1];
  const prevTrip = trips[trips.length - 2];
  const delta = lastTrip && prevTrip ? round2(lastTrip.consumption - prevTrip.consumption) : 0;
  const perKm = span > 0 ? tankCost / span : 0;
  const avgPrice = totalLiters > 0 ? totalCost / totalLiters : 0;
  return { items, trips, totalCost, totalLiters, mileage, avg, best, worst, lastTrip, delta, perKm, avgPrice, fills: items.length };
}

function applyTheme() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.dataset.accent = state.settings.accent;
}

const TAB_VIEWS = ["view-home", "view-stats", "view-records"];

function showView(id) {
  document.querySelectorAll(".view").forEach((el) => {
    const on = el.id === id;
    el.classList.toggle("active", on);
    el.hidden = !on;
  });
  const isTab = TAB_VIEWS.includes(id);
  const tabbar = document.getElementById("tabbar");
  if (tabbar) tabbar.hidden = !isTab;
  document.querySelectorAll(".tab").forEach((el) => el.classList.toggle("active", el.dataset.tab === id));
  const fab = document.getElementById("fab");
  fab.hidden = !(id === "view-home" || id === "view-records");
  if (id === "view-stats") renderStats();
  if (isTab) {
    const hash = "#" + id.replace("view-", "");
    try {
      if (location.hash !== hash) history.replaceState(null, "", hash);
    } catch {}
  }
}

function renderAll() {
  applyTheme();
  renderHome();
  renderRecords();
  renderStats();
  renderSettings();
}

function vehicleLine() {
  const v = state.vehicle;
  const parts = [v.spec, v.plate].filter((x) => x && String(x).trim());
  return parts.length ? parts.join(" · ") : "点右上角设置车型";
}

function renderTopbars() {
  document.querySelectorAll("[data-car-name]").forEach((el) => { el.textContent = state.vehicle.name; });
  document.querySelectorAll("[data-car-spec]").forEach((el) => { el.textContent = vehicleLine(); });
}

function renderHome() {
  renderTopbars();
  const s = compute();
  const hero = document.getElementById("hero");
  const avg = s.avg ? s.avg.toFixed(2) : "--";
  const deltaHtml = !s.items.length
    ? `<span class="delta">还没有加油记录</span>`
    : s.lastTrip && s.trips.length > 1
      ? `<span class="delta ${s.delta >= 0 ? "up" : "down"}">${s.delta >= 0 ? "↑" : "↓"} ${Math.abs(s.delta).toFixed(2)}L 较上次</span>`
      : `<span class="delta">暂无可比上次</span>`;
  hero.innerHTML = `
    <div class="hero-label">${ICONS.drop} 平均油耗</div>
    <div class="hero-main">
      <div class="hero-num">${avg}</div>
      <div class="hero-unit">L/100km</div>
    </div>
    <div class="hero-foot">
      ${deltaHtml}
      <div class="hero-stats">
        <div><span class="k">最佳</span><span class="v">${s.best ? s.best.toFixed(2) : "--"}</span></div>
        <div><span class="k">最高</span><span class="v">${s.worst ? s.worst.toFixed(2) : "--"}</span></div>
      </div>
    </div>`;

  document.getElementById("stats").innerHTML = `
    <article class="stat-card"><div class="label">${ICONS.yen} 累计花费</div><div class="value">${s.fills ? money(Math.round(s.totalCost)) : "--"}</div><div class="hint">${s.avgPrice ? `平均 ¥${s.avgPrice.toFixed(2)}/L` : "还没有加油记录"}</div></article>
    <article class="stat-card"><div class="label">${ICONS.route} 累计里程</div><div class="value">${s.mileage ? fmtNum(s.mileage) : "--"} <span style="font-size:14px;font-weight:600;color:var(--muted)">km</span></div><div class="hint">${s.fills} 次加油</div></article>
    <article class="stat-card"><div class="label">${ICONS.loop} 每公里油费</div><div class="value">${s.perKm ? "¥" + s.perKm.toFixed(2) : "--"}</div><div class="hint">${s.perKm ? "燃油成本" : s.fills ? "记录两次后计算" : "还没有加油记录"}</div></article>
    <article class="stat-card"><div class="label">${ICONS.pump} 累计加油</div><div class="value">${s.totalLiters ? s.totalLiters.toFixed(1) : "--"} <span style="font-size:14px;font-weight:600;color:var(--muted)">L</span></div><div class="hint">${s.items.length ? `近次 ${s.items.at(-1).liters.toFixed(1)}L` : "还没有加油记录"}</div></article>`;

  const more = document.getElementById("home-more");
  if (more) more.hidden = !s.items.length;
  renderChart(s.trips);
}

function renderChart(trips) {
  const el = document.getElementById("chart");
  if (!trips.length) {
    const n = state.records.length;
    el.innerHTML = `<div class="chart-empty">${n ? "再记录一次加油，就能看到油耗趋势" : "还没有加油记录，点右下角 + 开始记录"}</div>`;
    return;
  }
  const w = 390, h = 190, p = { l: 46, r: 44, t: 28, b: 34 };
  const vals = trips.map((t) => t.consumption);
  const min = Math.min(...vals) - 0.35;
  const max = Math.max(...vals) + 0.25;
  const x = (i) => p.l + (i * (w - p.l - p.r)) / Math.max(vals.length - 1, 1);
  const y = (v) => p.t + ((max - v) / (max - min || 1)) * (h - p.t - p.b);
  const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const last = trips[trips.length - 1];
  const avg = compute().avg;
  const labels = trips.map((t) => {
    const d = parseTime(t.time);
    return `${pad(d.m)}/${pad(d.day)}`;
  });
  const accent = cssVar("--accent", "#007aff");
  const muted = cssVar("--muted", "#8e8e93");
  const avgY = y(avg);
  const lastX = x(vals.length - 1);
  const lastY = Math.max(14, y(last.consumption) - 12);
  const every = Math.max(1, Math.ceil(labels.length / 6));
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
    <line x1="${p.l}" y1="${avgY}" x2="${w - p.r}" y2="${avgY}" stroke="${muted}" stroke-dasharray="3 5" stroke-width="1"/>
    <text x="${p.l - 6}" y="${avgY + 4}" text-anchor="end" fill="${muted}" font-size="11">${avg.toFixed(2)}</text>
    <polyline points="${pts}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round"/>
    ${vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="${i === vals.length - 1 ? 5 : 4}" fill="#fff" stroke="${accent}" stroke-width="2.2"/>`).join("")}
    <text x="${lastX}" y="${lastY}" text-anchor="middle" fill="${accent}" font-size="12" font-weight="700">${last.consumption.toFixed(2)}</text>
    ${labels.map((lb, i) => (i % every === 0 || i === labels.length - 1) ? `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" fill="${muted}" font-size="10">${lb}</text>` : "").join("")}
  </svg>`;
}

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function renderRecords() {
  renderTopbars();
  const s = compute();
  document.getElementById("record-count").textContent = s.fills + " 条";
  const box = document.getElementById("record-list");
  if (!s.items.length) {
    box.innerHTML = `<div class="empty"><strong>还没有加油记录</strong>点右下角加号添加第一次加油</div>`;
    return;
  }
  const newest = [...s.items].reverse();
  box.innerHTML = newest.map((r) => {
    const d = parseTime(r.time);
    const dist = r.consumption == null
      ? (r.distance > 0 ? `+${fmtNum(r.distance)}km · 未加满` : "首次")
      : `+${fmtNum(r.distance)}km`;
    const cons = r.consumption == null ? "—" : r.consumption.toFixed(2);
    return `<button class="record" data-id="${r.id}">
      <div class="date-col"><div class="y">${d.y}</div><div class="d">${pad(d.day)}</div><div class="m">${d.m}月</div></div>
      <div class="rec-main"><strong>${money(r.cost)}</strong><span class="badge">${r.grade}</span>
        <p>${fmtNum(r.odometer)}km · ${r.liters.toFixed(2)}L · ${dist}</p></div>
      <div class="rec-cons">${cons}<small>L/100km</small></div>
      <div class="chev">${ICONS.chev}</div>
    </button>`;
  }).join("");
  box.querySelectorAll(".record").forEach((btn) => btn.addEventListener("click", () => openDetail(btn.dataset.id)));
}

function openDetail(id) {
  const activeView = document.querySelector(".view.active");
  if (activeView && TAB_VIEWS.includes(activeView.id)) detailFrom = activeView.id;
  currentId = id;
  const items = withStats();
  const r = items.find((x) => x.id === id);
  if (!r) return;
  const d = parseTime(r.time);
  document.getElementById("detail-hero").innerHTML = `
    <div class="hero-label">${ICONS.drop} 本次油耗</div>
    <div class="hero-main">
      <div class="hero-num">${r.consumption == null ? "--" : r.consumption.toFixed(2)}</div>
      <div class="hero-unit">L/100km</div>
    </div>
        <div class="hero-foot"><span style="color:var(--hero-muted);font-size:13px">${d.y}年${d.m}月${d.day}日 周${d.w} · ${d.hm}</span></div>`;
  document.getElementById("detail-groups").innerHTML = `
    <div class="group">
      ${row(ICONS.clock, "加油时间", `${d.m}月${d.day}日 ${d.hm}`)}
      ${row(ICONS.dash, "仪表盘里程", `${fmtNum(r.odometer)} km`)}
      ${row(ICONS.route, "距上次行驶", r.distance ? `${fmtNum(r.distance)} km` : "首次")}
      ${row(ICONS.drop, "单次油耗", r.consumption == null ? (r.distance > 0 ? "未加满，下次加满后计算" : "首次加油，无油耗") : `${r.consumption.toFixed(2)} L/100km`, true)}
    </div>
    <div class="group">
      ${row(ICONS.yen, "实际花费", money(r.cost))}
      ${row(ICONS.pump, "油费单价", `${r.price.toFixed(2)} ¥/L`)}
      ${row(ICONS.drop, "加油量", `${r.liters.toFixed(2)} L`)}
      ${row(ICONS.check, "油号 / 加满", `${r.grade} · ${r.full ? "加满" : "未满"}`)}
    </div>
    ${r.extra && r.extra.备注 ? `<div class="group">${row(ICONS.note, "备注", r.extra.备注)}</div>` : ""}
    <div class="group">
      ${row(ICONS.pin, "加油站", r.station || "未填写")}
    </div>
    <div class="group">
      <button class="row clickable" id="delete-record"><span class="left" style="color:var(--danger)">删除这条记录</span></button>
    </div>`;
  document.getElementById("delete-record").onclick = () => {
    if (!confirm("确定删除这条加油记录？")) return;
    state.records = state.records.filter((x) => x.id !== id);
    save();
    renderAll();
    showView(detailFrom);
  };
  showView("view-detail");
}

function row(icon, label, value, accent = false) {
  return `<div class="row"><div class="left">${icon}${label}</div><div class="right${accent ? " accent" : ""}">${value}</div></div>`;
}

function openForm(id = null) {
  currentId = id;
  const form = document.getElementById("record-form");
  form.reset();
  document.getElementById("form-title").textContent = id ? "编辑记录" : "新增加油";
  const rec = id ? state.records.find((r) => r.id === id) : null;
  const now = new Date();
  const local = rec ? rec.time.slice(0, 16) : `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  form.time.value = local;
  form.odometer.value = rec ? rec.odometer : "";
  form.cost.value = rec ? rec.cost : "";
  form.price.value = rec ? rec.price : "";
  form.liters.value = rec ? rec.liters : "";
  form.grade.value = rec ? rec.grade : "92#";
  form.station.value = rec ? rec.station : "";
  setToggle(form.querySelector("[data-toggle=full]"), rec ? rec.full : true);
  lastEdited = "cost";
  updateComputedFields();
  showView("view-form");
}

function setToggle(btn, on) {
  btn.classList.toggle("on", on);
  btn.dataset.on = on ? "1" : "0";
}

function previousFor(odometer, excludeId) {
  const list = sortedRecords().filter((r) => r.id !== excludeId);
  const prevs = list.filter((r) => r.odometer < Number(odometer));
  return prevs.at(-1) || null;
}

function updateComputedFields() {
  const form = document.getElementById("record-form");
  const odo = Number(form.odometer.value);
  const liters = Number(form.liters.value);
  const full = form.querySelector("[data-toggle=full]").dataset.on === "1";
  const prev = previousFor(odo, currentId);
  const dist = prev && odo ? round1(odo - prev.odometer) : 0;

  document.getElementById("computed-distance").textContent = prev ? `${fmtNum(dist)} km` : "首次加油";

  let cons = null;
  if (prev && odo && full && liters) {
    // 以最近一次“加满”为基准，未加满的油量累计进来（与列表算法一致）
    const before = sortedRecords().filter((r) => r.id !== currentId && r.odometer < odo);
    let base = null;
    let pending = 0;
    for (let i = before.length - 1; i >= 0; i--) {
      if (before[i].full) {
        base = before[i].odometer;
        break;
      }
      pending += before[i].liters;
    }
    if (base == null) {
      base = before[0].odometer;
      pending = Math.max(0, pending - before[0].liters);
    }
    const span = round1(odo - base);
    if (span > 0) cons = round2(((pending + liters) / span) * 100);
  }

  const consEl = document.getElementById("computed-cons");
  if (!prev) consEl.textContent = "—";
  else if (!full) consEl.textContent = "未加满，暂不计算";
  else consEl.textContent = cons == null ? "—" : `${cons.toFixed(2)} L/100km`;
}

function wireFormCalc() {
  const form = document.getElementById("record-form");
  const recalc = (source) => {
    lastEdited = source;
    const cost = Number(form.cost.value);
    const price = Number(form.price.value);
    const liters = Number(form.liters.value);
    if (source !== "liters" && cost > 0 && price > 0) form.liters.value = round2(cost / price);
    else if (source !== "price" && cost > 0 && liters > 0) form.price.value = round2(cost / liters);
    else if (source !== "cost" && price > 0 && liters > 0) form.cost.value = round2(price * liters);
    updateComputedFields();
  };
  form.cost.addEventListener("input", () => recalc("cost"));
  form.price.addEventListener("input", () => recalc("price"));
  form.liters.addEventListener("input", () => recalc("liters"));
  form.odometer.addEventListener("input", updateComputedFields);
}

function renderSettings() {
  document.querySelectorAll("[data-theme-opt]").forEach((el) => {
    const on = el.dataset.themeOpt === state.settings.theme;
    el.querySelector(".check").textContent = on ? "✓" : "";
  });
  document.querySelectorAll(".swatch").forEach((el) => el.classList.toggle("active", el.dataset.accent === state.settings.accent));
  document.getElementById("veh-name").value = state.vehicle.name;
  document.getElementById("veh-spec").value = state.vehicle.spec;
  document.getElementById("veh-plate").value = state.vehicle.plate;
}

function exportJSON() {
  download(`fuel-backup-${Date.now()}.json`, JSON.stringify(state, null, 2), "application/json");
}

/* Excel 列：与小熊油耗导出表保持同名同序，方便两边互相导入 */
const EXCEL_HEADER = ["日期时间", "总里程", "机显单价", "加油量", "机显金额", "实付金额", "油号", "加满", "亮灯", "漏记", "油耗", "加油站名称", "备注"];
const EXCEL_WIDTHS = [20, 11, 10, 10, 12, 12, 8, 7, 7, 7, 8, 24, 20];

function timeText(iso) {
  const d = parseTime(iso);
  return `${d.y}-${pad(d.m)}-${pad(d.day)} ${d.hm}:00`;
}

function buildExportRows() {
  const rows = [EXCEL_HEADER];
  withStats().forEach((r) => {
    const extra = r.extra || {};
    rows.push([
      timeText(r.time),
      round1(r.odometer),
      round2(r.price),
      round2(r.liters),
      round2(r.price * r.liters),
      round2(r.cost),
      r.grade || "",
      r.full ? "是" : "否",
      extra.亮灯 || "",
      extra.漏记 || "",
      r.consumption == null ? "" : Number(r.consumption.toFixed(2)),
      r.station || "",
      extra.备注 || "",
    ]);
  });
  return rows;
}

function exportXLSX() {
  if (!state.records.length) {
    alert("还没有加油记录可以导出");
    return;
  }
  const stamp = timeText(new Date().toISOString()).slice(0, 10);
  window.XLSX_LITE.writeFile(`油耗记录-${stamp}.xlsx`, buildExportRows(), EXCEL_WIDTHS);
}

function download(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ---------------- 导入：xlsx / csv / json ---------------- */

function toNum(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? "").trim().replace(/,/g, "").replace(/[^\d.\-]/g, "");
  if (!s || s === "-" || s === ".") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function normalizeTime(v) {
  // Excel 日期序列号（1900 基准）
  if (typeof v === "number" && v > 20000 && v < 90000) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v * 86400000));
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
  }
  const s = String(v ?? "").trim();
  const m = /^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?(?:[T\s]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/.exec(s);
  if (!m) return null;
  return `${m[1]}-${pad(m[2])}-${pad(m[3])}T${pad(m[4] || 0)}:${pad(m[5] || 0)}`;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") field += ch;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/* 把任意表头顺序的二维表映射成记录，兼容小熊油耗导出表与本站旧 CSV */
function rowsToRecords(rows) {
  const headerIdx = rows.findIndex((r) => r.some((c) => /日期|时间/.test(String(c))));
  if (headerIdx < 0) throw new Error("没找到表头，文件里需要包含“日期时间”“总里程”等列");
  const header = rows[headerIdx].map((c) => String(c ?? "").trim());
  const find = (...pats) => header.findIndex((h) => pats.some((p) => p.test(h)));

  const col = {
    time: find(/日期/, /时间/),
    odo: find(/总里程/, /仪表盘/, /里程/),
    price: find(/单价/, /油价/),
    liters: find(/加油量/, /升数/, /油量/),
    paid: find(/实付/),
    amount: find(/金额/, /花费/, /费用/),
    grade: find(/油号/, /标号/, /油品/),
    full: find(/加满/),
    station: find(/加油站/, /油站/),
    note: find(/备注/),
    light: find(/亮灯/),
    missed: find(/漏记/),
  };
  if (col.time < 0 || col.odo < 0) throw new Error("文件缺少“日期时间”或“总里程”列");

  const cell = (row, i) => (i >= 0 && i < row.length ? row[i] : "");
  const text = (row, i) => String(cell(row, i) ?? "").trim();
  const records = [];
  const seen = new Set();
  let skipped = 0;

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i] || [];
    const time = normalizeTime(cell(row, col.time));
    const odometer = toNum(cell(row, col.odo));
    if (!time || !Number.isFinite(odometer) || odometer <= 0) {
      if (row.some((c) => String(c ?? "").trim() !== "")) skipped++;
      continue;
    }

    let liters = toNum(cell(row, col.liters));
    let price = toNum(cell(row, col.price));
    const paid = col.paid >= 0 ? toNum(cell(row, col.paid)) : NaN;
    const amount = col.amount >= 0 ? toNum(cell(row, col.amount)) : NaN;
    let cost = Number.isFinite(paid) && paid > 0 ? paid : amount;

    if (!Number.isFinite(cost) || cost <= 0) cost = Number.isFinite(price) && Number.isFinite(liters) ? round2(price * liters) : NaN;
    if (!Number.isFinite(liters) || liters <= 0) liters = Number.isFinite(price) && price > 0 && cost > 0 ? round2(cost / price) : NaN;
    if (!Number.isFinite(price) || price <= 0) price = Number.isFinite(liters) && liters > 0 && cost > 0 ? round2(cost / liters) : NaN;
    if (!Number.isFinite(cost) || cost <= 0 || !Number.isFinite(liters) || liters <= 0) {
      skipped++;
      continue;
    }
    if (!Number.isFinite(price) || price <= 0) price = round2(cost / liters);

    const key = `${time}|${round1(odometer)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const rec = {
      id: uid(),
      time,
      odometer: round1(odometer),
      cost: round2(cost),
      price: round2(price),
      liters: round2(liters),
      grade: text(row, col.grade) || "92#",
      full: /^(是|true|1|y|yes|加满)$/i.test(text(row, col.full)),
      station: text(row, col.station),
    };

    const extra = {};
    if (text(row, col.light)) extra.亮灯 = text(row, col.light);
    if (text(row, col.missed)) extra.漏记 = text(row, col.missed);
    if (text(row, col.note)) extra.备注 = text(row, col.note);
    if (Object.keys(extra).length) rec.extra = extra;

    records.push(rec);
  }

  records.sort((a, b) => a.time.localeCompare(b.time));
  return { records: records, skipped: skipped };
}

function applyImported(records, sourceName, skipped = 0) {
  if (!records.length) {
    alert(`从「${sourceName}」里没读到有效的加油记录。\n请确认表格包含“日期时间”“总里程”“加油量”“实付金额”等列。`);
    return;
  }
  const current = state.records.length;
  const lines = [`从「${sourceName}」读到 ${records.length} 条记录。`];
  if (skipped) lines.push(`另有 ${skipped} 行缺少时间/里程/金额，已跳过。`);
  if (current) lines.push(`导入会替换当前的 ${current} 条记录（车辆信息和设置保留）。`);
  lines.push("继续吗？");
  if (!confirm(lines.join("\n\n"))) return;

  state.records = records;
  statsAnchor = null;
  save();
  renderAll();
  closeSheet();
  alert(`已导入 ${records.length} 条加油记录`);
}

function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.records || !Array.isArray(data.records)) throw new Error("JSON 里没有 records 字段");
        state = {
          vehicle: { ...seed.vehicle, ...(data.vehicle || {}) },
          settings: { ...seed.settings, ...(data.settings || {}) },
          records: data.records,
        };
        statsAnchor = null;
        save();
        renderAll();
        closeSheet();
        alert(`已从 JSON 恢复 ${data.records.length} 条记录`);
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("文件读取出错"));
    reader.readAsText(file);
  });
}

async function importFile(file) {
  const name = file.name || "";
  const lower = name.toLowerCase();
  try {
    if (lower.endsWith(".json")) {
      await importJSON(file);
      return;
    }
    if (lower.endsWith(".xls")) {
      alert("暂不支持旧版 .xls（二进制格式）。\n请用 Excel / WPS 打开后“另存为 .xlsx”，再重新导入。");
      return;
    }
    if (lower.endsWith(".csv") || lower.endsWith(".txt")) {
      const text = await file.text();
      const parsed = rowsToRecords(parseCSV(text));
      applyImported(parsed.records, name, parsed.skipped);
      return;
    }
    if (lower.endsWith(".xlsx") || lower.endsWith(".xlsm")) {
      const rows = await window.XLSX_LITE.readRows(file);
      const parsed = rowsToRecords(rows);
      applyImported(parsed.records, name, parsed.skipped);
      return;
    }
    alert("不支持的文件类型，请选择 .xlsx / .csv / .json 文件");
  } catch (err) {
    alert("导入失败：" + (err && err.message ? err.message : err));
  }
}

/* ---------------- 清空数据 ---------------- */

function clearAllData() {
  if (!state.records.length) {
    alert("当前没有加油记录");
    return;
  }
  const n = state.records.length;
  if (!confirm(`确定要清空全部 ${n} 条加油记录吗？\n\n车辆信息和界面设置会保留，记录清空后无法恢复。`)) return;
  if (!confirm(`最后确认一次：${n} 条记录将被永久删除。\n\n建议先“导出 Excel 表格”或“导出 JSON 备份”。真的要清空吗？`)) return;

  state.records = [];
  statsAnchor = null;
  currentId = null;
  save();
  renderAll();
  closeSheet();
  showView("view-home");
  alert("已清空所有加油记录");
}

/* ---------------- 统计 ---------------- */

const METRICS = {
  consumption: { name: "油耗", dp: 2 },
  cost: { name: "花费", dp: 0 },
  liters: { name: "油量", dp: 1 },
};

let statsScope = "month";        // month | year | all
let statsMetric = "consumption"; // consumption | cost | liters
let statsAnchor = null;          // { y, m }

function anchorPeriod() {
  if (!statsAnchor) {
    const times = state.records.map((r) => new Date(r.time).getTime()).filter((t) => !Number.isNaN(t));
    const d = new Date(times.length ? Math.max(...times) : Date.now());
    statsAnchor = { y: d.getFullYear(), m: d.getMonth() + 1 };
  }
  return statsAnchor;
}

function periodText() {
  const a = anchorPeriod();
  if (statsScope === "all") return "全部时间";
  return statsScope === "year" ? `${a.y} 年` : `${a.y} 年 ${a.m} 月`;
}

function dataBounds() {
  let min = Infinity;
  let max = -Infinity;
  state.records.forEach((r) => {
    const d = new Date(r.time);
    if (Number.isNaN(d.getTime())) return;
    const idx = d.getFullYear() * 12 + d.getMonth();
    min = Math.min(min, idx);
    max = Math.max(max, idx);
  });
  return Number.isFinite(min) ? { min, max } : null;
}

function inScope(record, anchor) {
  if (statsScope === "all") return true;
  const d = parseTime(record.time);
  if (statsScope === "year") return d.y === anchor.y;
  return d.y === anchor.y && d.m === anchor.m;
}

function aggregateSummary(list) {
  const trips = list.filter((r) => r.consumption != null);
  // 里程按每条记录与上一条记录的差值累计，未加满的记录也算行驶里程
  const distance = list.reduce((s, r) => s + (r.distance || 0), 0);
  // 平均油耗与每公里油费按“加满周期”累计
  const span = trips.reduce((s, r) => s + (r.span || 0), 0);
  const tankLiters = trips.reduce((s, r) => s + (r.tankLiters || 0), 0);
  const tankCost = trips.reduce((s, r) => s + (r.tankCost || 0), 0);
  const liters = list.reduce((s, r) => s + r.liters, 0);
  const cost = list.reduce((s, r) => s + r.cost, 0);
  return {
    list,
    fills: list.length,
    trips: trips.length,
    distance,
    liters,
    cost,
    tripCost: tankCost,
    avg: span > 0 && tankLiters > 0 ? (tankLiters / span) * 100 : null,
    perKm: span > 0 ? tankCost / span : null,
    avgPrice: liters > 0 ? cost / liters : null,
    best: trips.length ? Math.min(...trips.map((r) => r.consumption)) : null,
  };
}

function prevAnchor() {
  const a = anchorPeriod();
  if (statsScope === "year") return { y: a.y - 1, m: a.m };
  const idx = a.y * 12 + (a.m - 1) - 1;
  return { y: Math.floor(idx / 12), m: (idx % 12) + 1 };
}

function canStep(dir) {
  if (statsScope === "all") return false;
  const b = dataBounds();
  if (!b) return false;
  const a = anchorPeriod();
  if (statsScope === "month") {
    const cur = a.y * 12 + (a.m - 1);
    return dir < 0 ? cur - 1 >= b.min : cur + 1 <= b.max;
  }
  const yMin = Math.floor(b.min / 12);
  const yMax = Math.floor(b.max / 12);
  return dir < 0 ? a.y - 1 >= yMin : a.y + 1 <= yMax;
}

function stepPeriod(dir) {
  if (!canStep(dir)) return;
  const a = anchorPeriod();
  if (statsScope === "month") {
    const idx = a.y * 12 + (a.m - 1) + dir;
    statsAnchor = { y: Math.floor(idx / 12), m: (idx % 12) + 1 };
  } else if (statsScope === "year") {
    statsAnchor = { y: a.y + dir, m: a.m };
  }
  renderStats();
}

function clampAnchor() {
  const b = dataBounds();
  if (!b) return;
  const a = anchorPeriod();
  if (statsScope === "year") {
    const yMin = Math.floor(b.min / 12);
    const yMax = Math.floor(b.max / 12);
    statsAnchor = { y: Math.min(Math.max(a.y, yMin), yMax), m: a.m };
    return;
  }
  if (statsScope !== "month") return;
  const cur = a.y * 12 + (a.m - 1);
  const target = Math.min(Math.max(cur, b.min), b.max);
  statsAnchor = { y: Math.floor(target / 12), m: (target % 12) + 1 };
}

function metricOf(agg) {
  if (statsMetric === "consumption") return agg.avg;
  if (statsMetric === "cost") return agg.cost;
  return agg.liters;
}

function buildBuckets(items) {
  const anchor = anchorPeriod();
  if (statsScope === "month") {
    return items
      .filter((r) => inScope(r, anchor))
      .map((r) => {
        const d = parseTime(r.time);
        return { label: `${d.m}/${d.day}`, value: statsMetric === "consumption" ? r.consumption : statsMetric === "cost" ? r.cost : r.liters };
      });
  }

  const months = new Map();
  items.forEach((r) => {
    const d = parseTime(r.time);
    if (statsScope === "year" && d.y !== anchor.y) return;
    const k = d.y * 12 + (d.m - 1);
    if (!months.has(k)) months.set(k, []);
    months.get(k).push(r);
  });

  let keys;
  if (statsScope === "year") {
    keys = Array.from({ length: 12 }, (_, i) => anchor.y * 12 + i);
  } else {
    keys = [...months.keys()].sort((a, b) => a - b).slice(-18);
  }

  return keys.map((k) => {
    const list = months.get(k) || [];
    const y = Math.floor(k / 12);
    const m = (k % 12) + 1;
    return {
      label: statsScope === "year" ? `${m}月` : `${String(y).slice(2)}/${m}`,
      value: list.length ? metricOf(aggregateSummary(list)) : null,
    };
  });
}

function renderStats() {
  clampAnchor();
  const items = withStats();
  const anchor = anchorPeriod();
  const scopeItems = items.filter((r) => inScope(r, anchor));
  const agg = aggregateSummary(scopeItems);

  document.getElementById("stats-range").textContent = statsScope === "all" ? `共 ${agg.fills} 次加油` : periodText();
  document.getElementById("period-nav").hidden = statsScope === "all";
  document.getElementById("period-label").textContent = periodText();
  document.getElementById("period-prev").disabled = !canStep(-1);
  document.getElementById("period-next").disabled = !canStep(1);

  let delta = null;
  if (statsScope !== "all") {
    const prev = aggregateSummary(items.filter((r) => inScope(r, prevAnchor())));
    if (prev.avg != null && agg.avg != null) delta = round2(agg.avg - prev.avg);
  }
  const deltaHtml = statsScope === "all"
    ? `<span class="delta plain">${agg.fills ? "全部时间累计" : "还没有任何记录"}</span>`
    : delta == null
      ? `<span class="delta plain">${agg.fills ? "上期无对比数据" : "本期暂无记录"}</span>`
      : `<span class="delta ${delta >= 0 ? "up" : "down"}">${delta >= 0 ? "↑" : "↓"} ${Math.abs(delta).toFixed(2)}L 较上期</span>`;

  document.getElementById("stats-hero").innerHTML = `
    <div class="hero-label">${ICONS.drop} 平均油耗</div>
    <div class="hero-main">
      <div class="hero-num">${agg.avg == null ? "--" : agg.avg.toFixed(2)}</div>
      <div class="hero-unit">L/100km</div>
    </div>
    <div class="hero-foot">
      ${deltaHtml}
      <div class="hero-stats">
        <div><span class="k">里程</span><span class="v">${agg.distance ? fmtNum(Math.round(agg.distance)) : "--"}</span></div>
        <div><span class="k">花费</span><span class="v">${agg.cost ? fmtNum(Math.round(agg.cost)) : "--"}</span></div>
      </div>
    </div>`;

  document.getElementById("stats-grid").innerHTML = `
    <article class="stat-card"><div class="label">${ICONS.pump} 加油次数</div><div class="value">${agg.fills} <span class="unit">次</span></div><div class="hint">${agg.fills ? `${agg.trips} 次可算油耗` : "还没有记录"}</div></article>
    <article class="stat-card"><div class="label">${ICONS.drop} 累计油量</div><div class="value">${agg.liters ? agg.liters.toFixed(1) : "--"} <span class="unit">L</span></div><div class="hint">${agg.avgPrice ? `均价 ¥${agg.avgPrice.toFixed(2)}/L` : "—"}</div></article>
    <article class="stat-card"><div class="label">${ICONS.route} 行驶里程</div><div class="value">${agg.distance ? fmtNum(Math.round(agg.distance)) : "--"} <span class="unit">km</span></div><div class="hint">${agg.trips ? `单次约 ${fmtNum(Math.round(agg.distance / agg.trips))}km` : "—"}</div></article>
    <article class="stat-card"><div class="label">${ICONS.loop} 每公里油费</div><div class="value">${agg.perKm ? "¥" + agg.perKm.toFixed(2) : "--"}</div><div class="hint">${agg.best ? `最低 ${agg.best.toFixed(2)} L/100km` : "—"}</div></article>`;

  const metricName = METRICS[statsMetric].name;
  document.getElementById("chart-title").textContent = statsScope === "month"
    ? `本月每次${metricName}`
    : statsScope === "year" ? `${anchor.y} 年各月${metricName}` : `历史各月${metricName}`;
  renderBarChart(document.getElementById("stats-chart"), buildBuckets(items));

  const box = document.getElementById("stats-breakdown");
  const sub = document.getElementById("stats-sub");
  if (!scopeItems.length) {
    sub.textContent = "";
    box.innerHTML = `<div class="empty"><strong>${statsScope === "all" ? "还没有加油记录" : "本期没有加油记录"}</strong>可以切换时间段，或到底部「记录」页添加一次加油</div>`;
    return;
  }

  if (statsScope === "month") {
    const rows = [...scopeItems].sort((a, b) => b.time.localeCompare(a.time));
    sub.textContent = `${rows.length} 次`;
    box.innerHTML = rows.map((r) => {
      const d = parseTime(r.time);
      const cons = r.consumption == null ? "首次加油" : `${r.consumption.toFixed(2)} L/100km`;
      return `<button class="row clickable" data-open-record="${r.id}">
        <span class="left"><span>${d.m}月${d.day}日 ${d.hm}<span class="sub">${r.liters.toFixed(1)}L · ${cons}</span></span></span>
        <span class="right">${money(r.cost)}</span>
      </button>`;
    }).join("");
  } else {
    const map = new Map();
    scopeItems.forEach((r) => {
      const d = parseTime(r.time);
      const k = `${d.y}-${pad(d.m)}`;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(r);
    });
    const rows = [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    sub.textContent = `${rows.length} 个月`;
    box.innerHTML = rows.map(([k, list]) => {
      const [y, m] = k.split("-");
      const a = aggregateSummary(list);
      const label = statsScope === "year" ? `${Number(m)} 月` : `${y} 年 ${Number(m)} 月`;
      return `<div class="row">
        <span class="left"><span>${label}<span class="sub">${a.fills} 次 · ${fmtNum(Math.round(a.distance))}km · ${money(a.cost)}</span></span></span>
        <span class="right${a.avg == null ? "" : " accent"}">${a.avg == null ? "—" : a.avg.toFixed(2)}<span class="unit-sm"> L/100km</span></span>
      </div>`;
    }).join("");
  }
  box.querySelectorAll("[data-open-record]").forEach((btn) => btn.addEventListener("click", () => openDetail(btn.dataset.openRecord)));
}

function renderBarChart(el, buckets) {
  const usable = buckets.filter((b) => b.value != null && b.value > 0);
  if (!usable.length) {
    el.innerHTML = `<div class="chart-empty">该时间段内没有可统计的数据</div>`;
    return;
  }
  const w = 390, h = 190, p = { l: 12, r: 12, t: 26, b: 30 };
  const vals = buckets.map((b) => (b.value == null ? 0 : b.value));
  const maxV = Math.max(...vals);
  const innerW = w - p.l - p.r;
  const innerH = h - p.t - p.b;
  const slot = innerW / buckets.length;
  const bw = Math.max(5, Math.min(34, slot * 0.52));
  const accent = cssVar("--accent", "#007aff");
  const muted = cssVar("--muted", "#8e8e93");
  const maxIdx = vals.indexOf(maxV);
  const dp = METRICS[statsMetric].dp;
  const fmtVal = (v) => (statsMetric === "cost" ? fmtNum(Math.round(v)) : v.toFixed(dp));
  const base = p.t + innerH;

  const bars = vals.map((v, i) => {
    const cx = p.l + slot * i + slot / 2;
    const bh = v > 0 ? Math.max(4, (v / maxV) * innerH) : 0;
    if (!bh) return `<rect x="${cx - bw / 2}" y="${base - 3}" width="${bw}" height="3" rx="1.5" fill="${muted}" fill-opacity=".18"/>`;
    return `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="${Math.min(5, bw / 2)}" fill="${accent}" fill-opacity="${i === maxIdx ? "1" : ".32"}"/>`;
  }).join("");

  const every = Math.max(1, Math.ceil(buckets.length / 6));
  const labels = buckets.map((b, i) => {
    if (i % every !== 0 && i !== buckets.length - 1) return "";
    const cx = p.l + slot * i + slot / 2;
    return `<text x="${cx}" y="${h - 9}" text-anchor="middle" fill="${muted}" font-size="10">${b.label}</text>`;
  }).join("");

  const peakX = p.l + slot * maxIdx + slot / 2;
  const peakY = Math.max(12, p.t - 8);
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="统计柱状图">
    <line x1="${p.l}" y1="${base}" x2="${w - p.r}" y2="${base}" stroke="${muted}" stroke-opacity=".28" stroke-width="1"/>
    ${bars}
    <text x="${peakX}" y="${peakY}" text-anchor="middle" fill="${accent}" font-size="11" font-weight="700">${fmtVal(maxV)}</text>
    ${labels}
  </svg>`;
}

function openSheet() {
  renderSettings();
  document.getElementById("mask").classList.add("show");
  document.getElementById("sheet").classList.add("show");
}
function closeSheet() {
  document.getElementById("mask").classList.remove("show");
  document.getElementById("sheet").classList.remove("show");
  state.vehicle.name = document.getElementById("veh-name").value.trim() || state.vehicle.name;
  state.vehicle.spec = document.getElementById("veh-spec").value.trim() || state.vehicle.spec;
  state.vehicle.plate = document.getElementById("veh-plate").value.trim() || state.vehicle.plate;
  save();
  renderAll();
}

function uid() { return "r" + Math.random().toString(36).slice(2, 9); }

function boot() {
  applyTheme();
  document.querySelectorAll(".car-icon").forEach((el) => { el.innerHTML = ICONS.car; });
  document.querySelectorAll("[data-open-settings]").forEach((el) => {
    el.innerHTML = ICONS.gear;
    el.addEventListener("click", openSheet);
  });
  document.getElementById("fab").innerHTML = ICONS.plus;
  document.getElementById("fab").addEventListener("click", () => openForm());
  document.getElementById("to-records").addEventListener("click", () => { renderRecords(); showView("view-records"); });
  document.getElementById("records-back").addEventListener("click", () => showView("view-home"));
  document.getElementById("detail-back").addEventListener("click", () => showView(detailFrom));
  document.getElementById("detail-edit").addEventListener("click", () => openForm(currentId));
  document.getElementById("form-cancel").addEventListener("click", () => showView(currentId ? "view-detail" : "view-home"));
  document.getElementById("sheet-done").addEventListener("click", closeSheet);
  document.getElementById("mask").addEventListener("click", closeSheet);
  document.getElementById("export-json").addEventListener("click", exportJSON);
  document.getElementById("export-xlsx").addEventListener("click", exportXLSX);
  document.getElementById("import-file").addEventListener("click", () => document.getElementById("file-data").click());
  document.getElementById("clear-data").addEventListener("click", clearAllData);
  document.getElementById("file-data").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) importFile(file);
    e.target.value = "";
  });
  document.querySelectorAll("[data-theme-opt]").forEach((el) => {
    el.addEventListener("click", () => {
      state.settings.theme = el.dataset.themeOpt;
      save(); applyTheme(); renderSettings(); renderHome();
    });
  });
  document.querySelectorAll(".swatch").forEach((el) => {
    el.addEventListener("click", () => {
      state.settings.accent = el.dataset.accent;
      save(); applyTheme(); renderSettings(); renderHome();
    });
  });
  document.querySelector("[data-toggle=full]").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    setToggle(btn, btn.dataset.on !== "1");
    updateComputedFields();
  });
  document.getElementById("record-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const rec = {
      id: currentId || uid(),
      time: form.time.value,
      odometer: Number(form.odometer.value),
      cost: Number(form.cost.value),
      price: Number(form.price.value),
      liters: Number(form.liters.value),
      grade: form.grade.value,
      full: form.querySelector("[data-toggle=full]").dataset.on === "1",
      station: form.station.value.trim(),
    };
    if (!rec.odometer || !rec.cost || !rec.liters) {
      alert("请填写里程、花费和加油量");
      return;
    }
    const idx = state.records.findIndex((r) => r.id === rec.id);
    if (idx >= 0) state.records[idx] = rec;
    else state.records.push(rec);
    save();
    renderAll();
    openDetail(rec.id);
  });
  wireFormCalc();
  wireTabs();
  wireStats();
  clampAnchor();
  renderAll();
  const initial = "view-" + (location.hash || "").replace("#", "");
  showView(TAB_VIEWS.includes(initial) ? initial : "view-home");
  registerSW();
}

function wireTabs() {
  const tabs = [
    ["view-home", "home", "概览"],
    ["view-stats", "chart", "统计"],
    ["view-records", "list", "记录"],
  ];
  const bar = document.getElementById("tabbar");
  bar.innerHTML = tabs
    .map(([view, icon, label], i) => `<button type="button" class="tab${i === 0 ? " active" : ""}" data-tab="${view}"><span class="ti">${TAB_ICONS[icon]}</span><span>${label}</span></button>`)
    .join("");
  bar.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tab === "view-records") renderRecords();
      showView(btn.dataset.tab);
    });
  });
}

function wireStats() {
  document.querySelectorAll("#stats-scope button").forEach((btn) => {
    btn.addEventListener("click", () => {
      statsScope = btn.dataset.scope;
      document.querySelectorAll("#stats-scope button").forEach((b) => b.classList.toggle("active", b === btn));
      clampAnchor();
      renderStats();
    });
  });
  document.querySelectorAll("#stats-metric button").forEach((btn) => {
    btn.addEventListener("click", () => {
      statsMetric = btn.dataset.metric;
      document.querySelectorAll("#stats-metric button").forEach((b) => b.classList.toggle("active", b === btn));
      renderStats();
    });
  });
  document.getElementById("period-prev").innerHTML = ICONS.chevL;
  document.getElementById("period-next").innerHTML = ICONS.chevR;
  document.getElementById("period-prev").addEventListener("click", () => stepPeriod(-1));
  document.getElementById("period-next").addEventListener("click", () => stepPeriod(1));
}

function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  if (!/^https?:/.test(location.protocol)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

boot();
