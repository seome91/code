$(document).ready(function(){
    //html이 다 로딩 될때까지 까지 기다렸다가 실행
    console.log('jquery 호출')
    $('#test').text('jquery가 씀2')

    /* box_btn를 클릭하면 box에 red라는 클래스를 추가해줌  */
   $('.box_btn').on('click',function(){
        //box_btn을 감시하다가 click하는 순간에 실행
        $('.box').addClass('red') /*red라는 클래스를 심어줌*/ 
   })
      /*box_btn2를 클릭하면 box에 red라는 클래스를 삭제해줌 */
    $('.box_btn2').on('click', function(){
        $('.box').removeClass('red')
    })

})

console.log('안녕하세요');

var  abc = '1'
abc = '만세' /*= 은 할당 연산자란?
abc = '만세'라고 넣어주면 이전값을 지우고 나만 들어감*/
var  bbb = '2'
console.log(abc)
console.log('bbb')/*해당 글자를 바로 출력함,변수는 절대 ''를 붙이면 안됨, 그냥 단순히 글자가됨*/ 
// 브라우저의 콘솔창에 로그 메세지를 뿌려(출력)주세요 ...
// abc라고하는 변수에 담겨있는 메세지

var num1 = '11'//아무리 숫자라도 ''로 묶으면 텍스트로인식,두개로 묶어서 같이출력됨
var num2 = '22'
 sum = num1 + num2

console.log(sum)

var num1 = 11
var sum = num1 + num2
console.log(sum)//33 출력

sum = --num2
console.log(sum)

sum = sum - num1 //현재 sum 값에서 num1을빼줌
console.log(sum)
if(sum > 20){ //만약 sum이라는 변수의 값이 20qhek 크다면
    console.log('sum은 20보다 크다') // 위 조건이 맞으면 실행
    //위조건이 맞으면 실행, 조건이 안맞으면 아예실행x
    
}

sum = sum + 16
console.log (sum)
if(sum > 20){ //둘중에 하나만 실행
    //조건아 맞으면 실행
    console.log('sum은 20보다 크다')
}else{
    //조건이 안맞으면 실행
    console.log('sum은 20과 같거나 작다')
}

//document.querySelector('#test').innerHTML = 'jauery가 씀'
/*
html애서 js파일을 먼저 호출했고 다음에 html요소가 쓰임 순서가 중요함
그러면, js에서 html요소를 불러서 스타일을 줄 수 가없음
--->해결방법은 js를 html아래로 내리는것인데 이는 추천하지는 않음 !!!
*/ 