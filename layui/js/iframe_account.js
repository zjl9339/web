layui.use(['jquery','layer','element','form'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		base = layui.base;
		
	init($,form);
	pageEvent($,form)
	
}); 

function init($, form){
	setTimeout(function(){
		var data = $("#data").val();
		if(data){
			data = JSON.parse($("#data").val());
			form.val("formRole", data);
			$('[name="email"]').prop("disabled",true);
			$('select[name="role"]').val(['1', '2']);
			form.render();
		}else {
			form.val("formRole", {});
		}
	},100);
}

function pageEvent($,form){
	form.on('submit(save)', function(data){
		if(!data.field.role) return parent.layer.msg("请选择角色");
		data.field.role = data.field.role.join(",");
		console.log(data.field)
		return false;            //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});
	
}


