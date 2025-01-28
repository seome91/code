$(document).ready(function(){

    /************************ 공통요소 :: 시작 ***********************/
    let scrolling = $(window).scrollTop()// 현재 스크롤 된 값
    let window_h = $(window).height() //브라우저 높이
    $(window).scroll(function(){
        scrolling = $(window).scrollTop()
        //console.log(scrolling)
    })
    $(window).resize(function(){
        window_h = $(window).height()
        //console.log(window_h)
    })
    /************************ 공통요소 :: 종료 ***********************/

    /*
    ************************ txt_slide 애니메이션 :: 시작 ***********************
    *  .txt_slide .txt_wrap .row span의 넓이를 
    *  0 > 100%로 변경하는 애니메이션
    *  .txt_slide .txt_wrap .row가 여러개 가능..... 
    *  애니메이션의 시작점 .txt_slide 화면에 나타났을때 (대략 200)
    *  애니메이션의 종료점 .txt_slide 화면 상단으로 스크롤 되었을때 (대략 850)
    *  850-200 = 650px 2줄이니까 ..... 325px 스크롤 될때.. 1줄 완성 
    *  200 ~ 525px - 1줄 완성
    *  >> 200 ~ 525px로 될때 0 ~ 100%됨... 
    *  >> 525-200 = 325/100 = 3.25 => 1%
    *  >> 스크롤 값이 400px임 .... 
    *  >> 400 - 200 = 200px 정도 스크롤 
    *  >> 1번이 스크롤 되는 전체 325px의 몇 % -- 200/325*100 = 61%
    * 
    *  >> 0 ~ 200 : 0출력 
    *  >> 200 ~ 525 : 0-100% 퍼센트 계산
    *  >> 525 이상 : 100% 출력 
    * 
    *  525 ~ 850px - 2줄 완성 
    */

    let obj_wrap = $('.txt_slide') //애니메이션이 들어갈 글자 전체를 감싸는 요소
    let obj_row = $('.txt_slide .txt_wrap .row') //애니메이션이 들어가는 글자 1줄 
    let obj_row_sub = 'span' //absolute 글자의 선택자
    let start_ratio = 0.3 //애니메이션 시작 위치 조정값
    let end_ratio = 0.3 //애니메이션 종료 위치 조정값

    let scroll_gap //시작부터 스크롤 된 값
    let scroll_percent //스크롤 된 값을 퍼센트로
    let scroll_area //스크롤 적용 범위
    let ani_start //애니메이션 시작점 (기준이 줄단위)
    let ani_end //애니메이션 종료점
    let obj_w //넓이가 조절되는 오브젝트    
    let obj_leng = obj_row.length //줄 수 계산
    let obj_area_start //글자 전체의 애니메이션 시작 점
    let obj_area_end //글자 전체의 애니메이션 종료점
    let obj_area_h //1줄 애니메이션이 작동될 높이
    
    function obj_count(){
        obj_area_start = obj_wrap.offset().top - window_h + (window_h * start_ratio)
        obj_area_end = obj_wrap.offset().top + obj_wrap.height() - (window_h * end_ratio)
        obj_area_h = (obj_area_end - obj_area_start) / obj_leng
        //console.log('스크롤', scrolling, '시작값', obj_area_start, '종료값', obj_area_end, '구간', obj_area_h)

        for(i=0; i<obj_leng; i++){
            //console.log(i)
            txt_slide(i)
        }
    }

    function txt_slide(num){
        //console.log(num)
        ani_start = obj_area_start + (obj_area_h * num)
        ani_end = obj_area_start + (obj_area_h * (num + 1))
        obj_w = obj_row.eq(num).find(obj_row_sub)
        if(scrolling <= ani_start){
            scroll_percent = 0
        }else if((scrolling > ani_start) && (scrolling < ani_end)){
            //스크롤이 200보다 크고, 525보다 작을때, 즉 200~525 사이
            scroll_area = ani_end - ani_start
            scroll_gap = scrolling - ani_start
            scroll_percent = scroll_gap / scroll_area * 100
        }else{
            scroll_percent = 100
        }//if종료
        //console.log(scroll_percent)
        obj_w.width(scroll_percent + '%')
    }//function 종료

    obj_count() //문서가 로딩되면 1번 실행
    
    $(window).scroll(function(){ //스크롤 할때 마다
        obj_count()
    })
    $(window).resize(function(){ //브라우저가 리사이즈가 될때
        obj_count()
    })

    /************************ txt_slide 애니메이션 :: 종료 ***********************/

    /************************ 이미지 넓이 조절 애니메이션 :: 시작 **********************
    * .photo_resize .photo 넓이가 50% -> 100%
    * 언제 시작할 것인지 ... (영역이 브라우저 하단에서 올라왔을때)
    * 언제 종료할 것인지 .... (영역이 브라우저 중간쯤 올라왔을때)
    * 넓이가 50% 일때 > 50% ~ 100% 변경 > 100% 유지하는 구간 
    * 예를들어 시작 100 종료가 500이라고 하면 
    * >>> 100 ~ 500 늘어남 .... 400이 스크롤 되는 동안 4 => 1%
    * >>> 내가 300px 스크롤 했음 
    * >>> 300 - 100 = 200/400 = 0.5
    * >>> 최초의 넓이 50 -> 100 : 총 50%가 증가 >>> 그 증가값의 50% 
    * >>> 50*0.5 = 25 + 50
    */
    let ph_name = $('.photo_resize .photo') //요소를 감싸는 이름
    let ph_start_width = 50 //최초의 넓이 (단위는 %)
    let ph_end_width = 100 //마지막 넓이 (단위는 %)
    let ph_width //이미지를 감싸는 요소의 넓이
    let ph_gap //최종 스크롤을 계산하는 높이
    let ph_start //애니메이션 시작 위치
    let ph_end //애니메이션 종료 위치

    function photo_resize(){
        ph_start = ph_name.offset().top - window_h + (window_h * 0.3)
        ph_end = ph_name.offset().top - (window_h * 0.1)
        //console.log('스크롤값', scrolling, '시작점', ph_start, '종료점', ph_end)
        if(scrolling < ph_start){
            ph_width = ph_start_width
            //console.log('작음')
        }else if(scrolling < ph_end){
            ph_gap = ph_end - ph_start
            ph_width = (scrolling - ph_start)/ph_gap
            ph_width = (ph_width * (ph_end_width - ph_start_width)) + ph_start_width
            //console.log('늘어나는중')
        }else{
            ph_width = ph_end_width
            //console.log('다 늘어남')
        }//if문 종료
        //console.log(ph_width)
        ph_name.width(ph_width + '%')
    }//function 종료 
    $(window).scroll(function(){ //스크롤 할때 마다
        photo_resize()
    })
    $(window).resize(function(){ //브라우저가 리사이즈가 될때
        photo_resize()
    })

    /************************ 이미지 넓이 조절 애니메이션 :: 종료 ***********************/

    /************************ 스크롤되면 배경이 검은색으로 변경되는 애니메이션 :: 시작 **********************
     * .bg_change 영역이 브라우 상단쯤에 닿으면 black 추가됨 (상단에 닿지 않았을때는 black이 없음)
     * 상단에 도달하기 전 :: black 클래스 없음
     * 상단에 도달한 이후 :: black 클래스 추가
    */
    let bg_name = $('.bg_change')
    let bg_class = 'black'
    let bg_start //배경색을 바꾸주기 시작하는 시점

    function bg_chage(){
        bg_start = bg_name.offset().top - (window_h * 0.2)
        //console.log('스크롤', scrolling, 'bg_chage top값', bg_start)
        if(scrolling < bg_start){
            bg_name.removeClass(bg_class)
        }else{
            bg_name.addClass(bg_class)
        }
    }
    bg_chage() //로딩이 완료되었을때

    $(window).scroll(function(){ //스크롤 할때마다
        bg_chage()
    })

    $(window).resize(function(){ //브라우저가 리사이즈가 될때
        bg_chage()
    })

    /************************ 스크롤되면 배경이 검은색으로 변경되는 애니메이션 :: 종료 **********************/

    /************************ 동영상 콘텐츠가 브라우저에 고정(확대) :: 시작 *********************
     * .bg_change .video_fit .video_area 이 긴영역의 
     *  - 브라우저의 상단에 도달하기이전                data-status="before"
     *  - 도달해서 스크롤 되는 중                      data-status="fixed"
     *  - 이미지 스크롤 되어서 화면 밖으로 사라지는 경우 data-status="after"
     *  >>>> 스크롤 되는 중에는 동영사의 크기가 천천히 늘어 남 ..... 
     * 
     * >>> 스크롤 1000일때 고정 시작
     *     스크롤 2000일때 고정 종료   ---- 스크롤 1000동안 사이즈가 리사이즈됨
     * >>> 리사이즈 시작 값은 80
     *     리사이즈 종료 값은 100 --- 20만 변경됨...
     * 
     * >>> 예를들어 내가 현재 스크롤 값이 1500임 ... 그럼 현재 넓이가 얼마 ...
     *     vf_area_gap = 2000(vf_end) - 1000(vf_start) = 1000
     *     vf_scroll_per = 1500(scrolling) - 1000(vf_start) = 500 / 1000(vf_area_gap) = 0.5
     *     vf_resize_w = 100(vf_resize_end) - 80(vf_resize_start) = 20 * 0.5(vf_scroll_per) = 10 + 80(vf_resize_start) = 90
    */

    let vf_area_name =  $('.bg_change .video_fit .video_area')
    let vf_resize_name = $('.bg_change .video_fit .video_area .video_wrap .video_inner')
    let vf_resize_start = 80
    let vf_resize_end = 100
    let vf_resize_w // 리사이즈 될때 계산한 넓이값
    let vf_area_gap // 리사이즈를 계산해야할 스크롤 구간값
    let vf_scroll_per //스크롤 된 값의 퍼센트
    let vf_start //영역을 고정하는 시작 지점
    let vf_end //영역 고정을 종료하는 종료 지점 

    function video_fixed(){
        vf_start = vf_area_name.offset().top
        vf_end = vf_area_name.offset().top + vf_area_name.height() - window_h 
        vf_area_gap = vf_end - vf_start
        //console.log('스크롤값', scrolling, '상단값', vf_start, '종료값', vf_end)
        if(scrolling < vf_start){
            vf_area_name.attr('data-status', 'before')
            //기존값을 지우고 내가 준 값으로 교체함 ...
            vf_resize_w = vf_resize_start
        }else if(scrolling < vf_end){
            vf_area_name.attr('data-status', 'fixed')
            vf_scroll_per = (scrolling - vf_start) / vf_area_gap
            vf_resize_w = ((vf_resize_end - vf_resize_start) * vf_scroll_per) + vf_resize_start
            vf_resize_w = vf_resize_w * 1.05
            if(vf_resize_w > vf_resize_end){ ///end값이상 늘어나지 못하게 막음
                vf_resize_w = vf_resize_end
            }
        }else{
            vf_area_name.attr('data-status', 'after')
            vf_resize_w = vf_resize_end
        }//if
        //console.log(vf_resize_w)
        vf_resize_name.width(vf_resize_w + '%')
        vf_resize_name.height(vf_resize_w + '%')
    }//function
    video_fixed() //문서 로딩되었을때 1번 실행
    $(window).scroll(function(){//스크롤할때마다 실행
        video_fixed() 
    })
    $(window).resize(function(){//리사이즈 될때마다 실행
        video_fixed() 
    })

    /************************ 동영상 콘텐츠가 브라우저에 고정(확대) :: 종료 **********************/

    /************************ 스크롤 시 콘텐츠 이동 :: 시작 *********************
     * 시작 시점 .scroll_event .event_wrap이 화면에 나타나면
     * .scroll_event .event_wrap h2의 transform:translateY() 값을 조절해서 계속 위로 이동
     * (현재 스크롤값 - 스크롤 시작값)에 일정 수를 곱해서 px로 줌....
    */
    let ev_area_name = $('.scroll_event .event_wrap') //감싸는 영역이름
    let ev_area_start //이벤트가 시작하는 값
    let ev_move_name = $('.scroll_event .event_wrap h2') //움직일 요소
    let ev_move //움직일 값

    function scroll_event(){
        ev_area_start = ev_area_name.offset().top - window_h
        //console.log('스크롤값', scrolling, '시작값', ev_area_start)
        if(scrolling > ev_area_start){
            //console.log('움직일꺼다...')
            ev_move = (ev_area_start - scrolling) / window_h * 250
        }else{
            //console.log('0이다....')
            ev_move = 0
        }//if종료
        //console.log(ev_move)
        ev_move_name.css('transform', 'translateY('+ ev_move +'px)')
    }//function 종료
    scroll_event() //문서가 로딩될때
    $(window).scroll(function(){ //스크롤될때마다
        scroll_event()
    })
    $(window).resize(function(){ //리사이즈 될때마다
        scroll_event()
    })

    /************************ 스크롤 시 콘텐츠 이동 :: 종료 **********************/

    /************************ slick 팝업 :: 시작 ********************
     * 1개 (왼쪽)가 스타일이 다름 ..... 
     * 
    */

    $('.book .list .popup .popup_wrap').slick({
        autoplay: false, //팝업 자동 실행
        autoplaySpeed: 3000, //팝업이 머무는 시간
        speed: 500, //팝업 전환 속도
        dots: false, //하단 페이지 버튼 (true, false)
        arrows: true,  //다음, 이전팝업 (true, false)
        //pauseOnHover: true, //마우스호버시 일시정지
        infinite: true, //무한반복
        //variableWidth: true, //넓이를 자유롭게 설정
        slidesToShow: 4, //한번에 보일 팝업 수
        //slidesToScroll: 1, //한번 드래그에 움직이는 슬라이드 제한
        swipeToSlide: true, //드래그한만큼 슬라이드 움직이기
        //centerMode: true, //가운데정렬(가운데가 1번)
    });

    /************************ slick 팝업 :: 종료 **********************/

    /************************ swiper 팝업 :: 시작 **********************/
    const swiper = new Swiper('.best .list .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 4, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 24, /* 팝업과 팝업 사이 여백 */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    /************************ swiper 팝업 :: 종료 **********************/
})