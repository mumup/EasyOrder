$(function () {
   $.ajax({
       url:"/admin/getOrderList",
       type:"GET",
       success: function(data){




           $("#info-content").append(buildEl(data))
       }
   });
    
    
    
    
    
    function buildEl(data) {
       var el = "";
        for(var i = 0;i < data.length; i++){
            el += '<tr class="'+ data[i]._id+'">';
            el += '<td>'+ (i+1)+'</td>';
            el += '<td>'+data[i].account+'</td>';
            el += '<td>'+data[i].name+'</td>';
            el += '<td>'+data[i].DishName+'</td>';
            el += '<td>'+data[i].time+'</td>';
        }
        return el;
    }
    
    
});
