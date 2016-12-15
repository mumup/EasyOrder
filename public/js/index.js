// 登录0.0.1版


//初始化
$(function (){
    login_obj.init();
});

//构建一堆工具
var login_obj = {
    init:function () {
        //预留位置放东西，前期只做简单的登录


        $('select').material_select();
        $(".button-collapse").sideNav();
        login_obj.event_bind();
    },

    //获取点击菜名
    getFood:function () {
      return  $(".food").val()
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

    //不订餐
    cancel_order:function () {
        var _menu_num = $(".menu-wrap").attr("data-MenuNum");
        var _chose    = $(".choose");

        var opt = {
            menu_num :_menu_num,
            food :"不订餐",
            num :0
        };

        $.ajax({
            url:(_chose.length)?"/user/EditOrders":"/user/orders",
            data:opt,
            dataType:"json",
            async:true,
            type:'POST',
            timeout:30000,
            success:function (data) {
                if(data.status == 0){
                    if(_chose.length){
                        $(".choose i").text("不订餐");
                        Materialize.toast(data.msg,2000);
                    }else {
                        window.location.href = "/";
                    }
                }else {
                    Materialize.toast(data.msg,2000);
                }
            }
        })
    },

    //订单修改
    change_order:function () {
        var _chose = $(".select-dropdown").val();
        if (_chose == "更改订单"){ Materialize.toast("请先选择菜单",2000);return false;}

        var opt = {
            menu_num :$(".choose").attr("data-MenuNum"),
            food :_chose,
            num :$(".initialized").val()
        };

        $.ajax({
            url:"/user/EditOrders",
            data:opt,
            dataType:"json",
            async:true,
            type:'POST',
            timeout:30000,
            success:function (data) {
                if(data.status != 2){
                    Materialize.toast(data.msg,2000);
                    $(".choose i").text(_chose)
                }else {
                    Materialize.toast(data.msg,2000);
                }
            }
        })
    },

    //订单提交
    order_submit:function () {
        var _menu_num = $(".menu-wrap").attr("data-MenuNum");
        var _food     = login_obj.getFood();
        var _num      = $(".num").val();

        if (_food == ""){Materialize.toast("请先选择菜单",2000);return false}

        var post_data = {
            menu_num:_menu_num,
            food:_food,
            num:_num
        };

        $.ajax({
            url:"/user/orders",
            data:post_data,
            dataType:"json",
            async:true,
            type:'POST',
            timeout:30000,
            success:function (data) {
                if(data.status == 0){
                    window.location.href = "/";
                }else {
                    Materialize.toast(data.msg,2000);
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
        $(".SubmitOrder").on("click",function () {
            login_obj.order_submit();
        });

        //修改订单
        $(".changeOrder").on("click",function () {
            login_obj.change_order();
        });

        //不订餐
        $(".cancelOrder").on("click",function () {
            login_obj.cancel_order();
        });
        
        //点击菜单赋值菜名
        $(".menu-li").on("click",function () {
            var _all_li = $(".menu-li");
            var _this = $(this);
            var _input= $(".food");
            var _input_num= $(".num");
            _input.val(_this.text());
            _input_num.val(_this.find("a").data("foodnum"));

            _all_li.removeClass("pick");
            _this.addClass("pick");

        });
    }
};

