layui.use(['jquery','layer','element','form'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form;

	pageEvent($,form)
	
}); 

function pageEvent($,form){
	// 修改密码
	form.on('submit(changePsd)', function(data){
		if(data.field.new_psw !== data.field.new_psw1) {
			layer.msg("请输入与第一次相同的密码");
			return false;
		}
		var param={
			new_psw: data.field.new_psw,
			old_psw:'123456'
		};
		$.ajax({
			url : "../user/changePassword",
			data : param,
			type: 'POST',
			success: function(data){
				if (data.ret.succeed) {
					layer.msg("修改密码成功！");
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					return;
				}else{
					layer.msg(data.ret.retMsg);
				}
			}
		})
		return false;
	});	
}