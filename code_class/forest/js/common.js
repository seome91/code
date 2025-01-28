$(document).ready(function(){
    
    let window_w //브라우저의 넓이
    let device_status //pc - mobile 현재 상태를 저장
    let scrolling = $(window).scrollTop() //스크롤 된값

    function device_chk(){
        window_w = $(window).width()
        if(window_w > 1024){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        //console.log(device_status)
    }//function

    device_chk()//문서가 로딩될때
    $(window).resize(function(){ //브라우저가 리사이즈 할때마다
        device_chk()
    })//window.resize

    $(window).scroll(function(){
        scrolling = $(window).scrollTop()
        //console.log(scrolling)
    })


    /********************* 모바일 1차 메뉴 열기 :: START *************************
     * header .gnb .gnb_wrap ul.depth1 > li > a 를 클릭했을때
     * 1. a의 링크 삭제 (작동X)
     * 2. 상위 li에 open클래스를 줌
     * 3. 만약에 이미 open가 있는 요소면 li에 open삭제, 
     *    닫혀있는 메뉴면 열기
    */

    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();
            if($(this).parent().hasClass('open') == true){ //현재 열려있는상태
                $(this).parent().removeClass('open')
                //console.log('열렸어요')
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $(this).parent().addClass('open')
                //console.log('닫혀있어요')
            }
            //console.log('모바일에서 메뉴 클릭')
        }
    })

    /********************* 모바일 1차 메뉴 열기 :: END **************************/

    /********************* 모바일 메뉴 열기 :: START *************************
     * 
     * header .gnb .gnb_open 을 클릭하면 header menu_mo 클래스 추가
     * header .gnb .gnb_wrap .gnb_close 를 클릭하면 header menu_mo 클래스 삭제
    */
    
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })

    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })
    
    /********************* 모바일 메뉴 열기 :: END **************************/

    /********************* pc 메뉴 :: START *************************
     * 
     * 1. header에 menu_pc 클래스 추가
     * 2. header .gnb .gnb_wrap ul.depth1 > li에 over 클래스 추가
    */

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            //console.log('메뉴에 오버했다!!!!')
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
        }
    })
    $('header').on('mouseleave', function(){
        if(device_status == 'pc'){
            $('header').removeClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        }
    })
    $('header .tnb .search button').on('focusin', function(){
        if(device_status == 'pc'){
            $('header').removeClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        }
    })
    /********************* pc 메뉴 :: END **************************/

    /********************* 모바일에서 header fixed 클래스 추가 :: START *********************
     * 
     * 스크롤을 내리면 header fixed 클래스 추가
     * 스크롤이 다시 맨 상단에 올라가면 fixed 클래스 삭제
    */

    function header_fixed(){
        if(device_status == 'mobile'){
            if(scrolling > 0){
                $('header').addClass('fixed')
            }else{
                $('header').removeClass('fixed')
            }
        }
    }

    header_fixed()
    $(window).scroll(function(){
        header_fixed()
    })

    /********************* 모바일에서 header fixed 클래스 추가 :: END **********************/

})//document.ready