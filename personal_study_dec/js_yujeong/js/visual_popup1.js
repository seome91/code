$(document).ready(function(){
    const swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
                delay: 5000, /*5초5000*/
                disableOnInteraction: true, /*이미지 루프 */
            },

            loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
            pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
                el: '.visual .paging', /* 해당 요소의 class명 */
                clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            },
            

            navigation: {  /* 이전, 다음 버튼 */
                nextEl: '.visual .next',  /* 다음 버튼의 클래스명 */
                prevEl: '.visual .prev',  
            },

        });

          
         

        $('.visual .btn_wrap .stop').on('click', function(){   
            swiper.autoplay.stop();  /* 일시정지 기능 */
            $(this).hide()
            $('.visual .btn_wrap .play').show()
        })
        $('.visual .btn_wrap .play').on('click', function(){
            swiper.autoplay.start();/* 재생 기능 */
            $(this).hide()
            $('.visual .btn_wrap .stop').show()  
        })
       

        })