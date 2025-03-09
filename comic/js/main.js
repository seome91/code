
/**************************** visual 팝업 (시작) ************************************/

$(document).ready(function(){
    
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 5000,
        //     disableOnInteraction: true,
        // },


       // effet: "fade",
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
    });
        
    /**************************** visual 팝업 (종료) ************************************/



    /**************************** offer 팝업 (시작) ************************************/
    const offer_swiper = new Swiper('.offer .swiper', { 

        loop: true,

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.offer .swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            /*type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            
		},

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.offer .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.offer .btn_prev',  
	    },
	
        

    });





    /**************************** offer 팝업 (종료) ************************************/
       

})//$document.ready