$(function () {

    $('.modal').modal();  //初始化弹窗




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


    //生成菜单列表
    function createMenu(el) {
        var menu_arr = GetMenuArr();

        el.html("");

        console.log(el.length);

        for (var i = 0;i < menu_arr.length;i++){
            el.append("<tr><td>"+ menu_arr[i] +"</td></tr>")
        }
        console.log(menu_arr);
    }


    //序列化菜单数组
    function GetMenuArr() {
        var menu_text =  $("#menu-text").val();
        return text2arr(menu_text);
    }


    //获取菜单数组
    function getMenuArr() {
        return text2arr($("#menu-text").val())
    }


    //字符串转数组
    function text2arr(text) {
        text = text.replace(/，/g,',');
        text = text.replace(/\s+/g,'');
        return text.split(",")
    }

});
