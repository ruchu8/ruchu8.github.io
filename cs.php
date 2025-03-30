<?php
// 获取用户的真实IP
function getUserIp() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        // Cloudflare头部
        return $_SERVER['HTTP_CF_CONNECTING_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // 代理的情况下
        return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } else {
        // 默认情况
        return $_SERVER['REMOTE_ADDR'];
    }
}

// 获取用户的IP
$user_ip = getUserIp();

// 设置请求的URL
$url = "http://inip.in/ip.json";

// 发送请求并获取返回的内容
$response = file_get_contents($url);

// 检查请求是否成功
if ($response === FALSE) {
    // 返回错误信息
    http_response_code(500);
    echo json_encode(["error" => "无法获取IP信息"]);
    exit;
}

// 将返回的JSON解码为数组
$data = json_decode($response, true);

// 创建返回的数据
$result = [
    "user_ip" => $user_ip,
    "ip_info" => $data
];

// 设置响应头为JSON格式
header('Content-Type: application/json');

// 返回结果
echo json_encode($result);
?>
