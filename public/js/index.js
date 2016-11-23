// 登录0.0.1版


//初始化
$(function (){
    login_obj.init();
});

//构建一堆工具
var login_obj = {
    init:function () {
        //预留位置放东西，前期只做简单的登录


        $(".button-collapse").sideNav();
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
            }
        })
    },

    order_submit:function () {
        var _menu_num = $(".menu-wrap").attr("data-MenuNum");
        console.log(_menu_num)
        var post_data = {
            menu_num:_menu_num,
            food:"小鸡炖蘑菇"
        };

        $.ajax({
            url:"/user/orders",
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
                        alert(data.msg)
                    }else {
                        alert(data.msg)
                    }
                }
            }
        })
    },


    // 监听绑定
    event_bind:function () {
        //登录提交
        $("#login-sub").on("click",function (e) {
            e.preventDefault();
            login_obj.default_submit();
        });

        // 登录框
        $(".login").on("click",function (e) {
            $(".mask-wrap").show();
            $(".login-wrap").show();
            e.preventDefault();
        });

        //关闭登录框
        $(".login-close").on("click",function () {
                $(".mask-wrap").hide();
                $(".login-wrap").hide();
        });

        //提交订单
        $(".test").on("click",function () {
            login_obj.order_submit();
        })

    }


};