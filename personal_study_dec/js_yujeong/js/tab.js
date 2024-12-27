$(document).ready(function(){

    /*
    1.클릭한 .news .tab_list ul li에 active 클래스 추가 
    2.클릭한 .news .tab_list ul li.active button 에 title="선택됨"이라고 써줘어햠
    3.클릭한 .news .tab_contents .tab_pannel중에 data-pennel 값이 같은것에 attive클래스 추가

    4.이전에 보였던 .news .tab_list ul li에 active 클래스 삭제
    5.이전에 보였던 .news .tab_list ul li에 button 에 title="선택됨" 삭제
    6.이전에 보였던 .news .tab_contents .tab_pannel 에 attive 클래스 삭제

    누구를 클릭했을때 이벤트가 발생할것인지...
    .news .tab_list ul li --기준
    .news .tab_list ul li에 button --현재 크기는 동일...
    
    >>이미 선택된것을 또 누르면 아예 작동하면 안됨
     1.$(this).attr('data_pannel') 값과 curr_pannel 값을 비교해서 
     2. active 클래스 

    */

    let curr_pannel = 'news1'// 현재 클릭한 패널이름(이미 html코딩에서 news1이 선택 되어있음)
    let prev_pannel  /// 이전에 클릭했던 패널 이름 
    let cont_h //콘텐츠 높이

   $('.news .tab_list ul li').on('click', function(){
        // if($(this).hasClass('active') == false){
        //     console.log('active 클래스 없음')
        // }else{
        //     console.log('active 클래스 있음')
        // }
            
    
        if($(this).hasClass('active') == false){ //이미 선택된 버튼을 클릭한게 아니라면 
            
            prev_pannel = curr_pannel //다른탭을 클릭하자마자 오버되어있던 탭의 이름을 이전탭이름으로저장
            curr_pannel = $(this).attr('data-panel')
            //이전패널 선택되었던 패널
            //prev_pannel
            $('.news .tab_list ul li[data-panel="'+prev_pannel+'"]').removeClass('active')
            $('.news .tab_list ul li[data-panel="'+prev_pannel+'"]').find('button').attr('title', '')
            $('.news .tab_contents .tab_pannel[data-panel="'+prev_pannel+'"]')
            
            //현재 선택된 패널 
            $(this).addClass('active')
            $(this).find('button').attr('title', '선택됨')
            $('.news .tab_contents .tab_pannel[data-panel="'+curr_pannel+'"]').addlass('active')
            
        }
   })

        /*
            tab_content가 absoult라서 감싸고있는 요소가 높이를 인식못함
            active 클래스가 들어간 button의 높이와ㅡ tab_content 의 높이를 합쳐서 ul에 줘야함
            >> 브라우저 사이즈가 리사이즈 될때
            >>처음에 로딩되었을때도
            >>cative가 들어간 콘텐츠의 높이
        */ 

        function notice_h(){
            cont_h = $('.notice .list ul li.atcive button').height() + $('.notice .list ul li.atcive .tab_contents').height()
            $('.notice .list ul').height(cont_h)
        }//function

        //맨처음에 로딩되었을때 1번실행
        notice_h()
        $(window).load(function(){
            console.log('css까지 로딩이 된 이후')
            notice_h()
        })

        $(window).resize(function(){ // 브라우저 사이즈가 리사이즈될때 1번
            console.log('리사이즈')
            notice_h()
        })

   $('.notice .list ul li').on('click', function(){
        if($(this).hasClass('atcive') == false){
            $('.notice .list ul li').removeClass('atcive')
            $(this).addClass('atcive')
            cont_h = $(this).find('button').height() + $(this).find('.tab_contents').height()
            console.log(cont_h) 
            $('.notice .list ul').height(cont_h)
        }
   })


})//$(document).ready