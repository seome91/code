$(document).ready(function(){
    let scrolling  = $(window).scrollTop() // 선언은 맨위에,let
    //html이 모두 로딩 된 이후에 실행
    /*
    1. 메뉴에 마우스를 올렸을때 header에 on클래스를 추가 
        이벤트 대상 : header .gnb .gnb_wrap ul.depth1 li
        이벤트  핸들러 : mouseenter
        header에 on클래스를 추가 - addClass
    2. headrer에서 마우스를 내렸을때
        이벤트대상 : header
        이벤트 핸들러 : mouseleave
        header에 on클래스를 삭제 : removeClass('class명'); 
    3.스크롤을 내렸을때
        header에 on클래스를 추가 
    4.맨위로 스크롤 되었을때
        header 에 on 클래스를 삭제
    변경되는것...
    header에 on클래스를 줌
    */
   
   $('header .gnb .gnb_wrap ul.depth1 li').on('mouseenter',function(){
        $('header').addClass('on')
   })

   //console.log(scrolling)
   $('header').on('mouseleave', function(){
        if(scrolling == 0){
            $('header').removeClass('on')
        }
   })
   
   function scroll_chk(){ //함수의 선언
    scrolling = $(window).scrollTop()
    console.log(scrolling)
    if(scrolling > 0){//스크롤값이 0보다 크면
        $('header').addClass('on')
    }else{
        $('header').removeClass('on')
    }
   }//function
   
   //문서가 로딩됐을때 단1번 실행
   
   scroll_chk() // 함수의 실행

   $(window).scroll(function(){
    //브라우저가 스크롤될때마다 1번실행
    scroll_chk()// 함수의 실행

   })//$(window).scroll

})//document.ready
