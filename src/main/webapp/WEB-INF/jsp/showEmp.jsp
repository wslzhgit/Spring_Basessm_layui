<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>显示页面</title>
    <%--在页面中引入相关的layui的css和js文件--%>
    <link rel="stylesheet" href="/lib/layui/css/layui.css" media="all"/>
    <script type="text/javascript"src="/lib/layui/layui.js"></script>
</head>
<body>
    <div align="center">
        <h1>员工数据显示页面</h1>
        <button type="button" class="layui-btn" id="addBtnUI"><i class="layui-icon">&#xe624;</i>添加</button>
        <%--数据存放的容器--%>
        <table id="demo" lay-filter="test"></table>
    </div>
    <%--将修改页面包含进来--%>
    <jsp:include page="updateEmp.jsp"/>
    <%--将添加页面包含进来--%>
    <jsp:include page="addEmp.jsp"/>
    <!--引入自定义的js文件-->
    <script type="text/javascript" src="/js/showEmp.js" ></script>
    <!--表格操作模板-->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    </script>
</body>
</html>