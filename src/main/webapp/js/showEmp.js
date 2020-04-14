layui.use(['jquery','layer','table','form','laydate'], function(){
    var $  = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        laydate=layui.laydate, //日期
        table = layui.table;
    //初始化部门数据
    getDeptAll();
    //日期时间选择器
    laydate.render({
        elem: '#hiredate'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
    });
    //日期时间选择器
    laydate.render({
        elem: '#hiredate2'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,value:new Date()
    });

    //采用数据表格的方法集渲染，将数据渲染到容器中
    //第一个实例
    //默认情况下此函数会向服务端自动传参数：page当前页；limit每一页查询的数据条数（必传）
    //当首次进到此表格中时：page=1;默认情况下limit=10
    table.render({
        elem: '#demo' //数据存放的容器，为table标签，其id="demo"
        ,height: 320  //容器高度
        ,width: 1500
        ,url: '/emp/loadPageT' //数据接口或者访问服务器端的数据路径
        ,limit:5   //自定义每一页的数据条数
        ,limits:[2,3,5,8,10]
        ,even:true  //逐行背景色深浅不一
        ,page: true //开启分页
        ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
            //title: 'ID'表示为表格的每一列标题
            //单元格的宽度
            // fixed: 'left'  将此列居左
            //field: 'empno'可以取到对象JSON数据中的普通数据
            {field: 'empno', title: '员工编号', align:'center', width:120, sort: true}
            ,{field: 'ename', title: '姓名', align:'center',width:150}
            ,{field: 'job', title: '工作', width:150, align:'center',sort: true}
            ,{field: 'sal', title: '工资', width:120,align:'center'}
            ,{field: 'mgr', title: '上司编号', width: 120,align:'center', sort: true}
            ,{field: 'hiredate', title: '入职时间', width: 200,align:'center'}
            ,{field: 'comm', title: '奖金', width: 120, align:'center',sort: true}
            //templet:'<div>{{d.dept.dname}}</div>' 模板：取到对象中对象属性的属性值（员工对象中的部门对象属性的部门名称属性值）
            //d为员工对象,dept为员工对象中部门对象的属性名,dname为部门对象的属性名
            ,{field: 'dname', title: '部门名称', width: 120, align:'center',sort: true,templet:'<div>{{d.dept.dname}}</div>'}
            ,{field: 'loc', title: '地址', width: 120, align:'center',sort: true,templet:'<div>{{d.dept.loc}}</div>'}
            //操作列toolbar: '#barDemo'为操作模板
            ,{fixed: 'right',title: '操作', width:260, align:'center', toolbar: '#barDemo'}
        ]]
    });
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'detail'){ //查看
            //do somehing
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                //向服务端发送删除指令
                delEmpByEmpno(obj);
                layer.close(index);

            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
          //1.弹出修改界面
            layer.open({
                type:1,
                title:"员工修改页面",
                area:['400px','500px'],
                anim:3,
                shade:0.5,
                content:$("#updDiv")
            });
            //将选中的员工数据回显到修改界面
            //给表单赋值
            form.val("form-upd", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "empno": data.empno // "name": "value"
                ,"ename": data.ename
                ,"job": data.job
                ,"mgr": data.mgr
                ,"sal": data.sal
                ,"hiredate": data.hiredate
                ,"comm": data.comm
            });
            //回显部门下拉框
            $("#selectedUpdDpt").replaceWith('<option value="'+data.dept.deptno+','+data.dept.dname+','+data.dept.loc+'"selected id="selectedUpdDpt">'+data.dept.dname+'</option>');
            //替换之后进行更新页面，通过渲染下拉框
            form.render('select');
            //执行修改
            //监听form表单中的submit提交
            form.on('submit(demo1)', function(data){//submit(demo1)与按钮中的lay-filter="demol"保持一致
               /* console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                console.log(data.field) *///当前容器的全部表单字段，名值对形式：{name: value}

                //修改函数
                updEmp(data.field,obj);
               layer.closeAll();//关闭所有弹框
                return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });
    //弹出添加页面
    $("#addBtnUI").click(function () {
        //将原有的添加表单数据手动清空掉
        $("form").eq(1).find("input").val("");
        //1.弹出添加界面
        layer.open({
            type:1,
            title:"员工添加页面",
            area:['400px','500px'],
            anim: 4,
            shade:0.5,
            content:$("#addDiv")
        });
        //2.执行添加监听操作
        form.on('submit(demo2)', function(data){//submit(demo1)与按钮中的lay-filter="demo1"值保持一致
            //添加函数
            addEmp(data.field);
            layer.closeAll();  //关闭所有弹框
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });
    //删除
    function delEmpByEmpno(obj) {
        $.ajax({
            type:"POST",
            url:"/emp/delTById",
            data:{"id":obj.data.empno},
            success:function (data) {
               if(data==='success'){
                   layer.msg('数据删除成功！！',{icon:1,time:2000,anim:4,shade:0.5});
                   obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
               }else{
                   layer.msg('数据删除失败！！',{icon:2,time:2000,anim:4,shade:0.5});
               }
            },
            error:function (data) {
                //icon:3 弹框图标  anim:6 弹框动画 抖动  shade:0.5 背景遮罩（透明度）
                layer.msg('服务器异常！！',{icon:3,time:2000,anim:6,shade:0.5});
            }
        });
    }
    //查询所有部门信息
    function getDeptAll() {
        $.ajax({
            type:"POST",
            url:"/dept/getAllT",
            data:{},
            success:function (data) {
               var deptStr = '<option value="" selected id="selectedUpdDpt">--请选部门--</option>';
               $.each(data,function(i,dept){
                deptStr+='<option value="'+dept.deptno+','+dept.dname+','+dept.loc+'">'+dept.dname+'</option>'
                });
               $("#deptUpdSel").html(deptStr);//将数据标签填充到select
                $("#deptAddSel").html(deptStr);  //将数据标签填充到select
                form.render('select');
            },
            error:function (data) {
                //icon:3 弹框图标  anim:6 弹框动画 抖动  shade:0.5 背景遮罩（透明度）
                layer.msg('服务器异常！！',{icon:3,time:2000,anim:6,shade:0.5});
            }
        });
    }
    //修改
    function updEmp(jsonEmp,obj) {
        //处理一下jsonEmp数据中的dept
        var arrDept = jsonEmp.dept.split(",");
        //删除jsonEmp中的dept属性值
        delete jsonEmp["dept"];
        //新增属性dept.deptno值为arrDept[0]
        jsonEmp['dept.deptno'] = arrDept[0];
        $.ajax({
            type:"POST",
            url:"/emp/xgT",
            data:jsonEmp,
            success:function (data) {
                if(data==='success'){
                    layer.msg('数据修改成功！！',{icon:1,time:1000,anim:4,shade:0.5});
                   ///同步更新缓存对应的值
                    obj.update({  //  field: 'ename':修改后的数据
                        ename: jsonEmp.ename
                        ,job: jsonEmp.job
                        ,mgr: jsonEmp.mgr
                        ,sal: jsonEmp.sal
                        ,hiredate: jsonEmp.hiredate
                        ,comm: jsonEmp.comm

                    });
                    obj.tr.children().eq(7).find("div").text(arrDept[1]);
                    obj.tr.children().eq(8).find("div").text(arrDept[2]);
                }else{
                    layer.msg('数据修改失败！！',{icon:2,time:5000,anim:4,shade:0.5});
                }
            },
            error:function (data) {
                //icon:3 弹框图标  anim:6 弹框动画 抖动  shade:0.5 背景遮罩（透明度）
                layer.msg('服务器异常！！',{icon:3,time:2000,anim:6,shade:0.5});
            }
        });
    }
    //添加
    function addEmp(jsonEmp) {
        //处理一下jsonEmp数据中的dept:10,教研部，北京；将其转为部门数据数组['10','教研部','北京']
        var arrDept = jsonEmp.dept.split(",");
        //删除jsonEmp中的dept属性值
        delete jsonEmp["dept"];
        //新增属性dept.deptno值为arrDept[0]
        jsonEmp['dept.deptno'] = arrDept[0];
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"/emp/addT",   //访问服务器端的路径
            data:jsonEmp,  //传到服务器端参数
            success:function (data) {  //请求执行正常函数回调
                if(data==='success'){  //模拟数据库删除操作成功
                    layer.msg('数据添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //刷新表格,重新发送异步请求访问服务器端获取查询数据
                    table.reload('demo', {  //指明具体要重新加载的table容器，容器id
                        page: {
                            curr: 1 //重新从第 1 页开始
                        }
                    });
                }else {
                    layer.msg('数据添加失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

});