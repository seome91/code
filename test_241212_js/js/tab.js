$(document).ready(function(){

    let tab_name

    $('.news .tab_list ul li button').on('click', function(){
        
        tab_name = $(this).parent().attr('data-panel')
        console.log(tab_name)

        $(this).attr('title', '선택됨')
        $(this).html('<span>선택됨</span>')
    })

})//$(document).ready