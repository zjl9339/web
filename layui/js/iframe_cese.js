var form, caseedit = null;
layui.use(['jquery','layer','element','form','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		laydate = layui.laydate;
	form = layui.form;
	caseedit = layui.caseedit;
	
	init($,laydate,form,caseedit);
	pageEvent($,form,layer);

}); 

function init($, laydate, form){
	var data = {
		enterDate: moment().format("YYYY-MM-DD"),
		username: "录入人"
	};
	form.val("formCase", data);
	caseedit.creatReport($);
	$(".layer-date").each(function(index, el) {
		$(this).attr("lay-key", String(Math.random()).substring(2));
		layui.laydate.render({
			elem: this,
			format: 'yyyy-MM-dd',
			trigger: 'click'
		});
	});
	layui.form.render();
}

function pageEvent($,form,layer){
	// 表单类型 切换
	form.on('select(formstyle)', function(data){
		data.value == '0' ? caseedit.creatReport($) : caseedit.creatArbitrate($);
		$(".layer-date").each(function(index, el) {
			$(this).removeAttr("lay-key");
			layui.laydate.render({
				elem: this,
				format: 'yyyy-MM-dd',
				trigger: 'click'
			});
		});
		layui.form.render();
	});
	// 案件状态 
	form.on('select(caseState)', function(data){
		if(data.value == '0'){
			$(".case_intro").hide();
			$('[name="intro"]').removeAttr("lay-verify");
		}else {
			$(".case_intro").show();
			$('[name="intro"]').attr("lay-verify","required");
		}
	});
	// 案件表单提价
	form.on('submit(submit)', function(data){
		var ele = parent.window.document.getElementById("iframeBox");
		if(ele) {  // admin 管理人员提交案例表单
			ele.style.display = "none";
			console.log(data.field);
			parent.layer.msg("admin案例更新成功");
		}else{    // 录入人员 提交表单
			console.log(data.field);
			parent.layer.msg("录入人员案例更新成功");
		}
		return false;
	});
}

// 案件录入tab、更新按钮 弹出案例 反填数据方法
function loadData($,laydate,id){
	// 创建新的案例
	if(!id) {
		caseedit.creatReport($);
		var data = {
			enterDate: moment().format("YYYY-MM-DD"),
			username: "案例创建",
			caseState: "",
			title: ""
		};
		form.val("formCase", data);
		layui.jquery('.layui-form-iframe-case input').prop("disabled",false);
		layui.jquery('.layui-form-iframe-case .layui-disabled').prop("disabled",true);
		layui.jquery('.layui-form-iframe-case select').prop("disabled",false);
		layui.jquery('.case_intro').hide();
		layui.laydate.render({ 
			elem: '#acceptDate',
			trigger: 'click'
		});
	}else { // 案例更新
		update($,laydate,id)
	}
}

// 案例更新
function update($,laydate,id){
	// $.ajax({
	// 	type:"POST",
	// 	url:"../../kcb/finalSubmit", 
	// 	dataType: "json", 
	// 	data: { 
	// 		id: id
	// 	},
	// 	success:function(result){  
	// 		if(result.ret.succeed){
				var data = {
					enterDate: "2019-07-02",
					title: "标题标题标题标题标题标题",
					agency: "管辖机构",
					id: 10001,
					acceptPeople: "受理人",
					acceptDate: "2019-08-02",
					caseDate: "2019-08-02",
					casestyle: "1",
					username: "user-1",
					caseState: "1",
					result: "投诉结果投诉结果投诉结果投诉结果投诉结果"
				};
				data.formstyle = Math.random()<0.5 ? "0" : "1";
				// 根据表单类型生成不同表单内容
				if(data.formstyle == '0'){
					caseedit.creatReport($);
				}else {
					caseedit.creatArbitrate($);
				}
				layui.jquery('.layui-form-iframe-case input:not([lay-update])').prop("disabled",true);
				layui.jquery('.layui-form-iframe-case select:not([lay-update])').prop("disabled",true);
				layui.jquery('.layui-form-iframe-case textarea:not([lay-update])').prop("disabled",true);
				form.val("formCase", data);
				data.caseState == "1" ? layui.jquery('.case_intro').show() : layui.jquery('.case_intro').hide();
				layui.form.render(null, "formCase");
	// 		}else {
	// 			layer.msg(data.ret.retMsg)
	// 		}
	// 	}
	// });
}