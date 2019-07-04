var winW = window.innerWidth;
var winH = window.innerHeight;
var table_h = winH - 60 - 15*2  - 48;
var pageSize = parseInt((table_h - 10 - 37 - 41 )/37);

layui.define(function(exports){
	var obj = {
		options: {},
		defaultOptions: {},
		content: function(){
			var headerDiv = '<div class="layui-header">\
								<ul class="layui-layout-right">\
									<li>\
										<img src="http://t.cn/RCzsdCq" class="layui-nav-img">\
										<span id="user_name">贤心</span>\
									</li>\
									<li class="line"></li>\
									<li onclick="showPsd(\'密码修改\')">\
										<image src="http://t.cn/RCzsdCq" class="layui-nav-img"/>\
										<span>修改密码</span>\
									</li>\
									<li class="line"></li>\
									<li onclick="location.href=\'help.html\'">\
										<image src="http://t.cn/RCzsdCq" class="layui-nav-img"/>\
										<span>使用帮助</span>\
									</li>\
									<li class="line"></li>\
									<li onclick="logout()">\
										<img src="http://t.cn/RCzsdCq" class="layui-nav-img"/>\
									</li>\
								</ul>\
							</div>';
			
			var leftMenu = '';
			if(true){
				leftMenu = '<li class="layui-nav-item nav_case"><a href="index.html"><i></i><p>案件监控</p></a></li>\
							<li class="layui-nav-item nav_account"><a href="account.html"><i></i><p>账号管理</p></a></li>\
							<li class="layui-nav-item nav_role"><a href="role.html"><i></i><p>角色管理</p></a></li>';
			}else {
				leftMenu = '<li class="layui-nav-item nav_manage"><a href="case_manage.html"><i></i><p>案件管理</p></a></li>';
			}
			var leftDiv = '<div class="layui-side layui-bg-black">\
								<div class="layui-side-scroll">\
									<img class="logo" src="http://t.cn/RCzsdCq"/>\
									<ul class="layui-nav layui-nav-tree" lay-filter="menu" id="menu"></ul>\
								</div>\
							</div>';
			
			// 投诉举报 详情
			var detailReport = '<div class="layui-col-sm4">\
									<span>受理日期：</span>\
									<input type="text" class="layui-input" id="caseDate" readonly>\
								</div>\
								<div class="layui-col-sm4">\
									<span>受理人：</span>\
									<input type="text" name="casestyle" readonly class="layui-input">\
								</div>\
								<div class="layui-col-sm4">\
									<span>投诉对象：</span>\
									<input type="text" name="agency" readonly class="layui-input">\
								</div>\
								<div class="layui-col-sm4">\
									<span class="two">投诉来源：</span>\
									<input type="text" name="" readonly class="layui-input">\
								</div>\
								<div class="layui-col-sm4">\
									<span class="two">投诉等级：</span>\
									<input type="text" name="" readonly class="layui-input">\
								</div>\
								<div class="layui-col-sm4">\
									<span class="two">投诉类型：</span>\
									<input type="text" name="" readonly class="layui-input"> \
								</div>\
								<div class="layui-col-sm12">\
									<span>投诉人信息：</span>\
									<input type="text" name="" readonly class="layui-input"> \
								</div>\
								<div class="layui-col-sm12">\
									<span>经办人信息：</span>\
									<input type="text" name="" readonly class="layui-input"> \
								</div>\
								<div class="layui-col-sm12">\
									<span>投诉事由：</span>\
									<div readonly name="cause" class="layui-div"></div>\
								</div>\
								<div class="layui-col-sm12">\
									<span>处理结果：</span>\
									<div readonly name="result" class="layui-div"></div>\
								</div>\
								<div class="layui-col-sm12">\
									<span>处理满意度：</span>\
									<div readonly name="satisfact" class="layui-div"></div>\
								</div>';
			
			// 诉讼仲裁强制执行 详情		
			var detailArbitrate = ' <div class="layui-col-sm4">\
										<span>立案日期：</span>\
										<input type="text" class="layui-input" id="caseDate" readonly>\
									</div>\
									<div class="layui-col-sm4">\
										<span>案件类型：</span>\
										<input type="text" name="casestyle" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span>管辖机构：</span>\
										<input type="text" name="agency" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span class="two">原告：<i>(原告人)</i></span>\
										<input type="text" name="" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span class="two">被告：<i>(被申请人/被执行人)</i></span>\
										<input type="text" name="" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span class="two">代理人员：<i>(承办代理人员)</i></span>\
										<input type="text" name="" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span>第三人：</span>\
										<input type="text" name="third" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span>所属部门：</span>\
										<input type="text" name="depart" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm4">\
										<span>标的金额：</span>\
										<input type="text" name="money" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm12">\
										<span>案件进度：</span>\
										<input type="text" name="progress" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm12">\
										<span>案由：</span>\
										<input type="text" name="cause" readonly class="layui-input">\
									</div>\
									<div class="layui-col-sm12">\
										<span>诉讼请求：</span>\
										<div readonly name="ask" class="layui-div"></div>\
									</div>\
									<div class="layui-col-sm12">\
										<span>案件概况：</span>\
										<div readonly name="survey" class="layui-div"></div>\
									</div>\
									<div class="layui-col-sm12">\
										<span>备注：</span>\
										<div readonly name="remarks" class="layui-div"></div>\
									</div>';
							
			return {
				headerDiv: headerDiv,
				leftDiv: leftDiv,
				detailReport: detailReport,
				detailArbitrate: detailArbitrate
			}
		},
		// 生成投诉举报案例 详情 
		creatDetailReport: function($){
			var content = this.content();
			$("#detail_content").empty().append(content.detailReport);
		},
		// 生成诉讼仲裁强制执行 详情 
		creatDetailArbitrate: function($){
			var content = this.content();
			$("#detail_content").empty().append(content.detailArbitrate);
		},
		// 获取用户信息
		getUser: function($){
			// $.ajax({
			// 	url : "../user/getUser",
			// 	type: 'GET',
			// 	async: false,
			// 	success: function(data){
					var data = {"ret":{"succeed":true,"retCode":1,"retMsg":""},"user":{"user_recent_login_date":"2017-08-03 13:30:56","user_status":0,"syc_times":0,"user_password":"1140f0c5f8d9d6a756aad4cdce8d79820b6797ce6a59676e072a035b5373affd","user_email":"admin@grzq.com","user_remarks":"仍是少年","create_time":"2018-05-14 14:34:22","user_login_account":"admin","user_oa_id":null,"user_username":"管理员","user_position":null,"user_department_id":1,"user_number":"2104","user_pic_url":null,"user_id":3,"user_mobile":"18511849508","user_phone":"83991473","user_register_date":"2017-08-03 13:30:51"}}
					if(data.ret.succeed){
						user = data.user;
						login_username = data.user.user_username;
						$("#user_name").text(data.user.user_username);
						this.getAuthList($, $("#menu"), user.user_id); 
						// $.ajaxSetup({      
						// 	data : {'username': data.user.user_username}
						// });
					} else if(data.ret.retCode == 2003){
						window.location.href = "login.html";
					}
			// 	}
			// });
		},
		// 获取用户权限菜单列表  
		getAuthList: function($, obj, user_id) {
			// $.ajax({
			// 	url : "../user/getAuthListByUserId",
			// 	data:{
			// 		user_id : user_id
			// 	},
			// 	type: 'POST',
			// 	async: false,
			// 	success: function(data){
					var data = {"ret":{"succeed":true,"retCode":1,"retMsg":"获取用户权限列表成功!"},
								"list":[
										{"authority_order":400,"authority_remarks":"案件监控","authority_url":"index.html","authority_short_name":"nav_case","authority_name":"案件监控","authority_status":1,"authority_id":16,"authority_parent_id":-1},
										{"authority_order":410,"authority_remarks":"账号管理","authority_url":"account.html","authority_short_name":"nav_account","authority_name":"账号管理","authority_status":1,"authority_id":17,"authority_parent_id":-1},
										{"authority_order":430,"authority_remarks":"角色管理","authority_url":"role.html","authority_short_name":"nav_role","authority_name":"角色管理","authority_status":1,"authority_id":19,"authority_parent_id":-1},
										{"authority_order":430,"authority_remarks":"案件管理","authority_url":"case_manage.html","authority_short_name":"nav_manage","authority_name":"案件管理","authority_status":1,"authority_id":19,"authority_parent_id":1},
									],
								}
					if(data.ret.succeed){
						var list = data.list;
						var p_id = 0;
						var child_li = 0;  // 二级节点简称
						var p_short = "";  // 一级节点简称
						for(var index = 0; index < list.length ;index++){
							if(list[index].authority_parent_id == -1){
								p_id = list[index].authority_id
								p_short = list[index].authority_short_name;
								var p1 = '<li class="layui-nav-item '+ p_short +'">\
											<a href="'+ list[index].authority_url +'">\
												<i class="icon"></i>\
												<p>'+ list[index].authority_name +'</p>\
											</a>\
										</li>';
								obj.append(p1);
							}
						}
					} else {
						if(data.ret.retCode == 2003){
							window.location.href = "login.html";
					    }else{
					    	layer.msg(data.ret.retMsg);
					    }
					}
			// 	}
			// });
		}, 
		pageEvent: function($,index,hierarchy,element){
			var content = this.content();
			$(".header").append(content.headerDiv);
			$(".left").append(content.leftDiv);
			this.getUser($);
			element.render('nav');                                      // 重新渲染 nav，加载element相关事件
			$(".left .layui-nav li").eq(index).addClass("layui-this");  // 点亮当前导航	
		},
		init: function($,index,hierarchy,element){
			this.options = $.extend({}, this.defaultOptions, this.options);
			this.pageEvent($,index,hierarchy,element);
		},
		// 表单一键提取数据 对象格式
		formDeal: function($, obj){
			var data = {};
			var arr = $(obj).serializeArray();
			$.each(arr, function() {
				data[this.name] = this.value;
			});
			return data;
		},
	};
  
	//输出接口
	exports('base', obj);
});   

// 打开密码修改弹框
function showPsd(title){ 
	layer.open({
		type: 2,
		title: title,
		shadeClose: true,
		shade: 0.6,
		area: ['500px', '275px'],
		content: "iframe_psd.html"
	});
}

// 退出操作
function logout() {
	layer.confirm('退出登录', {
		btn: ['取消', '确定']
		}, function(index, layero){
			layer.close(index);
		}, function(index){
			$.cookie("username", '', {
				expires : -1
			});
			$.ajax({
				url : "../user/logOut",
				success : function(data) {
					$.cookie("username", null, {
						path : '/'
					});
					window.location.href = "login.html";
				}
			})
	});
}

