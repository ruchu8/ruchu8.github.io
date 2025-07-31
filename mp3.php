<?php
// 确保PHP在Vercel上正常工作的设置
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

// 获取URL查询参数中的type值
$type = isset($_GET['type']) ? $_GET['type'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;

// 目标URL和POST数据
$url = 'https://www.eev3.com/js/play.php';

if (!$id) {
    die(json_encode(['error' => '缺少必要的id参数']));
}

$data = ['id' => $id, 'type' => 'music'];

// 请求头配置
$headers = [
    'cache-control: max-age=0',
    'referer: https://www.eev3.com/mp3/' . $id . '.html',
    'accept-language: zh-CN,zh;q=0.9',
    'priority: u=0, i',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
];

// 初始化cURL
$ch = curl_init();
if ($ch === false) {
    die(json_encode(['error' => 'Failed to initialize cURL']));
}

// 设置cURL选项
$options = [
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => true, // Vercel环境建议启用SSL验证
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 5,
    CURLOPT_ENCODING => '',
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
];

curl_setopt_array($ch, $options);

// 执行请求
$response = curl_exec($ch);
if(curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    // 解码JSON响应
    $decoded = json_decode($response, true);
    
    // 检查JSON解码是否成功
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => '无效的JSON响应', 'details' => json_last_error_msg()]);
        curl_close($ch);
        exit;
    }

    // 根据?type参数返回不同的URL
    $type = strtolower($type);
    if ($type === 'pic') {
        if (empty($decoded['pic'])) {
            echo json_encode(['error' => '未找到图片URL']);
            curl_close($ch);
            exit;
        }
        
        // 获取图片内容
        $imageContent = file_get_contents($decoded['pic']);
        if ($imageContent === false) {
            echo json_encode(['error' => '无法获取图片内容']);
            curl_close($ch);
            exit;
        }
        
        header('Content-Type: image/jpeg');
        echo $imageContent;
        exit;
    } elseif ($type === 'url') {
        if (empty($decoded['url'])) {
            echo json_encode(['error' => '未找到音频URL']);
            curl_close($ch);
            exit;
        }
        
        $audioUrl = $decoded['url'];
        header('Content-Type: audio/mp4');
        header('Content-Disposition: inline');
        header('Accept-Ranges: bytes');
        header('Cache-Control: no-cache');
        
        // 读取并输出音频内容
        $audioContent = file_get_contents($audioUrl);
        if ($audioContent === false) {
            echo json_encode(['error' => '无法获取音频内容']);
            curl_close($ch);
            exit;
        }
        
        echo $audioContent;
        exit;
    } elseif ($type === 'lkid') {
        if (!isset($decoded['lkid'])) {
            echo json_encode(['error' => '未找到lkid']);
            curl_close($ch);
            exit;
        }
        
        echo $decoded['lkid'];
        exit;
    } else {
        // 返回原始的JSON响应
        echo json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}

// 关闭cURL资源
curl_close($ch);
?>
