<?php
session_start(); // 启用SESSION
//include("./API.php");
//include("../ruchu.php");
// tongji("ipqm"); // 更新统计接口调用次数
function get_bro(){  
     $sys = $_SERVER['HTTP_USER_AGENT'];  //获取用户代理字符串  
     if (stripos($sys, "Firefox/") > 0) {  
         preg_match("/Firefox\/([^;)]+)+/i", $sys, $b);  
         $exp[0] = "Firefox";  
         $exp[1] = $b[1];  //获取火狐浏览器的版本号  
     } elseif (stripos($sys, "Maxthon") > 0) {  
         preg_match("/Maxthon\/([\d\.]+)/", $sys, $aoyou);  
         $exp[0] = "傲游";  
         $exp[1] = $aoyou[1];  
     } elseif (stripos($sys, "MSIE") > 0) {  
         preg_match("/MSIE\s+([^;)]+)+/i", $sys, $ie);  
         $exp[0] = "IE";  
         $exp[1] = $ie[1];  //获取IE的版本号  
     } elseif (stripos($sys, "OPR") > 0) {  
             preg_match("/OPR\/([\d\.]+)/", $sys, $opera);  
         $exp[0] = "Opera";  
         $exp[1] = $opera[1];    
     } elseif(stripos($sys, "Edge") > 0) {  
         //win10 Edge浏览器 添加了chrome内核标记 在判断Chrome之前匹配  
         preg_match("/Edge\/([\d\.]+)/", $sys, $Edge);  
         $exp[0] = "Edge";  
         $exp[1] = $Edge[1];  
     } elseif (stripos($sys, "Chrome") > 0) {  
             preg_match("/Chrome\/([\d\.]+)/", $sys, $google);  
         $exp[0] = "Chrome";  
         $exp[1] = $google[1];  //获取google chrome的版本号  
     } elseif(stripos($sys,'rv:')>0 && stripos($sys,'Gecko')>0){  
         preg_match("/rv:([\d\.]+)/", $sys, $IE);  
             $exp[0] = "IE";  
         $exp[1] = $IE[1];  
     } elseif(stripos($sys,'Safari')>0){  
         preg_match('#Safari/([a-zA-Z0-9.]+)#i', $sys, $Safari);  
             $exp[0] = "Safari";  
         $exp[1] = $Safari[1];  
     }else {  
        $exp[0] = "未知";  
        $exp[1] = "";   
     }  
     return $exp[0].'('.$exp[1].')';  
}  
$bro = get_bro();
//操作系统
$ua = $_SERVER['HTTP_USER_AGENT'];
function get_os_info( $ua ) {
	$title = 'unknow';
	$icon = 'unknow';
	if ( preg_match('/win/i', $ua) ) {
		if ( preg_match( '/Windows NT 10.0/i', $ua ) ) {
			$title = "Windows 10";
			$icon = "windows_win10";
		} elseif ( preg_match( '/Windows NT 6.1/i', $ua ) ) {
			$title = "Windows 7";
			$icon = "windows_win7";
		} elseif ( preg_match( '/Windows NT 5.1/i', $ua ) ) {
			$title = "Windows XP";
			$icon = "windows";
		} elseif ( preg_match( '/Windows NT 6.2/i', $ua ) ) {
			$title = "Windows 8";
			$icon = "windows_win8";
		} elseif ( preg_match( '/Windows NT 6.3/i', $ua ) ) {
			$title = "Windows 8.1";
			$icon = "windows_win8";
		} elseif ( preg_match( '/Windows NT 6.0/i', $ua ) ) {
			$title = "Windows Vista";
			$icon = "windows_vista";
		} elseif ( preg_match( '/Windows NT 5.2/i', $ua ) ) {
			if ( preg_match( '/Win64/i', $ua ) )
				$title = "Windows XP 64 bit";
			else
				$title = "Windows Server 2003";

			$icon = 'windows';
		} elseif ( preg_match('/Windows Phone/i', $ua ) ) {
			$matches = explode(';',$ua);
			$title = $matches[2];
			$icon = "windows_phone";
		}
	}
	elseif ( preg_match( '#iPod.*.CPU.([a-zA-Z0-9.( _)]+)#i', $ua, $matches ) ) {
		$title = "iPod ".$matches[1];
		$icon = "iphone";
	}
	elseif ( preg_match( '#iPhone OS ([a-zA-Z0-9.( _)]+)#i', $ua, $matches ) ) {
		$title = "iPhone";
		$icon = "iPhone";
	}
	elseif ( preg_match( '#iPad.*.CPU.([a-zA-Z0-9.( _)]+)#i', $ua, $matches ) ) {
		$title = "iPad ";
		$icon = "ipad";
	}
	elseif ( preg_match( '/Mac OS X.([0-9. _]+)/i', $ua, $matches ) ) {
		if( count( explode( 7,$matches[1] ) ) > 1 )
			$matches[1] = 'Lion ';

		elseif( count( explode( 8,$matches[1] ) ) > 1 )
			$matches[1] = 'Mountain Lion ';

		$title = "Mac OSX ";
		$icon = "macos";
	}
	elseif ( preg_match( '/Macintosh/i', $ua ) ) {
		$title = "Mac OS";
		$icon = "macos";
	}
	elseif ( preg_match( '/CrOS/i', $ua ) ){
		$title = "Google Chrome OS";
		$icon = "chrome";
	}
	elseif ( preg_match( '/Linux/i', $ua ) ) {
		$title = 'Linux';
		$icon = 'linux';
		if ( preg_match( '/Android.([0-9. _]+)/i', $ua, $matches ) ) {
			$title = $matches[0];
			$icon = "android";
		} elseif ( preg_match( '#Ubuntu#i', $ua ) ) {
			$title = "Ubuntu Linux";
			$icon = "ubuntu";
		} elseif ( preg_match( '#Debian#i', $ua ) ) {
			$title = "Debian GNU/Linux";
			$icon = "debian";
		} elseif ( preg_match( '#Fedora#i', $ua ) ) {
			$title = "Fedora Linux";
			$icon = "fedora";
		}
	}
	return array( $title, $icon );
}
$os=get_os_info($ua)[0];
//curl封装
function http_get($url){
    $oCurl = curl_init();
    if(stripos($url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
    }
    curl_setopt($oCurl, CURLOPT_URL, $url);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);
    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return false;
    }
}
function http_post($url,$param,$post_file=false){
    $oCurl = curl_init();
    if(stripos($url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
    }
    if (is_string($param) || $post_file) {
        $strPOST = $param;
    } else {
        $aPOST = array();
        foreach($param as $key=>$val){
            $aPOST[] = $key."=".urlencode($val);
        }
        $strPOST =  join("&", $aPOST);
    }
    curl_setopt($oCurl, CURLOPT_URL, $url);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($oCurl, CURLOPT_POST,true);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS,$strPOST);
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);
    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return false;
    }
}
//GET-curl封装
function get_curl($url, $post=0, $referer=0, $cookie=0, $header=0, $ua=0, $nobaody=0){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	$httpheader[] = "Accept:application/json";
	$httpheader[] = "Accept-Encoding:gzip,deflate,sdch";
	$httpheader[] = "Accept-Language:zh-CN,zh;q=0.8";
	$httpheader[] = "Connection:close";
	curl_setopt($ch, CURLOPT_HTTPHEADER, $httpheader);
	if ($post) {
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	}
	if ($header) {
		curl_setopt($ch, CURLOPT_HEADER, true);
	}
	if ($cookie) {
		curl_setopt($ch, CURLOPT_COOKIE, $cookie);
	}
	if($referer){
		if($referer==1){
			curl_setopt($ch, CURLOPT_REFERER, 'http://m.qzone.com/infocenter?g_f=');
		}else{
			curl_setopt($ch, CURLOPT_REFERER, $referer);
		}
	}
	if ($ua) {
		curl_setopt($ch, CURLOPT_USERAGENT, $ua);
	}
	else {
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Linux; U; Android 4.0.4; es-mx; HTC_One_X Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0");
	}
	if ($nobaody) {
		curl_setopt($ch, CURLOPT_NOBODY, 1);
	}
	curl_setopt($ch, CURLOPT_TIMEOUT, 3);
	curl_setopt($ch, CURLOPT_ENCODING, "gzip");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$ret = curl_exec($ch);
	curl_close($ch);
	return $ret;
}
 
//tongji("ipqm"); 

$hh = $_GET["hh"] ? "\n" : "\n"; // 换行符号(默认\n)
// 获取图片内容
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-type: image/JPEG");
 

// 获取img参数
$imgParam = isset($_GET['img']) ? intval($_GET['img']) : 0; // 获取img参数并转为整数

// 根据img参数选择图片
if ($imgParam >= 1 && $imgParam <= 10) {
    // 指定相应的图片
    $randomImage = "data/ruchu" . $imgParam . ".jpeg"; // 修改为 data/ruchuX.jpeg
    if (!file_exists($randomImage)) {
        die("指定的图片不存在，请检查文件名。");
    }
} else {
    // 获取data目录下所有JPEG文件
    $images = glob(__DIR__ . "/data/*.jpeg"); // 修改为 data 文件夹
    if (empty($images)) {
        die("未找到任何JPEG图片，请确保data目录中有JPEG文件。");
    }
    // 随机选择一张图片
    $randomImage = $images[array_rand($images)];
}

// 创建图像
$im = imagecreatefromjpeg($randomImage);
if (!$im) {
    die("无法创建图像，检查JPEG文件路径！");
}

// 定义颜色
$red = imageColorAllocate($im, 255, 0, 0);
$black = imageColorAllocate($im, 0, 0, 0);
$font = __DIR__ . '/data/msyh.ttf'; // 修改路径为 data/msyh.ttf

$ip = $_SERVER["REMOTE_ADDR"];

$weekarray = array("日", "一", "二", "三", "四", "五", "六");
$today = date('Y年n月j日');
$dayOfWeek = $weekarray[date("w")];
$userAgent = $_SERVER['HTTP_USER_AGENT'];
// $os = PHP_OS; // 或更复杂的解析

$url = 'https://api.suyanw.cn/api/ipxx.php?ip=' . $ip;
$data = get_curl($url);
$data = json_decode($data, true);

// 根据返回的JSON结构修改字段提取
if (isset($data['code']) && $data['code'] == 200) {
    // 获取省份和城市信息
    $province = $data['data']['province'] ?? '未知省份';
    $city = $data['data']['city'] ?? '未知城市';
    $location = $province . "-" . $city;
} else {
    // 如果获取失败，给出默认值
    $province = '未知省份';
    $city = '未知城市';
}

// 输出文本
if (file_exists($font)) {
    $y_offset = 45; // 初始Y坐标
    // 显示位置信息
    imagettftext($im, 16, 0, 10, $y_offset, $red, $font, '欢迎您来自: ' . $location . ' 的朋友');
    $y_offset += 30; // 更新Y坐标
    imagettftext($im, 16, 0, 10, $y_offset + 5, $red, $font, '今天是：' . $today . ' 星期' . $dayOfWeek);
    $y_offset += 30; // 更新Y坐标
    imagettftext($im, 16, 0, 10, $y_offset + 5, $red, $font, '您的IP是: ' . $ip);
    $y_offset += 30; // 更新Y坐标
    imagettftext($im, 16, 0, 10, $y_offset + 7, $red, $font, '您使用的操作系统: ' . $os);
    $y_offset += 30; // 更新Y坐标
    imagettftext($im, 16, 0, 10, $y_offset + 10, $red, $font, '您使用的浏览器: ' . $bro);
    imagettftext($im, 16, 0, 10, $y_offset + 40, $red, $font, '此接口由如初提供！ ');
} else {
    die("字体文件不存在，请检查路径！");
}

// 输出图像
imagejpeg($im);
imagedestroy($im);
?>
