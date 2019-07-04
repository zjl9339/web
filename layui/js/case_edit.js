layui.define(function(exports){	
	var obj = {
		options: {},
		defaultOptions: {},
		content: function(){ 				
			// 投诉举报
			var caseReport = '<div class="tsjb">\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">受理日期</div>\
									<div class="layui-col-sm3">\
										<input type="text" class="layui-input layer-date" name="acceptDate" id="acceptDate" autocomplete="off" lay-verify="required">\
									</div>\
									<div class="layui-col-sm1">受理人</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="acceptPeople" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
									<div class="layui-col-sm1">投诉对象</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="agency" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">投诉来源</div>\
									<div class="layui-col-sm3">\
										<select name="source" lay-verify="required">'+ source_options +'</select>\
									</div>\
									<div class="layui-col-sm1">投诉等级</div>\
									<div class="layui-col-sm3">\
										<select name="level" lay-verify="required">'+ level_options +'</select>\
									</div>\
									<div class="layui-col-sm1">投诉类型</div>\
									<div class="layui-col-sm3">\
										<select name="type" lay-verify="required">'+ type_options +'</select>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">投诉人信息</div>\
									<div class="layui-col-sm11">\
										<input type="text" name="agency" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">经办人信息</div>\
									<div class="layui-col-sm11">\
										<input type="text" name="agency" lay-verify="required" autocomplete="off" class="layui-input">\ \
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">投诉事由</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" name="cause" class="layui-textarea"></textarea>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">处理结果</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" name="result" class="layui-textarea"></textarea>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">处理满意度</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" name="satisfact" class="layui-textarea"></textarea>\
									</div>\
								</div>\
							</div>';
			
			// 诉讼仲裁强制执行
			var caseArbitrate = '<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">立案日期</div>\
									<div class="layui-col-sm3">\
										<input type="text" class="layui-input layer-date" name="caseDate" lay-verify="required"  autocomplete="off">\
									</div>\
									<div class="layui-col-sm1">案件类型</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="casestyle" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
									<div class="layui-col-sm1">管辖机构</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="agency" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1 layui-col-line2">原告<i>(申请人)</i></div>\
									<div class="layui-col-sm3">\
										<input type="text" name="" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
									<div class="layui-col-sm1 layui-col-line2">被告<i>被申请人/被执行人</i></div>\
									<div class="layui-col-sm3">\
										<input type="text" name="" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
									<div class="layui-col-sm1">第三人</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">所属部门</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="" lay-verify="required" autocomplete="off" class="layui-input"> \
									</div>\
									<div class="layui-col-sm1">标的金额</div>\
									<div class="layui-col-sm3">\
										<input type="text" name="money" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
									<div class="layui-col-sm1">案件进度</div>\
									<div class="layui-col-sm3">\
										<select name="progress" lay-verify="required" lay-filter="progress" lay-update>'+ progress_options +'</select>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1 layui-col-line2">代理人员<i>(承办代理人员)</i></div>\
									<div class="layui-col-sm11">\
										<input type="text" name="" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">案由</div>\
									<div class="layui-col-sm11">\
										<input type="text" name="title" lay-verify="required" autocomplete="off" class="layui-input">\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">诉讼请求</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" class="layui-textarea" lay-update></textarea>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">案件概况</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" class="layui-textarea" lay-update></textarea>\
									</div>\
								</div>\
								<div class="layui-row layui-col-space10">\
									<div class="layui-col-sm1">备注</div>\
									<div class="layui-col-sm11">\
										<textarea placeholder="请输入内容" class="layui-textarea"></textarea>\
									</div>\
								</div>';
							
			return {
				caseReport: caseReport,
				caseArbitrate: caseArbitrate,
			}
		},
		// 生成投诉举报案例
		creatReport: function($,state){
			var content = this.content();
			var ele = document.getElementById("case_content");
			$(ele).empty().append(content.caseReport);
		},
		// 生成诉讼仲裁强制执行
		creatArbitrate: function($,state){
			var content = this.content();
			var ele = document.getElementById("case_content");
			$(ele).empty().append(content.caseArbitrate);
		},
		pageEvent: function($,index,hierarchy,element){
			
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
	exports('caseedit', obj);
});   



