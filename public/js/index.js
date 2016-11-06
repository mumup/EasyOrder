// 登录0.0.1版


//初始化
$(function (){
    login_obj.init();
});

//构建一堆工具
var login_obj = {
    init:function () {
        //预留位置放东西，前期只做简单的登录


        login_obj.event_bind();
    },
    //普通登录
    default_submit:function () {
        var username = $.trim($("#user").val());
        var password = $.trim($("#password").val());

        if(username == "") {
            alert("用户名不能为空");
            return false;
        }
        if(password == "") {
            alert("密码不能为空");
            return false;
        }
        var post_data = {
            "user": username,
            "password": password
        };

        $.ajax({
            url:"/user/login",
            data:post_data,
            dataType:"json",
            type:'POST',
            timeout:30000,
            success:function (data) {
                var status = data["status"];
                if (status == 3){
                    location.href = "/";
                }else {
                    if (status == 1){
                        alert("密码错误")
                    }else {
                        alert("用户不存在")
                    }
                }
                // switch (status){
                //     case 3:alert("登录成功");
                //         break;
                //     case 2:alert("没有这个用户");
                //         break;
                //     case 1:alert("密码错误")
                // }
            }
        })
    },

    // 监听绑定
    event_bind:function () {
        $("#login-sub").on("click",function (e) {
            e.preventDefault();
            login_obj.default_submit();
        });

        $(".login-close").on("click",function () {
                $(".mask-wrap").hide();
                $(".login-wrap").hide();
        });

    }


};