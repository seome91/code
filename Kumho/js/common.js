    /*
    * common.js
    * header/footer 공통요소에 들어가는 스크립트 저장 
    * 모든 페이지에서 공통으로 작동되는 스크립트
    */
$(document).ready(function(){
    let scrolling //현재 스크롤된값
    let prev_scroll // 이전에 스크롤된 값
       
    //console.log(prev_scroll)

    /*************** header.fixed.scroll_down 추가 시작 ******************/
    /*스크롤이 1이라도 되면 fixed 클래스 추가
    * 1.하단으로 스크롤 되면, scroll_down class 추가 
    * 2.위로 스크롤 되면 scroll_down class 삭제
    * 3.맨---위로갔을때 .fixed.scroll_down 모두 삭제
    * 4.>>> 스크롤방향 판단, 
    * 이전 스크롤 값을 저장해두고, 현재 스크롤 값을 뺐을때 0보다 작으면 아래로 스크롤  
    */

    function scroll_chk(){
        prev_scroll = scrolling // 현재스크롤값
        scrolling = $(window).scrollTop()
        $('header').addClass('fixed')
        if((prev_scroll - scrolling) < 0){ //
            $('header').addClass('scroll_down')
            console.log('내려가는중')
        }else{
            $('header').removeClass('scroll_down')
            console.log('올라가는중')
        }
        //console.log(prev_scroll, scrolling)
    }

    scroll_chk()//함수 실행 (문서가 로딩되었을때 1번)
    $(window).scroll(function(){//스크롤 한번 할때마다 1번실행
        scroll_chk()//함수 실행
    })


    
    /*************** header.fixed.scroll_down 추가 종료 ******************/

})//$(document).ready(function(){


