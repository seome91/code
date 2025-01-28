$(document).ready(function(){

    /**************************** 변수 ************************************/
    let device_status //브라우저가 pc인지 mobile상태인지
    let window_w //브라우저의 넓이
    let scrolling //브라우저가 스크롤 된 값
    let tab_name //find의 클릭한 tab의 이름

    /**************************** visual 팝업 (시작) ************************************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */
        effect: "fade", /* fade 효과 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_wrap .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_wrap .prev',  
        },
    });
    // swiper.autoplay.stop();  /* 일시정지 기능 */
    // swiper.autoplay.start();  /* 재생 기능 */

    $('.visual .btn_wrap .stop').on('click', function(){
        //console.log('정지 버튼 누름')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()//stop버튼 숨김
        $('.visual .btn_wrap .play').show() //play 나타남
    })

    $('.visual .btn_wrap .play').on('click', function(){
        //console.log('시작 버튼 누름')
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()//play버튼 숨김
        $('.visual .btn_wrap .stop').show()//stop버튼 나타남
    })
    /**************************** visual 팝업 (종료) ************************************/

    /**************************** pc인지 mobile 구분 (시작)  ***********************************/
    function device_chk(){
        window_w = $(window).width()
        if(window_w > 640){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        //console.log(device_status)
    }
    device_chk() //로딩 되었을때 1번 실행
    $(window).resize(function(){//브라우저가 리사이즈될때 1번 실행
        device_chk()
    })

    /**************************** pc인지 mobile 구분 (종료)  ***********************************/
    /**************************** header 고정 (시작)  ***********************************
     * 
     * 언제 : 스크롤할때, header에 마우스를 올렸을때
     * 뭘 : header에 fixed
     * 사라질때 : 맨 위로 스크롤 되었을때, header에서 마우스를 아웃했을때
     * 1. 스크롤 내린 상태에서 header에 마우스를 올렸다가 내림 (fixed 사라지면 X )
    */

    $('header').on('mouseenter', function(){
        $(this).addClass('fixed')
    })
    $('header').on('mouseleave', function(){
        /* 스크롤을 내린상태에서 마우스를 오버했다가 아웃하면 header에 클래스가 사라짐
           스크롤된 값이 0이거나 0보다 작을때만 삭제..  */
        if(scrolling <= 0){
            if($('header').hasClass('sch_open') == false){ //header에 sch_open이 없을때
                $(this).removeClass('fixed')
                //console.log('경우의 수1')
            }
        }
    })

    //함수의 정의
    function scroll_chk(){
        scrolling = $(window).scrollTop()
        //console.log(scrolling)
        if(scrolling > 0){//스크롤을 내렸을때
            $('header').addClass('fixed')
        }else if(($('header').hasClass('sch_open') == false) && ($('header').hasClass('menu_pc') == false)){//맨꼭대기
            /* 검색이 열려있는 상태에서는 class삭제 안함 -- header에 sch_open클래스가 있으면 열린상태 */
            $('header').removeClass('fixed')
        }
    }
    scroll_chk() //함수의 실행 - 로딩된 후 1번
    $(window).scroll(function(){
        scroll_chk() //함수의 실행 - 스크롤 될때마다 1번씩 실행
    })

    /**************************** header 고정 (종료)  ************************************/

    /**************************** 검색창 열기 (시작)  **********************************
     * header .tnb .search .search_open 를 클릭하면  header에 sch_open 추가
     * header .tnb .search .search_wrap .search_close 를 클릭하면 header에 sch_open 삭제
     * header.sch_open::after 한테는 클릭이벤트 발생 안함 .... 
     * **/

    $('header .tnb .search .search_open').on('click', function(){
        $('header').addClass('sch_open')
        $('header').addClass('fixed')
    })
    $('header .tnb .search .search_wrap .search_close').on('click', function(){
        $('header').removeClass('sch_open')
    })

    /**************************** 검색창 열기 (종료)  ************************************/

    /**************************** pc버전 메뉴열기 (시작)  ***********************************
     * header .gnb .gnb_wrap ul.depth1 > li 
     * 오버한 li에 over 클래스가 추가....
     * header에 menu_pc 클래스 추가
     * 
     * 언제 오버를 삭제....
    */
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){ //pc모드일때
            if($('header').hasClass('sch_open') == false){
                //이전에 오버했던 메뉴의 over를 삭제하기 위해서 모든 li의 over 지웠다가 오버한 애만 추가
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
                $(this).addClass('over')
                $('header').addClass('menu_pc')
                $('header').addClass('fixed')
                // console.log('오버다')
            }
        }
    })
    $('header .gnb .gnb_wrap ul.depth1').on('mouseleave', function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $('header').removeClass('menu_pc')
        // console.log('아웃이다')
    })

    $('header .gnb .gnb_wrap ul.depth1 > li:last-child ul.depth2 > li:last-child').on('focusout', function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $('header').removeClass('menu_pc')
        // console.log('포커스 날라감')
    })

    /**************************** pc버전 메뉴열기 (종료)  ************************************/

    /**************************** 모바일버전 메뉴열기 (시작)  ***********************************
     *  header .gnb .gnb_open 를 클릭하면  header에 menu_mo 클래스 추가
     *  header .gnb .gnb_close 를 클릭하면 header에서 menu_mo 클래스 삭제
    */

    //console.log('메뉴 열기 전')
    $('header .gnb .gnb_open').on('click', function(){
        //console.log('메뉴 열기 누름')
        $('header').addClass('menu_mo')
        $('html, body').css({overflow : 'hidden', height : $(window).height()}).bind('scroll touchmove mousewheel', function(e){e.preventDefault();e.stopPropagation();return false;},function(){passive:false});
    })
    //console.log('실행되니???')
    $('header .gnb .gnb_close').on('click', function(){
        //console.log('누름')
        $('header').removeClass('menu_mo')
        $('html, body').css({overflow : 'visible', height : 'auto'}).unbind('scroll touchmove mousewheel');
    })

    /**************************** 모바일버전 메뉴열기 (종료)  ************************************/
    
    /**************************** 모바일버전 2차 메뉴열기 (시작)  ***********************************
     * li를 클릭할것이냐... a를 클릭할 것이냐.. => a를 클릭.. 
     * ===> 2차 메뉴가 있는 1차 메뉴는 하위메뉴를 여는 기능을 갖음 (자기 자신의 href는 작동 X)
     * ===> 2차 메뉴를 가지고 있는 1차 메뉴인지 아닌지 구분
     * header .gnb .gnb_wrap ul.depth1 > li:has(ul.depth2) > a
     * 1차 메뉴 li에 open이라는 클래스를 추가
     * 
     * 1. 클릭한 메뉴만 열리고 다른 메뉴는 모두 닫기
     * 2. 이미 열려있는 메뉴를 다시 클릭하면 닫기
     * 메뉴를 클릭했을때 이미 열린 메뉴 (나만 닫기) 또는 닫혀 메뉴 (나머지 다 닫고, 나만 열기)
     */

    $('header .gnb .gnb_wrap ul.depth1 > li:has(ul.depth2) > a').on('click', function(e){
        if(device_status == 'mobile'){//모바일일때만
            e.preventDefault(); //href를 작동 안게 막는 코드
            if($(this).parent().hasClass('open') == false){
                //열린메뉴가 아닐 경우
                console.log('열린 메뉴 아님')
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $(this).parent().addClass('open')
            }else{
                //열린 메뉴일 경우
                console.log('열린 메뉴 맞음')
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            }//if
        }//if
    })

    /**************************** 모바일버전 2차 메뉴열기 (종료)  ************************************/

    /************************* 찾습니다. 가족을 팝업 (시작)  **************************/
    const find_panel01_swiper = new Swiper('.find .panel01 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            641: {    /* 1300px 이상일때 적용 */
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {
            nextEl: '.find .tab_content .panel01 .btn_wrap .next',
            prevEl: '.find .tab_content .panel01 .btn_wrap .prev',
        },
    });
    const find_panel02_swiper = new Swiper('.find .panel02 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            641: {    /* 1300px 이상일때 적용 */
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {
            nextEl: '.find .tab_content .panel02 .btn_wrap .next',
            prevEl: '.find .tab_content .panel02 .btn_wrap .prev',
        },
    });

    /************************* 찾습니다. 가족을 팝업 (끝)  **************************/
    /************************* 찾습니다. 가족을 탭 기능 (시작)  *************************
     * .find .tab_list ul li 버튼을 누른 후 하는 일
     * li에 active 클래스 추가
     * li button에 title="선택됨" 입력
     * li에 data-tab의 값을 가져와서 .tab_content .tab_panel 중에서 data-tab이 같은 값인 요소 찾아서 active 클래스
    */
    /************************* 찾습니다. 가족을 탭 기능 (끝)  **************************/

    $('.find .tab_list ul li').on('click', function(){
        $('.find .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        $('.find .tab_list ul li button').attr('title', '')
        $(this).find('button').attr('title', '선택됨')
        tab_name = $(this).attr('data-tab')
        console.log(tab_name)
        $('.find .tab_content .tab_panel').removeClass('active')
        $('.find .tab_content').find('[data-tab="'+tab_name+'"]').addClass('active')
    })

})//document.ready