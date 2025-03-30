	$(function(){
		$("input[name=price]").click(function(){
			var totp = parseFloat($('#totalprice').val());
			var val = parseFloat($(this).val());			
			
			  if($(this).prop("checked") == true){
				  $('#totalprice').val(totp + val);
			  }else{
				   $('#totalprice').val(totp - val);
			  }
		 })
	 
	});