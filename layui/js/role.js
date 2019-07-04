layui.use(['jquery','layer','element','form','table','laydate'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		table = layui.table,
		laydate = layui.laydate,
		base = layui.base;
	base.init($,2,0,element);
	
	var ins = creatTable(table);
	pageEvent($,form,table,ins);
}); 

function creatTable(table){
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
		    {field: 'id', title: '序号', width: "8%"}
		    ,{field: 'username', title: '角色', width: "10%"}
		    ,{field: 'sex', title: '菜单', width: "30%"}
		    ,{field: 'city', title: '描述', width: "30%"} 
		    ,{field: 'score', title: '操作', 
				templet: function(d){
					var handle_html = '<button class="layui-btn layui-btn-sm" lay-event="modify">修改</button>\
									   <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="delete">删除</button>';
					return handle_html;
				}
			}
		]]
		,done: function(res,curr,count){
			console.log(res,curr,count)
		}
	});
}

//监听行工具事件
function pageEvent($,form,table,ins){	
	// 创建
	$(document).on('click','#add',function(){
		layer.open({
			type: 2,
			title: '创建',
			shadeClose: true,
			shade: 0.6,
			area: ['500px', '90%'],
			content: 'iframe_role.html',
			success:function(layero, index){
				var body = layer.getChildFrame('body', index);
				body.contents().find("#modifyId").val();
				var formH = parseInt($("iframe").height() - 15*2);
				body.contents().find("#formH").val(formH);
			}
		}); 
	});
	
	// 表格中按钮点击事件
	table.on('tool(table)', function(obj){ 
		var data = obj.data, layEvent = obj.event; 
		if(layEvent === 'modify'){
			layer.open({
				type: 2,
				title: '修改',
				shadeClose: true,
				shade: 0.6,
				area: ['500px', '90%'],
				content: 'iframe_role.html',
				success:function(layero, index){
					var body = layer.getChildFrame('body', index);
					body.contents().find("#modifyId").val(JSON.stringify(data.id));
					var formH = parseInt($("iframe").height() - 15*2);
					body.contents().find("#formH").val(formH);
				}
			}); 
		} else if(layEvent === 'delete'){
			layer.confirm('请确认是否删除此角色？', function(index){
				obj.del(); //删除对应行（tr）的DOM结构
				layer.close(index);
				table.render();
			});
		}
	});
}
