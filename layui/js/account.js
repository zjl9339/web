layui.use(['jquery','layer','element','form','table'], function(exports){
	var $ = layui.jquery,
		layer = layui.layer,
		element = layui.element,
		form = layui.form,
		table = layui.table,
		base = layui.base;
	base.init($,1,0,element);

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
		    {field: 'id', title: '编号', width: 100}
		    ,{field: 'username', title: '姓名', width: 100}
		    ,{field: 'sex', title: '工号', width: 100}
		    ,{field: 'city', title: '部门', width: 100 } 
		    ,{field: 'sign', title: '手机号', width: 100}
		    ,{field: 'experience', title: '办公电话', width: 100}
			,{field: 'sign', title: '邮箱', width: 100}
			,{field: 'experience', title: '角色', width: 100}
		    ,{field: 'score', title: '操作',
				templet: function(d){
					var handle_html = '<button class="layui-btn layui-btn-sm" lay-event="modify">修改</button>\
									   <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="delete">删除</button>\
									   <button class="layui-btn layui-btn-sm layui-btn layui-btn-warm" lay-event="reset">重置密码</button>';
					return handle_html;
				}
			}
		]]
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
			area: ['510px', '90%'],
			content: 'iframe_account.html',
			success:function(layero, index){
				var body = layer.getChildFrame('body', index);
				body.contents().find("#data").val();
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
				area: ['510px', '90%'],
				content: 'iframe_account.html',
				success:function(layero, index){
					var body = layer.getChildFrame('body', index);
					data.type = 0;
					body.contents().find("#data").val(JSON.stringify(data));
				}
			}); 
		} else if(layEvent === 'delete'){
			layer.confirm('确定要重置此账号吗', function(index){
				obj.del(); //删除对应行（tr）的DOM结构
				layer.close(index);
				table.render();
			});
		} else if(layEvent === 'reset'){
			layer.confirm('确定要重置此账号密码吗？', function(index){
				layer.close(index);
				table.render();
			});
		}
	});
}
