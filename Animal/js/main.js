$(document).ready(function () {
    
    /******************************* 변수 ********************************** */
    let device_status; // 브라우저의 상태 (pc or mobile 넓이기준)
    let window_w; // 브라우저의 넓이
    let scrolling; // 브라우저가 스크롤 된 값

    /******************************* visual 팝업 (시작) ********************************** */
    const visual_swiper = new Swiper('.visual .swiper', {
        effect: "fade", // fade 효과
        autoplay: { // 팝업 자동 실행
            delay: 5000, // 팝업 움직이는 속도
            disableOnInteraction: true,
        },
        loop: true, // 마지막 팝업에서 첫 번째 팝업으로 자연스럽게 넘기기
        navigation: { // 이전, 다음 버튼
            nextEl: '.visual .btn_wrap .next',
            prevEl: '.visual .btn_wrap .prev',
        },
    });

    $('.visual .btn_wrap .stop').on('click', function () {
        visual_swiper.autoplay.stop(); // 일시정지 기능
        $(this).hide(); // stop 버튼 숨김
        $('.visual .btn_wrap .play').show(); // play 나타남
    });

    $('.visual .btn_wrap .play').on('click', function () {
        visual_swiper.autoplay.start(); // 재생 기능
        $(this).hide(); // play 버튼 숨김
        $('.visual .btn_wrap .stop').show(); // stop 버튼 나타남
    });
    /******************************* visual 팝업 (종료) ***********************************/

    /******************************* pc or mobile 구분 (시작) ***********************************/
    function device_chk() {
        window_w = $(window).width();
        device_status = window_w > 640 ? 'pc' : 'mobile';
    }

    device_chk(); // 로딩됐을 때 한번 실행
    $(window).resize(function () {
        device_chk(); // 브라우저가 리사이즈될 때 실행
    });

    /******************************* header 고정 (시작) ***********************************/
    $('header').on('mouseenter', function () {
        $(this).addClass('fixed'); // header에 마우스를 올렸을 때
    });

    $('header').on('mouseleave', function () {
        if (scrolling <= 0) {
            $(this).removeClass('fixed'); // 맨 위로 스크롤 되었을 때
        }
    });

    function scroll_chk() {
        scrolling = $(window).scrollTop();
        if (scrolling > 0) {
            $('header').addClass('fixed');
        } else if (!$('header').hasClass('sch_open') && !$('header').hasClass('menu_pc')) {
            $('header').removeClass('fixed');
        }
    }

    scroll_chk(); // 초기 실행
    $(window).scroll(function () {
        scroll_chk(); // 스크롤 될 때마다 실행
    });

    /******************************* header 고정 (종료) ***********************************/

    /******************************** 검색창 열기 (시작) ***********************************/
    $('header .tnb .search .search_open').on('click', function () {
        $('header').addClass('sch_open');
    });

    $('header .tnb .search .search_wrap .search_close').on('click', function () {
        $('header').removeClass('sch_open');
    });
    /******************************** 검색창 열기 (종료) ***********************************/

    /******************************** pc버전 메뉴열기 (시작) ***********************************/
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function () {
        if (device_status === 'pc' && !$('header').hasClass('sch_open')) {
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over');
            $(this).addClass('over');
            $('header').addClass('menu_pc fixed');
        }
    });

    $('header .gnb .gnb_wrap ul.depth1').on('mouseleave', function () {
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over');
        $('header').removeClass('menu_pc');
    });

    $('header .gnb .gnb_wrap ul.depth1 > li:last-child ul.depth2 > li:last-child').on('focusout', function () {
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over');
        $('header').removeClass('menu_pc');
    });
    /******************************** pc버전 메뉴열기 (종료) ***********************************/
});