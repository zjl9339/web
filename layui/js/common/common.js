layui.use(['jquery','layer','element','form','table','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		table = layui.table,
		laydate = layui.laydate;
	
	form.verify({
	    telephone:[/([0-9]{3,4}-)?[0-9]{7,8}/, '请输入正确格式的座机号码']
		,remark: function (value){
		    if(value.length > 200){
		        return '长度大于200！请重新输入';
		    }
		},
		strongPsd:[/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,50}$/, '密码应为8位以上的数字和字母组合！'],
		
	});
}); 