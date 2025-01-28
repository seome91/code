$(document).ready(function(){

    let tab_name

    $('.news .tab_list ul li').on('click', function(){
        tab_name = $(this).find('button').text()
        console.log(tab_name)
    })

})//$(document).ready