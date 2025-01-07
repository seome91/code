/*
* main.js
* main에서만 작동되는 스크립트 저장
*/

$(document).ready(function(){
    
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .ctrl_wrap .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            // renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
            //     return '<span class="' + className + '"> 안녕' + (index + 1) + "</span>";
            // },
        },

    });

    $('.visual .ctrl_wrap button.stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap button.play').show()
    })
    $('.visual .ctrl_wrap button.play').on('click', function(){
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap button.stop').show()
    })
    /************************ biz에 마우스를 오버했을때 (시작)**************************/
    //.biz .list ul li 에 마우스를 올렸을때
    //마우스를 올린 li에만 active 클래스 추가
    //.biz .list에 over 클래스추가
    $('.biz .list ul li').on('mouseenter', function(){
        $('.biz .list ul li').removeClass('active')
        $(this).addClass('active')
        $('.biz .list').addClass('over')
    })
    $('.biz .list').on('mouseleave', function(){
        $('.biz .list ul li').removeClass('active')
        $('.biz .list').addClass('over')
    })
    /************************ .biz에 마우스를 오버했을때 (종료)**************************/
    /************************ .News .swiper (시작)**************************/
    const news_swiper = new Swiper('.news .list .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            761: {    /* 768px 이상일때 적용 */
            slidesPerView: 2,
            spaceBetween: 18,
            },
            1001: {    /* 768px 이상일때 적용 */
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        scrollbar: {
            el: ".news .list .ctrl_wrap .scroll",
            hide: false, //숨김
            draggable: true,
            dragSize: 180,
        }
    });
    
/************************ .news .swiper (종료)**************************/
/********** aos 애니메이션 ***********/
    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });
})//$(document).ready