$(document).ready(function(){
    /*
        pc버전에서 메뉴에 (li냐..a)에 마우스를 오버하면 
        1.headerdp menu_pc 클래스추가
        2.header.menu_pc .gnb .gnb_wrap ul.depth1 > li에 active 클래스추가

        >> 이벤트 대상 (마우스 오버 대상) header.menu_pc .gnb .gnb_wrap ul.depth1 > li
    
    */ 
   $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $('header').addClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')
        $(this).addClass('active')

        
    
    })
    $('header').on('mouseleave',function(){
        $('header').addClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')

    })

})//$(document).ready
