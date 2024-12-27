$(document).ready(function(){

    ///변수들////

    let device_status // pc일때pc mobile일때 mobile 저장
    let window_w
    let menu_status

    function device_chk(){ //함수를 정의한다 
        window_w = $(window).width()
        if(window_w > 640){ //640보다 크니까pc
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    
    device_chk() //html문서가 로딩되면 1번실행 
    $(window).resize(function(){ //브라우저가 리사이즈 될때마다 1번실행
        device_chk()

    }) 
    /*
        pc버전에서 메뉴에 (li냐..a)에 마우스를 오버하면 
        1.headerdp menu_pc 클래스추가
        2.header.menu_pc .gnb .gnb_wrap ul.depth1 > li에 active 클래스추가

        >> 이벤트 대상 (마우스 오버 대상) header.menu_pc .gnb .gnb_wrap ul.depth1 > li

        >> 키보드 접근성 - --- 마우스 오버가 아니라 키보드로 tab키를 눌러서 메뉴를 선택하고
        이동 할수 있어야함

        >>메뉴는 pc메뉴에서 작동되는 jquery, 모바일에서 작동되는 jquery가 다름
        pc와 모바일을 구분하는건 단순 브라우저의 넓이....
        브라우저의 넓이에 따라서...pc와 모바일을 구분
    
    */ 
   $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')
            $(this).addClass('active')
        }
           

    
    })
    $('header').on('mouseleave',function(){
        $('header').addClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')

    })
    //키보드 이동으로 메뉴를 아웃시키는 것은 마지막 1차메뉴의 마지막 2차메뉴에서 포커스가 사라지면 메뉴닫기
    $('header .gnb .gnb_wrap ul.depth1 > li:last-child ul.depth2 > li:last-child').on('focusout', function(){
        $('header').addClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')

    })


    /*
        1.메뉴가 하나가 열려있는데 다른메뉴를 열면 이전메뉴는 닫힌다
        2.하나의 메뉴를 한번 누르면 열리고 다시누르면 닫힌다 (닫힌메뉴를 누르면 열리고,열려있는 메뉴를 누르면 닫힘)

        >>현재 클릭한 메뉴가 열린메뉴나,아니냐
        1.클릭한 메뉴가 맞다 - > 클릭 한 자신의 open 클래스 삭제 
        2.클릭한 메뉴가 아니다 - > 모든 메뉴의 open 클래스를 삭제하고, 클릭한 자신만 open 클래스 추가
       
        header .gnb .gnb_wrap ul.depth1 > li 에 open클래스를 추가
        >>이벤트 대상 (누구를 눌렀을때) : header .gnb .gnb_wrap ul.depth1 > li >a

        a에는 href값이 있음...
        모바일에서는 a태그의 작동을 정지시켜야함
    */

        $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
            if(device_status == 'mobile'){
                e.preventDefault(); // a의 이벤트 (href작동중지)

                menu_status = $(this).parent().hasClass('open') // menu_status = 변수, 일종의 단축키
                console.log(menu_status)

                if(menu_status == true){ //열린 메뉴가 맞으면
                    $(this).parent().removeClass('open')
                }else{
                    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                    $(this).parent().addClass('open')
                }
            }
        })

        /* 
            header .gnb .gnb_open 을 클릭하면 heeader의 meun_mo 추가
             header .gnb .gnb_close 를 클릭하면 heeader의 meun_mo 삭제
        */
       
       $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
       })
       $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
       })


})//$(document).ready
