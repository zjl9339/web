// 获取表单字典数据
var source_options = "", 
	level_options = "", 
	type_options = "", 
	progress_options = "";

layui.use(['jquery','layer','element','form','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;
	
	source_options = complaintSource($);
	level_options = complaintLevel($);
	type_options = complaintType($);
	progress_options = getProgress($);
}); 

function complaintSource($){
	var options = '<option value="">请选择</option>';
	// $.ajax({
	// 	url : "../user/getUser",
	// 	type: 'GET',
	// 	async: false,
	// 	success: function(data){
			// if(data.ret.succeed){
				var data = [
					{value: 0, name: "111111"},
					{value: 1, name: "22222"}
				];
				data.forEach(function(item){
					options += '<option value="'+item.value+'">'+item.name+'</option>';
				})
			// } else if(data.ret.retCode == 2003){
			// 	window.location.href = "login.html";
			// }
	// 	}
	// });
	return options;
}

function complaintLevel($){
	var options = '<option value="">请选择</option>';
	// $.ajax({
	// 	url : "../user/getUser",
	// 	type: 'GET',
	// 	async: false,
	// 	success: function(data){
			// if(data.ret.succeed){
				var data = [
					{value: 0, name: "111111"},
					{value: 1, name: "22222"}
				];
				data.forEach(function(item){
					options += '<option value="'+item.value+'">'+item.name+'</option>';
				})
			// } else if(data.ret.retCode == 2003){
			// 	window.location.href = "login.html";
			// }
	// 	}
	// });
	return options;
}

function complaintType($){
	var options = '<option value="">请选择</option>';
	// $.ajax({
	// 	url : "../user/getUser",
	// 	type: 'GET',
	// 	async: false,
	// 	success: function(data){
			// if(data.ret.succeed){
				var data = [
					{value: 0, name: "111111"},
					{value: 1, name: "22222"}
				];
				data.forEach(function(item){
					options += '<option value="'+item.value+'">'+item.name+'</option>';
				})
			// } else if(data.ret.retCode == 2003){
			// 	window.location.href = "login.html";
			// }
	// 	}
	// });
	return options;
}

function getProgress($){
	var options = '<option value="">请选择</option>';
	// $.ajax({
	// 	url : "../user/getUser",
	// 	type: 'GET',
	// 	async: false,
	// 	success: function(data){
			// if(data.ret.succeed){
				var data = [
					{value: 0, name: "111111"},
					{value: 1, name: "22222"}
				];
				data.forEach(function(item){
					options += '<option value="'+item.value+'">'+item.name+'</option>';
				})
			// } else if(data.ret.retCode == 2003){
			// 	window.location.href = "login.html";
			// }
	// 	}
	// });
	return options;
}

