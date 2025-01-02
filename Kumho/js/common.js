/*
* common.js
* header/footer 공통요소에 들어가는 스크립트 저장 
* 모든 페이지에서 공통으로 작동되는 스크립트
*/
let scrolling //현재 스크롤된값
let prev_scroll // 이전에 스크롤된 값

/*************** header.fixed.scroll_down 추가 시작 ******************/
/*스크롤이 1이라도 되면 fixed 클래스 추가
* 1.하단으로 스크롤 되면, scroll_down class 추가 
* 2.위로 스크롤 되면 scroll_down class 삭제
* 3.맨---위로갔을때 .fixed.scroll_down 모두 삭제
* 4.>>> 스크롤방향 판단, 
* 이전 스크롤 값을 저장해두고, 현재 스크롤 값을 뺐을때 0ㅗ다 작으면 아래로 스크롤  
*/




/*************** header.fixed.scroll_down 추가 종료 ******************/