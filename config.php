<?php
define('programVersion', '1.3.7');
if (!defined('init')){ // 直接访问处理程序
	http_response_code(403); header('Content-Type: text/plain; charset=utf-8'); header('Refresh: 3;url=./');
	die("HTTP 403 禁止访问！\r\n此文件是 PanDownload 网页复刻版 PHP 语言版项目版本 " . programVersion . " 的配置文件！\r\n禁止直接访问！");
}

define('BDUSS', 'jhqVm0wd0dQRzYxVXR0V2tNMzdic0ZRZVhUaXVDUVplNjd0QkNZZ295WX5rM3BmRUFBQUFBJCQAAAAAAQAAAAEAAABLgswksK7l-jk0MTk3MwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8GU18~BlNff'); // 你的 SVIP BDUSS
define('STOKEN', '09595b07f7e3ff62bacd90d770a1ff09e657ba5478dc9600066cf0ef3ace43f7'); // 你的 SVIP STOKEN
define('IsCheckPassword', true); // 设为 true 则要求密码为变量 Password 的值，否则提示密码错误；设为 false 则不需要密码。
define('Password', '147258'); // 在下载器首页需要输入的密码，如果将 IsCheckPassWord 设为 false 则无论设置什么都会失效。
