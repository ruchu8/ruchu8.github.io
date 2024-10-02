
// 显示上传的图片
function displayPicture(){
	try{
		var path = $('#savepath').val();

		if(path == ""){ return; }
		
		//--- 限制的大小
		var vSize = $('#picturesize').val();
		var vLimit = $('#picturelimit').val();
		var _width, _height;
		var swidth, sheight;
		if(vSize.length > 0){
			_width = vSize.split(",")[0];
			_height = vSize.split(",")[1];			
			swidth = "width=\""+_width+"\"";
			sheight = parseInt(_height) > 0 ? " height=\""+_height+"\"" : "";
		}
		
		var aryPath = path.split(";");
		var length = aryPath.length;
		var html = "<div class='imgb'>";

		if (vLimit == 1){
			length = 2;
		}else{
			length = length > vLimit ? (parseInt(vLimit)+1) : length;
		}
		
		//console.log("len " + length);
		//console.log(vLimit );
		
		var j = 1;
		for(var i=length; i>=1; i--){
			if(aryPath[i-1] == ""){
				continue;
			}
			
			var _xhtml;
			_xhtml = "<div class=\"imgbox\">" + "<a href=\""+ aryPath[i-1] +"\" target=\"_blank\"><img src=\"" + aryPath[i-1] + "\" " + swidth + sheight + " /></a><br />";
			_xhtml = _xhtml + "<input type='hidden' class='txtbox debug' size='15' name='picurl_" + j + "' value='" + aryPath[i-1] + "' />";
			if(aryPath[i-1] != "/files/nopic.jpg"){
				_xhtml = _xhtml + " <a href=\"javascript:void RemoveBoxPic('" + aryPath[i-1] + "');\" class='red'>删除本图</a>";
			}			
			_xhtml = _xhtml + "</div>";			
			html = html + _xhtml;

			// 每行三张图片
			$('#totalimg').val((length - i) + " -- " + (length - i)%3);
			if((length - i)%3 == 0){
				html = html + "</div><div class='imgb'>";
			}
			j++;
		}
		html = html + "</div>";

		$('#totalimg').val(length - 1);
		
		document.getElementById("showpicture").innerHTML = html;
	}catch(e){
		alert("common : " + e.message);
	}
}


// 摘要:
//		从列表中移出图片.
function RemoveBoxPic(delpath){
	try{
		var path = $('#savepath').val();
		var vLimit = $('#picturelimit').val();		
		if(path == ""){ return; }
		
		//--- 限制的大小
		var vSize = $('#picturesize').val();
		var _width, _height;
		var swidth, sheight;
		if(vSize.length > 0){
			_width = vSize.split(",")[0];
			_height = vSize.split(",")[1];			
			swidth = "width=\""+_width+"\"";
			sheight = " height=\"" + _height + "\"";
		}		
		
		var aryPath = path.split(";");
		var length = aryPath.length;

		console.log("del length: " + length);
		
		/*if (vLimit == 1){ 
			length = 2;
		}else{ 
			length = length > vLimit ? (parseInt(vLimit)+1) : length;
		}*/
		
		var newpath = "";
		var html = "<div class='imgb'>";
		
		console.log("delpath : " + delpath);
		console.log("del path: " + path);
		
		var j = 1;
		for(var i=length; i>=1; i--){
			if(aryPath[i-1] == ""){
				continue;
			}
			
			if(delpath == aryPath[i-1]){
				continue;
			}
			
			var _xhtml;
			_xhtml = "<div class=\"imgbox\">" + "<a href=\""+ aryPath[i-1] +"\" target=\"_blank\"><img src=\"" + aryPath[i-1] + "\" " + swidth + sheight + " /></a><br />";
			_xhtml = _xhtml + "<input type='hidden' class='txtbox debug' size='15' name='picurl_" + j + "' value='" + aryPath[i-1] + "' />";
			if(aryPath[i-1] != "/files/upload.jpg"){
				_xhtml = _xhtml + " <a href=\"javascript:void RemoveBoxPic('"+ aryPath[i-1] +"');\" class='red'>移出图片</a>";
			}			
			_xhtml = _xhtml + "</div>";			
			html = html + _xhtml;

			newpath = newpath +  aryPath[i-1] + ";";
			
			j++;
		}
		
		console.log(html.length);
		
		if(html.length  == 18){
			html = html + "<img src=\"/files/upload.jpg\" width=\"250\" height=\"200\" />";
		}

		html = html + "</div>";
		$('#totalimg').val(length);
		$('#savepath').val(newpath);
				
		document.getElementById("showpicture").innerHTML = html;
	}catch(e){
		alert("common : " + e.message);
	}
}