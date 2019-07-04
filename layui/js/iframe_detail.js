layui.use(['jquery','layer','element','form','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		base = layui.base;
	
	init($,laydate,form,base);
}); 

function init($, laydate, form, base){
	setTimeout(function(){
		var id = $("#detailId").val();
		getCase($,id,form,base);
		getView($,id);
	},10);
}

// 获取案例
function getCase($,id,form,base){
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
					formstyle: 0,
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
					cause: "投诉事由",
					result: "投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果投诉结果",
					satisfact: "满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度满意度",
					remarks: "备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息",
				};
				data.formstyle = Math.random()<0.5 ? "0" : "1";
				// 判断表单类型 生成不同内容
				if(data.formstyle == 0){  // 投诉举报
					base.creatDetailReport($);
				}else {                      // 诉讼仲裁
					base.creatDetailArbitrate($);
				}
				var iptW = window.innerWidth - 40 - 100;
				$(".layui-div").each(function(){
					$(this).html(data[$(this).attr("name")]).css("width",(iptW-20)+"px");
				});
				$(".layui-col-sm12 input").css("width",(iptW-20)+"px");
				form.render();
				form.val("formDetail", data);
	// 		}else {
	// 			
	// 		}
	// 	},
	// });
}
// 获取流转意见
function getView($,id){
	// $.ajax({
	// 	type:"POST",
	// 	url:"../../kcb/finalSubmit", 
	// 	dataType: "json", 
	// 	data: { 
	// 		id: id
	// 	},
	// 	success:function(result){  
	// 		if(result.ret.succeed){
				
	// 		}else {
	// 			
	// 		}
	// 	},
	// });
}

