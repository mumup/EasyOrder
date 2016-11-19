$(function (){
    admin_tools.init();
});

var admin_tools = {

    init:function () {


        admin_tools.event_bind();
    },



//admin添加用户
    df_submit:function () {
        var _user = $("#user").val();
        var _name = $("#name").val();
        var _role = $("#role").val();
        var _password = $("#password").val();
        var apEl = $("#info-content");

        var post_data = {
            user:_user,
            name:_name,
            role:_role,
            password:_password
        };

        $.ajax({
            url:"/user/register",
            type:'POST',
            timeout:10000,
            data:post_data,
            success:function (data) {
                var status = data["status"];
                console.log(status)
                if (status == 2){
                    Materialize.toast('添加成功', 2000)
                    apEl.append(admin_tools.createEl(post_data,data.id))
                }else {
                    Materialize.toast('用户已存在', 2000)
                }
            }
        });
    },


  //创建dom
    createEl:function (data,id) {
        var _html = '<tr class="'+ id+'">';
            _html +=     '<td>'+ data.user+'</td>';
            _html +=       '<td>'+ data.name+'</td>';
            _html +=       '<td>'+ data.role+'</td>';
            _html +=       '<td>';
            _html +=         '<a class="waves-effect waves-light btn">修改</a>';
            _html +=        ' <a data-id="' + id+  '" onClick="deleteEl(this)" class="del-btn waves-effect waves-light btn red">删除</a>';
            _html +=       '</td>';
            _html += '</tr>';

        return _html;
    },



    // 监听绑定
    event_bind:function () {

//添加用户按钮点击事件

        $(".close-btn").click(function () {
            $('[data-model="register"]').hide(300);
        });

        $("#add-user").on("click",function (e) {
            $('[data-model="register"]').show(300);
            e.preventDefault();
        });

        $("#adduser-sub").on("click",function (e) {
            admin_tools.df_submit();
            e.preventDefault()
        });



//删除按钮点击事件
//         $(".del-btn").on("click",function () {
//             var _this = $(this);
//             var _id = _this.attr("data-id");
//             var _dom = $("." + _id);
//
//             $.ajax({
//                 url:"/admin/user_list?id=" + _id,
//                 type:'DELETE',
//                 timeout:30000,
//                 success:function (data) {
//                     var status = data["status"];
//                     if (status = 1){
//                         _dom.remove();
//                         Materialize.toast('删除成功', 2000)
//                     }
//                 }
//             })
//         });



    }



};


//删除动态添加的数据，很丑，以后再改
function deleteEl(el) {
    var _this = $(el);
    var _id = _this.attr("data-id");
    var _dom = $("." + _id);
    console.log(_id)

    $.ajax({
        url:"/admin/user_list?id=" + _id,
        type:'DELETE',
        timeout:30000,
        success:function (data) {
            var status = data["status"];
            if (status = 1){
                _dom.remove();
                Materialize.toast('删除成功', 2000)
            }
        }
    })
}