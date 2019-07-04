layui.use(['jquery','layer','element','form'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		base = layui.base;
		
	init($,form);
	pageEvent($,form);
	
}); 

function init($, form){
	setTimeout(function(){
		var formH = $("#formH").val();
		$("form").css("height", formH + "px");
		$("#select_user_info_ul").css("height", (formH - 139 - 38 -12) + "px");
		
		var id = $("#modifyId").val();
		if(id){  // 修改
			// $.ajax({
			// 	url:"../role/getRoleById",
			// 	data:{
			// 		role_id:id
			// 	},
			// 	type:"POST",
			// 	success:function(result){
					var result = {"ret":{"succeed":true,"retCode":1,"retMsg":"获取角色信息成功!"},"role":{"role_name":"管理员","role_id":1,"role_remarks":"综合岗员工,权限已设置","role_status":1,"role_create_date":"2017-08-04 13:22:31"}}
					if(result.ret.succeed){
						form.val("formRole", result.role);
						getRoleAuthority($,form,id);
					}else {
						layer.msg(result.ret.retMsg)
					}
			// 	}	
			// });
		}else {  // 创建
			form.val("formRole", {});
			// 获取角色
			getAllAuthority($);
		}
		form.render();
	},100)
	
}

function pageEvent($,form,table){
	// checkbox 勾选事件
	form.on('checkbox', function(data){
		var name = $(data.elem).attr("lay-name");
		if(name == "parent") {   // 一级菜单点击事件对子菜单影响
			$(data.elem).siblings("ul").find("li input").each(function(){
				data.elem.checked ? $(this).prop("checked",true) : $(this).prop("checked",false);			
			})
		}else {                 // 二级菜单点选对上级菜单影响
			if(data.elem.checked) {
				$(data.elem).parent("li").parent("ul").siblings("input").prop("checked",true);
			}else {
				$(data.elem).parent("li").parent("ul").siblings("input").prop("checked",false);
				$(data.elem).parent("li").siblings("li").each(function(){
					if($(this).find("input").prop("checked")) {
						$(data.elem).parent("li").parent("ul").siblings("input").prop("checked",true);
					}
				})
			}
		}
		form.render("checkbox");
	});  
	
	// 角色表单 提交事件
	form.on('submit(save)', function(data){
		var auth_ids = "", url = "";
		$("#select_user_info_ul input").each(function(i,item){
			if($(item).prop("checked")){
				auth_ids += $(item).val()+",";
			}
		});
		auth_ids = auth_ids.substring(0,auth_ids.length-1);
		if(!auth_ids){
			layer.msg("请选择角色");
			return;
		}
		var submitData = {
			role_name: data.field.role_name,
			role_remarks: data.field.role_remarks,
			auth_ids: auth_ids
		};
		if($("#modifyId").val()){  // 修改角色
			submitData.role_id = $("#modifyId").val();
			url = "../role/updateRole";
		}else {                    // 新建角色
			url = "../role/addRole";
		}
		$.ajax({
			url: url,
			data: submitData,
			type: "POST",
			success:function(result){
				if(result.ret.succeed){
					layer.msg(result.ret.retMsg);
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					parent.layui.table.reload("table");
				}else{
					if(result.ret.retCode == 2003){
						window.location.href = "login.html";
					}else{
						layer.msg(result.ret.retMsg);
					}
				}
			}
		});
		return false;
	});
	
}

// 获取所有权限列表 初始化
function getAllAuthority($){
	// $.ajax({
	// 	url:"../authority/getDiffAuthority",
	// 	type:"POST",
	// 	success:function(result){
			if(result.ret.succeed){
				var plist = result.plist;
				var clist = result.clist;
				$("#select_user_info_ul").empty();
				for (var int = 0; int < plist.length; int++) {
					if(plist[int].authority_parent_id == -1){
						var p_li = '<li>\
										<input type="checkbox" value="'+plist[int].authority_id+'" title="'+plist[int].authority_name+'" lay-name="parent" lay-skin="primary">\
										<ul class="menu2" id="ul_'+plist[int].authority_id+'"></ul>\
									</li>';						
						$("#select_user_info_ul").append(p_li);
					}
				}
				for (var int2 = 0; int2 < clist.length; int2++) {
					if($("#ul_"+clist[int2].authority_parent_id).length > 0){
						var c_li = '<li><input type="checkbox" value="'+clist[int2].authority_id+'" title="'+clist[int2].authority_name+'" lay-name="child" lay-skin="primary"></li>';
						$("#ul_"+clist[int2].authority_parent_id).append(c_li);
					}
				}
			}else{
				if(result.ret.retCode == 2003){
					window.location.href = "login.html";
				}else{
					layer.msg(result.ret.retMsg);
				}
			}
	// 	}
	// });
}

// 修改角色：获取角色所有权限列表
function getRoleAuthority($,form,role_id){
	// $.ajax({
	// 	url:"../role/getRoleAuth",
	// 	data:{
	// 		role_id:role_id
	// 	},
	// 	type:"POST",
	// 	success:function(result){
			if(result.ret.succeed){
				var plist = result.plist; // 一级菜单列表
				var clist = result.clist; // 二级菜单列表
				$("#select_user_info_ul").empty();
				for (var int = 0; int < plist.length; int++) {
					if(plist[int].authority_parent_id == -1){
						var p_li = "";
						if(plist[int].role_id){
							p_li = '<li>\
										<input type="checkbox" checked value="'+plist[int].authority_id+'" title="'+plist[int].authority_name+'" lay-name="parent" lay-skin="primary">\
										<ul class="menu2" id="ul_'+plist[int].authority_id+'"></ul>\
									</li>';
						}else{
							p_li = '<li>\
										<input type="checkbox" value="'+plist[int].authority_id+'" title="'+plist[int].authority_name+'" lay-name="parent" lay-skin="primary">\
										<ul class="menu2" id="ul_'+plist[int].authority_id+'"></ul>\
									</li>';		
						}
						$("#select_user_info_ul").append(p_li);
					}
				}
				for (var int2 = 0; int2 < clist.length; int2++) {
					if($("#ul_"+clist[int2].authority_parent_id).length > 0){
						if(clist[int2].role_id){
							var c_li = '<li><input type="checkbox" value="'+clist[int2].authority_id+'" title="'+clist[int2].authority_name+'" lay-name="child" lay-skin="primary" checked></li>';
						}else{
							var c_li = '<li><input type="checkbox" value="'+clist[int2].authority_id+'" title="'+clist[int2].authority_name+'" lay-name="child" lay-skin="primary"></li>';
						}
						$("#ul_"+clist[int2].authority_parent_id).append(c_li);
					}
				}
			}else{
				if(result.ret.retCode == 2003){
					window.location.href = "login.html";
				}else{
					layer.msg(result.ret.retMsg);
				}
			}
	// 	}
	// });
}


