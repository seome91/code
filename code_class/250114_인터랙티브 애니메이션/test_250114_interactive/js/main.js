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
})