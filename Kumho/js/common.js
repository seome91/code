    /*
    * common.js
    * header/footer 공통요소에 들어가는 스크립트 저장 
    * 모든 페이지에서 공통으로 작동되는 스크립트
    */
$(document).ready(function(){
    let scrolling //현재 스크롤된값
    let prev_scroll // 이전에 스크롤된 값
    let window_w //브라우저넓이
    let device_status // pc or mobile 상태표시
       
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

        if(scrolling > 0){
            $('header').addClass('fixed')
        }else{
           
        }
        if((prev_scroll - scrolling) < 0){ //
            $('header').addClass('scroll_down')

        }else{
            $('header').removeClass('scroll_down')

        }
        //console.log(prev_scroll, scrolling)
    }

    scroll_chk()//함수 실행 (문서가 로딩되었을때 1번)
    $(window).scroll(function(){//스크롤 한번 할때마다 1번실행
        scroll_chk()//함수 실행
    })
    /*************** header.fixed.scroll_down 추가 종료 ******************/
    /******************* pc버전 마우스 오버 (시작) ********************/
    /**/ 

    function resize_chk(){
        window_w = $(window).width()
        if(window_w > 1000){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        // console.log(device_status)
    }
    resize_chk()// 실행 -- 문서가 로딩된 이후 1번 실행
    $(window).resize(function(){
        resize_chk()
    })
    $(' header .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
           $('header').addClass('menu_pc')
           $(' header .gnb_wrap ul.depth1 > li').removeClass('over')
           $(this).addClass('over')
        }
    })
    $(' header .gnb').on('mouseleave', function(){
        $('header').removeClass('menu_pc')
        $(' header .gnb_wrap ul.depth1 > li').removeClass('over')
    })
    //메뉴다음에 존재하는 링크에 포커스가 되었을때 메뉴를 아웃시킴
    $('header .global').on('focusin', function(){
        $('header').removeClass('menu_pc')
        $(' header .gnb_wrap ul.depth1 > li').removeClass('over')

    })

    /******************* pc버전 마우스 오버 (종료) ********************/
    /******************* 언어선택(pc에서만) (시작) ********************/
    //1.pc에서만 구현되어야함
    //2.header .global에 open클래스 춧가
    //3.header .global button에서 title명을 바꿔줘야함
    //4.한번클릭하면 열리고 다시클릭하면 닫힘
    //>>header .global 을 클릭했을떄...
    //>>header .global open class가있는지 chk 

    $('header .global').on('click', function(){
        if(device_status == 'pc'){
            if($(this).hasClass('open') == true){ //열려있는 상태
               // console.log('열림')
                $(this).removeClass('open')
                $(this).find('button').attr('title', '언어선택 열기 버튼') //attr:속성값 전체 설정,수정
            }else{
                //console.log('닫힘')
                $(this).addClass('open').attr('title', '언어선택 닫기 버튼')
            }
        }
    })
    /******************* 언어선택(pc에서만) (종료) ********************/
    /******************* 모바일 2차메뉴 열고닫기 (시작) ********************/
    //1.header .gnb .gnb_wrap ul.depth1 > li > a 를 클릭했을때
    //2.클릭이벤트를 삭제 li에 open클래스를 추가하거나 삭제
    //>>다른걸 열면 열려있는것은 닫힘
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault(); /* e 전달 받음 ,a 태그의 href를 작동 시키지 않음 */
            if($(this).parent('li').hasClass('open') == true){ //open 클래스를 가지고있으면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
                //console.log('열린애')
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $(this).parent().addClass('open')
                $(this).next().slideDown()
                //console.log('닫힌애')
            }
        }
    })
     /******************* 모바일 2차메뉴 열고닫기 (시작) ********************/
     /******************* 모바일 메뉴 열고닫기 (시작) ********************/
     //1. header .gnb .gnb_open >> 클릭하면 열리고 header에 meun_mo를 줌
     //2. header .gnbgnb_close >> 클릭하면 닫힘 header에 meun_mo 삭제
     $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
     })
     $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
     })

     /******************* 모바일 메뉴 열고닫기 (종료) ********************/

    
    
    
})//$(document).ready(function(){


