layui.use(['jquery','layer','element','form'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form;
	init($,form);
}); 

function init($,form) {
	form.on('submit(login)', function(data){
		var info ={
			"username": data.field.username,
			"password": sha256_digest(data.field.password)
		};
		$.ajax({
			url : "../user/login",
			type : "post",
			data : info,
			dataType : 'json',
			success : function(data) {
				if (data.ret.succeed) {
					// 验证密码是否为8位以上的数字字母组合
					var regex = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,50}$');
					if(!regex.test(data.field.password)){
						showPsd('首次登录请修改密码');
						return;
					}else{
						window.location.href = "index.html";
					}
				} else {
					if(data.ret.retCode==2005){
						layer.alert(data.ret.retMsg,function(index){
							layer.close(index);
						});
					}else{
						layer.alert(data.ret.retMsg);
					}
				}
				form.val("formLogin",{
					password: ""
				})
			},
			error : function() {
				layer.alert('请求后台失败！')
			}
		});
		return false;
	})
}

