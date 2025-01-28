$(document).ready(function(){

    /*
        1. 클릭한 .news .tab_list ul li에 active 클래스 추가
        2. 클릭한 .news .tab_list ul li button에 title="선택됨" 이라고 써줘야함
        3. 클릭한 .news .tab_list ul li의 data-panel값을 받아서
            .news .tab_contents .tab_pannel 중에 data-penel값이 값은 것에 
            active 클래스 추가
        
        4. 이전에 보였던 .news .tab_list ul li에 active 클래스 삭제
        5. 이전에 보였던 .news .tab_list ul li button에 title="선택됨" 삭제
        6. 이전에 보였던 .news .tab_contents .tab_pannel의 active 클래스 삭제 

        누구를 클릭했을때 이벤트가 발생할 것인지..
        .news .tab_list ul li 
        .news .tab_list ul li button   --- 현재 크기는 동일.. 

        >> 이미 선택된 것을 또 누를때는 아예 작동하면 안됨....
            1. $(this).attr('data-panel') 값과 curr_panel 값을 비교해서 같으면 이미 선택되어 있는것..
            2. active 클래스가 있으면 선택된 탭
    */

    let curr_panel = 'news1' //현재 클릭한 패널이름 (이미 html 코딩에서 news1이 선택되어 있음)
    let prev_panel // 이전에 클릭했던 패널이름 
    let cont_h //콘텐츠 높이

    $('.news .tab_list ul li').on('click', function(){
        // if($(this).hasClass('active') == false){
        //     console.log('active 클래스 없음')
        // }else{
        //     console.log('active 클래스 있음')
        // }

        if($(this).hasClass('active') == false){ //이미 선택된 버튼을 클릭한게 아니라면
            prev_panel = curr_panel //다른 탭을 클릭하자마자 오버되어 있던 탭의 이름을 이전탭이름으로 저장
            curr_panel = $(this).attr('data-panel')
            //이전에 선택되었던 패널
            //prev_panel
            $('.news .tab_list ul li[data-panel="'+prev_panel+'"]').removeClass('active')
            $('.news .tab_list ul li[data-panel="'+prev_panel+'"]').find('button').attr('title','')
            $('.news .tab_contents .tab_pannel[data-panel="'+prev_panel+'"]').removeClass('active')

            //현재 선택된 패널
            $(this).addClass('active')
            $(this).find('button').attr('title','선택됨')
            $('.news .tab_contents .tab_pannel[data-panel="'+curr_panel+'"]').addClass('active')
        }//if문
    })//on('click'

    /*
        tab_content가 absolute라서 감싸고 있는 요소가 높이를 인식하지 못함
        active클래스가 들어간 button의 높이와 tab_content의 높이를 합쳐서 ul에 줘야함

        >> 브라우저 사이즈가 리사이즈 될때 
        >> 처음에 로딩 되었을때도 
        >> active가 들어간 콘텐츠의 높이 계산이 필요함 ...
    */

    function notice_h(){
        cont_h = $('.notice .list ul li.active button').height() + $('.notice .list ul li.active .tab_contents').height()
        $('.notice .list ul').height(cont_h)
    }//function

    //맨처음에 로딩 되었을때 1번 실행
    notice_h()

    $(window).resize(function(){ // 브라우저 사이즈가 리사이즈 될때 1번
        console.log('리사이즈')
        notice_h()
    })

    $('.notice .list ul li').on('click', function(){
        if($(this).hasClass('active') == false){
            $('.notice .list ul li').removeClass('active')
            $(this).addClass('active')
            cont_h = $(this).find('button').height() + $(this).find('.tab_contents').height()
            console.log(cont_h)
            $('.notice .list ul').height(cont_h)
        }
    })

})//$(document).ready

