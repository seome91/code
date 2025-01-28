$(document).ready(function(){ 
    //html문서가 모두 로딩 될때까지 기다렸다가 실행 
    console.log('jquery 호출')
    $('#test').text('jquery가 씀2')

    /* box_btn를 클릭하면 box에 red라는 클래스를 추가해줌 */
    $('.box_btn').on('click', function(){
        //box_btn을 감시하다가 click하는 순간에 실행
        $('.box').addClass('red')
    })
    /* box_btn2를 클릭하면 box에 red라는 클래스를 삭제해줌 */
    $('.box_btn2').on('click', function(){
        $('.box').removeClass('red')
    })
})

console.log('안녕하세요')

let abc = '1'
abc = '만세' 
/* =은 할당연산자 
   abc = '만세'라고 넣어주면 이전 값을 지우고 나만 들어감  */
let bbb = '2'
console.log(abc)
console.log('bbb') //변수를 따옴표로 감싸면 그건 그냥 글자가 됨
// 브라우저의 콘솔창에 로그 메시지를 출력해달라... 
// abc라고하는 변수에 담겨있는 메시지

let num1 = '11' //아무리 숫자라도 ''로 묶으면 글자
let num2 = '22'
let sum = num1 + num2
//글자 두개를 더하면 같이 출력
console.log(sum) //1122 출력

num1 = 11
num2 = 22
sum = num1 + num2 
console.log(sum) // 33 출력

sum = --num2
console.log(sum)

sum = sum - num1 //현재 sum 값에서 num1의 값을 빼줌 
console.log(sum)
if(sum > 20){ //만약 sum이라는 변수의 값이 20보다 크다면
    console.log('sum은 20보다 크다') 
    //위 조건이 맞으면 실행, 조건이 안맞으면 아예 실행 X
}

sum = sum + 16
console.log(sum)
if(sum > 20){  //둘중에 하나만 실행
    //조건이 맞으면 실행 
    console.log('sum은 20보다 크다')
}else{
    //조건이 안맞으면 실행
    console.log('sum은 20과 같거나 작다')
}

//document.querySelector('#test').innerHTML = 'jquery가 씀';
/*
    html에서 js파일을 먼저 호출했고 다음에 html요소가 쓰임 (순서가 중요)
    그럼 js에서 html요소를 불러서 스타일을 줄 수가 없음 (명령을 내릴 수 없음)
    ---> 해결방법은 js를 html 아래로 내리는 것인데 이는 추천하지 않음 !!!
*/
