/*
* common.js
* header/footer 공통요소에 들어가는 스크립트 저장 
* 모든 페이지에서 공통으로 작동되는 스크립트
*/

$(document).ready(function(){
    let scrolling = 0 //현재 스크롤 된값 
    let prev_scroll // 이전에 스크롤 된값 
    let window_w //브라우저 넓이
    let device_status //pc냐 모바일이냐 상태 저장

    /************ header에 fixed랑 scroll_down 추가 (시작) ****************
     * 스크롤이 1이라도 되면 fixed 클래스 추가
     * 하단으로 스크롤되면 scroll_down 클래스 추가
     * 위로 스크롤 되면 scroll_down 클래스를 삭제
     * 맨위로 갔을때 fixed, scroll_down 모두 삭제
     * >>>> 스크롤 방향 판단...
     * 이전 스크롤값을 저장해두고 현재 스크롤 값을 빼을때 0보다 작으면 아래로 스크롤
    */

    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()

        if(scrolling > 0){
            $('header').addClass('fixed')
            if((prev_scroll - scrolling) < 0){
                $('header').addClass('scroll_down')
                //console.log('내려가고 있어')
            }else{
                $('header').removeClass('scroll_down')
                //console.log('올라가고 있어')
            }
        }else{
            $('header').removeClass('fixed')
            $('header').removeClass('scroll_down')
        }
        //console.log(prev_scroll, scrolling)
    }

    scroll_chk() //함수 실행 (문서가 로딩 되었을때 1번)
    $(window).scroll(function(){ //스크롤 될때마다 1번 실행
        scroll_chk() //함수 실행
    })

    /************ header에 fixed랑 scroll_down 추가 (종료) *****************/
    /************ pc버전 메뉴에 마우스 오버 (시작) ****************
     * header .gnb_wrap ul.depth1 > li에 마우스를 올리면 
     * header에는 menu_pc 클래스 추가
     * 1차메뉴 li에는 over 클래스 추가
     * pc버전일때만 구현
    */

    function resize_chk(){
        window_w = $(window).width()
        if(window_w > 1000){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        //console.log(device_status)
    }
    resize_chk() //실행 - 문서가 로딩된 이후 1번 실행
    $(window).resize(function(){ //브라우저가 리사이즈 할때마다
        resize_chk() //실행
    })

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
        }
    })
    $('header').on('mouseleave', function(){
        $('header').removeClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })
    //메뉴 다음에 존재하는 링크에 포커스가 되었을때 메뉴를 아웃 시킴
    $('header .global').on('focusin', function(){
        $('header').removeClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })
    /************ pc버전 메뉴에 마우스 오버 (종료) *****************/
    /************ 언어선택 열기 (시작) ****************
     * pc버전에서만 구현되어야 함
     * 
     * header .global에 open클래스 추가
     * header .global button에서 title명을 바꿔줘야함
     * 1번 클릭하면 열리고 다시 클릭하면 닫힘
     * >>header .global을 클릭했을때 ... 
     * >>header .global에 open클래스가 있는지 체크
    */
    $('header .global').on('click', function(){
        if(device_status == 'pc'){
            if($(this).hasClass('open') == true){ //열려있는 상태
                //console.log('열렸어요!!')
                $(this).removeClass('open')
                $(this).find('button').attr('title', '언어선택 열기 버튼')
            }else{
                //console.log('닫혔어요!!!')
                $(this).addClass('open')
                $(this).find('button').attr('title', '언어선택 닫기 버튼')
            }
        }
    })
    /************ 언어선택 열기 (종료) *****************/

    /************ 모바일의 2차 메뉴 열고 닫기 (시작) ****************
     * header .gnb .gnb_wrap ul.depth1 > li > a 를 클릭했을때
     * 1. 클릭이벤트를 삭제(페이지 이동 막기)
     * 1차 메뉴 li에 open 클래스를 추가하거나 삭제.. 
     * >> 열려있으면 닫고, 닫혀있으면 (다른애들을 모두 닫고 나만 열기)
    */
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault(); //a의 클릭 막기
            if($(this).parent().hasClass('open') == true){ //open이 있으면 (닫아야함)
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
                /*
                    <a></a> ------------------------ $(this)
                    <ul class="depth2"></ul> ------- $(this).next()로 선택가능
                */
            }else{ //open이 없으면 (열기)
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
        }
    })
    /************ 모바일의 2차 메뉴 열고 닫기 (종료) *****************/
    /************ 모바일의 메뉴 열고 닫기 (시작) ***************
     * header .gnb .gnb_open >> 클릭하면 열리고 header에 menu_mo 클래스 추가
     * header .gnb .gnb_close >> 클릭하면 닫힘 header에 menu_mo 클래스 삭제
    */

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })

    /************ 모바일의 메뉴 열고 닫기 (종료) ****************/
    /************ top버튼을 클릭하면 상단으로 스크롤 (시작) ****************/
    $('footer .top button').on('click', function(){
        $('html, body').animate({
            scrollTop: 0,
        }, 500)
    })
    /************ top버튼을 클릭하면 상단으로 스크롤 (종료) ****************/
    /************ family site 클릭해서 열기 (시작) ***************
     * footer .family_site button  클릭했을때
     * footer .family_site 에 open 클래스 추가
     * button에 title의 문구 변경
     * footer .family_site .list 열고 닫기 slideUp slideDown
     * >> 현재 버튼이 열려있는지 닫혀 있는지 구분 >> open클래스 존재 유무로
    */
    $('footer .family_site button').on('click', function(){
        if($(this).parent().hasClass('open') == true){//open클래스가 있을때 (열렸을때 >> 닫는기능)
            //console.log('open클래스 있음')
            $(this).parent().removeClass('open')
            $(this).next().slideUp()
            $(this).attr('title', '열기버튼')
        }else{ //open클래스가 없을때 (닫혔을때 >>> 여는기능)
            //console.log('open클래스 없음')
            $(this).parent().addClass('open')
            $(this).next().slideDown()
            $(this).attr('title', '닫기버튼')
        }
    })

    /************ family site 클릭해서 열기 (종료) ****************/

})//$(document).ready
    