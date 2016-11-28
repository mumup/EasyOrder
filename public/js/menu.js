$(function () {

    $('.modal').modal();  //初始化弹窗



    //预览按钮点击
    $(".preview-btn").on("click",function () {

        var menu_list = $(".menu-list tbody");
        var menu_text =  $("#menu-text").val();

        console.log(menu_list.length);
        if (menu_text == ""){
            Materialize.toast('请先输入菜单', 2000);
            return false;
        }
        createMenu(menu_list);

        $('.modal').modal("open");



    });

    ////发送菜单点击
    $(".send-btn").on("click",function () {
        var MenuList = getMenuArr2();
        console.log(MenuList);


        var post_data = {
            "menu":MenuList
        };


        $.ajax({
            url:"/admin/getMenuList",
            data:post_data,
            dataType:"json",
            type:'POST',
            timeout:30000,
            success:function (data) {
                if (data.status == 1){
                    Materialize.toast(data.msg, 2000);
                    $('.modal').modal("close");
                    $("#menu-text").val("")
                }else {
                    Materialize.toast(data.msg, 2000)
                }
            }
        })
    });

    //删除菜单
    $(".menu-delete").on("click",function () {
       var _this = $(this);
       var _li   = _this.closest("li[data-MenuNum]");
       var _menu_num = _li.attr("data-MenuNum");

        $.ajax({
            url:"/admin/menu?num=" + _menu_num,
            type:'DELETE',
            timeout:30000,
            success:function (data) {
                if (data.status == 1){
                    Materialize.toast(data.msg, 2000);
                    _li.hide(300,function () {
                        _li.remove()
                    })
                }else {
                    Materialize.toast(data.msg, 2000)
                }
            }
        });
    });


    //生成菜单列表
    function createMenu(el) {
        var menu_arr = getMenuArr();

        el.html("");

        console.log(el.length);

        for (var i = 0;i < menu_arr.length;i++){
            el.append("<tr><td>"+ menu_arr[i] +"</td></tr>")
        }
        console.log(menu_arr);
    }




    //获取菜单数组
    function getMenuArr() {
        return text2arr($("#menu-text").val())
    }


    // //上传的数据
    function postText(text) {
        var _arry = [];
        text = text.replace(/，/g,',');
        text = text.replace(/\s+/g,'');
        text =  text.split(",");

        for(var i = 0;i < text.length; i++){
            _arry.push({name:text[i],num:[i + 1]})
        }

        return _arry
    }

    //获取菜单数组
    function getMenuArr2() {
        return postText($("#menu-text").val())
    }


    //字符串转数组
    function text2arr(text) {
        text = text.replace(/，/g,',');
        text = text.replace(/\s+/g,'');
        return text.split(",")
    }

});
