$(".del-btn").click(function () {
    var _this = $(this);
    var _id = _this.attr("data-id");
    var _dom = $("." + _id);

    $.ajax({
        url:"/admin/user_list?id=" + _id,
        type:'DELETE',
        timeout:30000,
        success:function (data) {
            var status = data["status"];
            if (status = 1){
                _dom.remove();
                alert("删除成功")
            }
        }
    })
});
