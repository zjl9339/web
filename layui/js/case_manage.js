var winH = window.innerHeight;
var table_h = winH - 60 - 15*2  - 51;
var pageSize = parseInt((table_h - 10 - 37 - 41 )/37);

layui.use(['jquery','layer','element','form','table','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		table = layui.table,
		laydate = layui.laydate,
		base = layui.base;
	base.init($,0,0,element);
	
	init($, form);
	var insUnfish = creatUnfinshTable(table);
	var insFish = creatFinshTable(table);
	pageEvent($,layer,element,form,table,laydate);
}); 

function init($, form){
	setTimeout(function(){
		var data = $("#data").val();
		data = data ? JSON.parse($("#data").val()) : data; 
		form.val("formRole", data);
	},500)
	$("iframe").css("height",table_h+"px"); 
}

function creatUnfinshTable(table){
	return table.render({
		id: 'tableUnfinsh',
		title:'案例表',
		elem: '#tableUnfinsh'
		,height: table_h
		,url: '../js/data.1.json' //数据接口
		,page: true //开启分页
		,even: true //开启隔行背景
		,limit: pageSize
		,cols: [[ //表头
		    {field: 'id', title: '标题', width: 150}
		    ,{field: 'username', title: '表单类型', width: 130}
		    ,{field: 'sex', title: '受理人', width: 130}
		    ,{field: 'city', title: '经办人', width: 130 } 
		    ,{field: 'sign', title: '录入时间', width: 130, sort: true}
		    ,{field: 'experience', title: '受理日期', width: 130, sort: true}
		    ,{field: 'score', title: '操作',
				templet: function(d){
					var handle_html = '<button class="layui-btn layui-btn-sm" lay-event="detail">详情</button>\
									  <button class="layui-btn layui-btn-sm layui-btn layui-btn-warm" lay-event="update">更新</button>';
					return handle_html;
				}
			}
		]]
	});
}

function creatFinshTable(table){
	return table.render({
		id: 'tableFinsh',
		title:'案例表',
		elem: '#tableFinsh'
		,height: table_h
		,url: '../js/data.1.json' //数据接口
		,page: true //开启分页
		,even: true //开启隔行背景
		,limit: pageSize
		,cols: [[ //表头
		    {field: 'id', title: '标题', width: 150}
		    ,{field: 'username', title: '表单类型', width: 130}
		    ,{field: 'sex', title: '受理人', width: 130}
		    ,{field: 'city', title: '经办人', width: 130 } 
		    ,{field: 'sign', title: '录入时间', width: 130, sort: true}
		    ,{field: 'experience', title: '受理日期', width: 130, sort: true}
		    ,{field: 'score', title: '操作',
				templet: function(d){
					return '<button class="layui-btn layui-btn-sm" lay-event="detail">详情</button>';
				}
			}
		]]
	});
}

//监听行工具事件
function pageEvent($,layer,element,form,table,laydate){	
	// 表格中按钮点击事件
	table.on('tool(table)', function(obj){
		var data = obj.data, layEvent = obj.event; 
		if(layEvent === 'detail'){
layer.open({
	type: 2,
	title: '详情',
	shadeClose: true,
	shade: 0.6,
	area: ['900px', '90%'],
	content: 'iframe_detail.html',
	success:function(layero, index){
		var body = layer.getChildFrame('body', index);
		body.contents().find("#detailId").val(data.id);
	}
}); 
		} else if(layEvent === 'update'){
			$(".layui-tab-title li").eq(0).click();
			document.getElementById("iframe").contentWindow.loadData($,laydate,data.id);
		}
	});
	
	// tab 切换事件
	element.on('tab(tab)', function(data){
		if(data.index == 0){
			document.getElementById("iframe").contentWindow.loadData($,laydate);
		}
	});
}
