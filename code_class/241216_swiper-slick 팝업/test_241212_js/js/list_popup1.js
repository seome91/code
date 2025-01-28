$(document).ready(function(){
    const swiper = new Swiper('.book .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            1300: {
                slidesPerView: 4, 
                /* swiper 넓이를 기준으로 해서 그 안에 몇개의 li를 구현
                   -- css에서 li의 넓이를 주지 않음 */
                spaceBetween: 24, /* li와 li 사이 여백 */
            },
        },
        centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */    
    });//swiper

    const story_swiper = new Swiper('.story .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', 
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: { //브라우저 사이즈에 따라서 swiper 설정값을 다르게 주겠다는 의미
            1300: { /* 1300px 이상 */
                slidesPerView: 'auto',
                /* preview를 auto하면 반드시 css에서 li의 넓이값을 줘야함 */
                spaceBetween: 24, /* li와 li 사이 여백 */
                centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
            },
        },
        centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */    
    });//swiper

    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', 
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: { //브라우저 사이즈에 따라서 swiper 설정값을 다르게 주겠다는 의미
            1300: { /* 1300px 이상 */
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
        centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */    
    });//swiper

})//$(document).ready