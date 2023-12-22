<%--
  Created by IntelliJ IDEA.
  User: stare
  Date: 2023/12/21
  Time: 16:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/FormValidate.js"></script>
    <link rel="stylesheet" href="/css/FormValidate.css">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/navbar.css">
    <style>
        #table1{
            padding: 0px;
        }
        .container-fluid{
            padding-top: 10% !important;
            padding: 0px;
        }
    </style>
</head>
<body>
    <div class="container-fluid text-center">
        <div class="search text-center"><!-- Center the content -->
            <form id="searchForm" class="form-inline">
                <label class="form-label">任务名称：</label>
                <input name="taskName" id="taskName" type="text" class="form-control" value="">
                <button type="button" id="toggleButton" class="btn btn-success form-control">类型：接受</button>
                <input value="搜 索" type="button" id="searchbutton" class="btn btn-primary form-control" onclick="LoadPage();">
                <button type="button" class="btn btn-primary form-control adminButton" data-toggle="modal" data-target="#addFromModal" data-backdrop="static">
                    添加任务
                </button>
            </form>
        </div>
        <table id="table1" class="table table-bordered">
            <thead>
                <tr>
                    <th class="text-center">任务编号</th>
                    <th class="text-center">任务名称</th>
                    <th class="text-center">开始时间</th>
                    <th class="text-center">结束时间</th>
                    <th class="text-center">实际开始时间</th>
                    <th class="text-center">实际结束时间</th>
                    <th class="text-center">任务状态</th>
                    <th class="text-center">实施人编号</th>
                    <th class="text-center">分配人编号</th>
                    <th class="text-center">任务描述</th>
                    <th class="text-center">操作</th>
                </tr>
            </thead>
            <tbody id="TaskTbody">

            </tbody>
        </table>
        <div class="navbar">
        </div>
        <div class="modal fade" id="addFromModal" tabindex="-1" role="dialog" aria-labelledby="addFromModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="addFromModalLabel">添加任务</h4>
                    </div>

                    <div class="modal-body">
                        <form id="addFrom">
                            <div class="form-group">
                                <input type="text" name="taskName" class="form-control" placeholder="任务名称">
                            </div>
                            <div class="form-group">
                                <input type="date" name="beginDate" class="form-control" placeholder="开始时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="endDate" class="form-control" placeholder="结束时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="realBeginDate" class="form-control" placeholder="实际开始时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="realEndDate" class="form-control" placeholder="实际结束时间">
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="status" placeholder="任务状态">
                                    <option value="未开始">未开始</option>
                                    <option value="进行中">进行中</option>
                                    <option value="已完成">已完成</option>
                                    <option value="异常">异常</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>实施人:</label>
                                <select class="employeeList form-control" name="implementorId" placeholder="实施人"></select>
                            </div>
                            <input type="hidden" placeholder="" name="assignerId" class="nowId">
                            <div class="form-group">
                                <input type="text" name="taskDesc" class="form-control" placeholder="任务描述">
                            </div>
                            <input type="submit" class="btn btn-primary" value="保存">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="updateFromModal" tabindex="-1" role="dialog" aria-labelledby="updateFromModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="updateFromModalLabel">修改任务</h4>
                    </div>
                    <div class="modal-body">
                        <form id="updateFrom">
                            <div class="form-group">
                                <input type="text" disabled name="taskId" class="form-control" placeholder="任务编号" disabled>
                            </div>
                            <div class="form-group">
                                <input type="text" name="taskName" class="form-control" placeholder="任务名称">
                            </div>
                            <div class="form-group">
                                <input type="date" name="beginDate" class="form-control" placeholder="开始时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="endDate" class="form-control" placeholder="结束时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="realBeginDate" class="form-control" placeholder="实际开始时间">
                            </div>
                            <div class="form-group">
                                <input type="date" name="realEndDate" class="form-control" placeholder="实际结束时间">
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="status" placeholder="任务状态">
                                    <option value="未开始">未开始</option>
                                    <option value="进行中">进行中</option>
                                    <option value="已完成">已完成</option>
                                    <option value="异常">异常</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <select class="employeeList form-control" name="implementorId" placeholder="实施人"></select>
                            </div>
                            <input type="hidden" placeholder="" name="assignerId" class="nowId">
                            <div class="form-group">
                                <input type="text" name="taskDesc" class="form-control" placeholder="任务描述">
                            </div>
                            <input type="submit" class="btn btn-primary" value="保存">

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</body>
<!-- ... 其他代码 ... -->
<script>
    var PageIndex = 1;
    var PageSize = 5;
    var employees ;
    var NowEmployeeInfo;
    var EmployeePower=false;
    let validator = new Validator();
    validator.initForm($("#addFrom"))
    validator.afterSubmit=add;
    let validator2 = new Validator();
    validator2.initForm($("#updateFrom"))
    validator2.afterSubmit=update;
    var isAccepted = true;
    $(function () {
        var toggleButton = $('#toggleButton');



        toggleButton.click(function () {
            if (EmployeePower){
                return;
            }
            isAccepted = !isAccepted; // 切换状态
            toggleButton.text(isAccepted ? '类型：接受':'类型：发布'); // 切换文本
            toggleButton.toggleClass('btn-success', isAccepted); // 切换样式类
            toggleButton.toggleClass('btn-primary', !isAccepted); // 切换样式类
            LoadPage();
        });

        $(".navbar").on("click", ".number", function () {
            if ($(this).hasClass("selected")) {
                return; // 如果已经有 selected 类，则不执行任何操作
            }
            PageIndex = parseInt($(this).text()); // 将 pageNumber 设置为当前元素的文本内容（转换为整数）
            LoadPage(); // 调用 loadPage 函数
        });
        GetNowEmployeeInfo();
        getEmployeeInfo();
        LoadEmployeeSelect();
        LoadPage();

    });
    function getEmployeeInfo() {
        $.ajax({
            type: "get",
            url: "/Employee/EmployeeByParentId",
            contentType: "application/json",
            async:false,
            dataType: "json",
            success: function (data) {
                employees2=data;
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
        $.ajax({
            type: "get",
            url: "/Employee/Employee",
            contentType: "application/json",
            async:false,
            dataType: "json",
            success: function (data) {
                employees=data;
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function LoadPage() {
        // 获取搜索条件
        var taskName = $("#taskName").val();

        // 发起Ajax请求
        $.ajax({
            type: "POST",
            url: "GetTask",
            data: JSON.stringify({ isAccepted:isAccepted,taskName: taskName, PageNumber: PageIndex, pageSize: PageSize }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                LoadTbody(data.list)
                loadNavPage(data.navigatepageNums)
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function loadNavPage(navigatepageNums){
        $(".navbar").empty();
        for (let i = 0; i < navigatepageNums.length; i++) {
            if (PageIndex == navigatepageNums[i]){
                $(".navbar").append("<div class=\"number selected\">"+navigatepageNums[i]+"</div>");
                continue;
            }
            $(".navbar").append("<div class=\"number\">"+navigatepageNums[i]+"</div>");
        }

    }
    function LoadTbody(data) {

        $("#TaskTbody").empty();

        // 遍历数据，更新表格
        $.each(data, function (index, item) {
            let implementorId = item.implementorId==null?'未知下属':getEmployeeNameById(item.implementorId).employeeName;
            let assignerId = item.assignerId==null?'未知上属':getEmployeeNameById(item.assignerId).employeeName;
            var row = "<tr>" +
                "<td class=\"text-center\">" + item.taskId + "</td>" +
                "<td class=\"text-center\">" + item.taskName + "</td>" +
                "<td class=\"text-center\">" + item.beginDate + "</td>" +
                "<td class=\"text-center\">" + item.endDate + "</td>" +
                "<td class=\"text-center\">" + item.realBeginDate + "</td>" +
                "<td class=\"text-center\">" + item.realEndDate + "</td>" +
                "<td class=\"text-center\">" + item.status + "</td>" +
                "<td class=\"text-center\">" + implementorId + "</td>" +
                "<td class=\"text-center\">" + assignerId + "</td>" +
                "<td class=\"text-center\">" + item.taskDesc + "</td>" +
                "<td class=\"text-center\"><button class='btn btn-primary' onclick='setTaskInfo("+item.taskId+")'>计划</button><button class='btn btn-info admin' onclick='editTask("+item.taskId+")'>编辑</button><button class='btn btn-danger admin' onclick='deleteTask("+item.taskId+")'>删除</button></td>" +
                "</tr>";

            $("#TaskTbody").append(row);
        });
        if (isAccepted){
            $(".admin").hide()
        }
    }
    function getEmployeeNameById(id) {
        var employ;
        $.each(employees, function (index, item) {
            if (item.employeeId==id){
                employ = item;
            }
        })
        return employ;
    }

    function LoadEmployeeSelect(){
        $(".employeeList").empty();
        $.each(employees2, function (index, item) {
            if (item.employeeId==NowEmployeeInfo.employeeId){
                return;
            }
            $(".employeeList").append("<option value='"+item.employeeId+"'>"+item.employeeName+"</option>")
        })
    }
    function editTask(id) {
        $.ajax({
            type: "Get",
            url: "Task?id="+id,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $('#updateFromModal').modal({
                    show:true,
                    backdrop:"static"
                })
                $.each(data, function (name, value) {
                    $("#updateFrom").find("*[name='"+name+"']").val(value);
                });
                validator2.loadValue();
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function deleteTask(id) {
        if (confirm("是否删除任务:"+id+"?")){
            $.ajax({
                type: "delete",
                url: "Task?id="+id,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    LoadPage();
                },
                error: function (xhr, status, error) {
                    console.error("Error loading data:", error);
                }
            });
        }
    }
    function update() {
        let value = validator2.getValue();
        $.ajax({
            type: "Put",
            url: "Task",
            data: JSON.stringify(value),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                LoadPage();
                $('#updateFromModal').modal('toggle');
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function add() {
        let value = validator.getValue();
        $.ajax({
            type: "Post",
            url: "Task",
            data: JSON.stringify(value),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                LoadPage();
                $('#addFromModal').modal('toggle');
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function setTaskInfo(id) {
        $.ajax({
            type: "Get",
            url: "SetTaskInfo?taskId="+id,
            success: function (data) {
                window.location.href="/Plan/PlanIndex";
            },
            error: function (xhr, status, error) {
                console.error("Error loading data:", error);
            }
        });
    }
    function GetNowEmployeeInfo() {
        $.ajax({
            type: "POST",
            url:"/Employee/GetNowEmployeeInfo",
            contentType: "application/json",
            async:false,
            dataType: "json",
            success: function(data) {
                NowEmployeeInfo = data;
                if (data.parentId!=1&&data.parentId!=null){
                    EmployeePower=true;
                    $(".adminButton").hide();
                }
                $(".nowId").val(data.employeeId);
            },
            error: function(error) {
                console.error("没有登录");
            }
        });
    }
</script>
</html>
