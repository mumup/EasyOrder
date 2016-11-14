$(function () {

    $(".preview-btn").on("click",function () {
        var menu_text =  $("#menu-text").val();
        var menu_arr  = text2arr(menu_text);




    });


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
