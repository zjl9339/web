layui.use(['jquery','layer','element','form','table','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		table = layui.table,
		laydate = layui.laydate,
		base = layui.base;
	base.init($,0,"icon_case",element);
	init($,form,laydate);
	var ins = creatTable($,table);
	pageEvent($,form,table,laydate,ins);
	
}); 

function init($,form,laydate){
	laydate.render({ 
		elem: '#startDate'
	});
	laydate.render({ 
		elem: '#endDate'
	});
	
	var winH = window.innerHeight;
	$(".iframe_case_update").css({
		"height": (winH - 60 - 30 - 40) + "px",
	});
	
	var formStyle = [
		{name: "投诉举报",value:1},
		{name: "诉讼仲裁强制执行",value:2}
	]
	$('[name="formStyle"]').empty().append('<option value="0">全部</option>');
	formStyle.forEach(function(item){
		$('[name="formStyle"]').append('<option value="'+item.value+'">'+item.name+'</option>');
	});
	form.render("select");
}

function creatTable($,table){
	return table.render({
		id: 'table',
		title:'案例表',
		elem: '#table'
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
				templet: function(data){ 
					var handle_html = '<button class="layui-btn layui-btn-sm" lay-event="detail">详情</button>\
									   <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="delete">删除</button>';
					if(data.sex == "女") handle_html += '<button class="layui-btn layui-btn-sm layui-btn layui-btn-warm" lay-event="update">更新</button>';
					return handle_html;
				}
			}
		]]
	});
}

//监听行工具事件
function pageEvent($,form,table,laydate,ins){
	// 表单类型change
	form.on('select(formStyle)', function(data){
		var data = caseedit.formDeal($, '[lay-filter="formSearch"]');
		table.reload('table', {
			method: "post",
			page: {
				curr: 1
			},
			where: data
		});
	}); 
	
	// 查询事件
	form.on('submit(search)', function(data){
		console.log(data.field);
		table.reload('table', {
			method: "post",
			page: {
				curr: 1
			},
			where: data.field
		});
		return false;
	});
	
	// excel导出事件
	$(document).on('click','#export',function(){
		table.exportFile(ins.config.id, ins.config.data, "xls");
	});
	
	// 案例更新 返回事件
	$(document).on('click','#back',function(){
		$(".case_modify").hide();
	});
	
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
					body.contents().find("#data").val(JSON.stringify(data));
				}
			}); 
		} else if(layEvent === 'delete'){
			layer.confirm('请确定是否删除该表单', function(index){
				obj.del(); //删除对应行（tr）的DOM结构
				layer.close(index);
				table.render();
			});
		} else if(layEvent === 'update'){
			$(".case_modify").show();
			document.getElementById("iframe").contentWindow.loadData($,laydate,data);
		}
	});
}



