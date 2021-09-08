// 내장 객체
/*
console : 콘솔 창에 결과를 출력하는 객체
process : 프로세스의 실행에 대한 정보를 다루는 객체
exports : 모듈을 다루는 객체
*/

// process 객체
console.log(
  process.version, // node 버전
  process.platform, // 운영체제 종류
  process.arch // 프로세서 아키텍쳐
);
console.log(process.versions); // 종속된 프로그램의 버전정보들
console.log(process.env); // 환경정보

// Global 변수
console.log(__dirname); // 현재 모듈의 디렉터리
console.log(__filename); // 현재 모듈의 파일명

//-----------------------------------------------------
/*
모듈: 독립적인 실행영역을 가지는 개별 자바스크립트 파일
-> 외부의 모듈을 불러오려면 require 함수로 모듈명을 명시하여 할당
*/
// 모듈로부터 개별 객체 불러오기
// const add = require("./module/test_module1").add;
// const square = require("./module/test_module1").square;

// 전개 연산을 이용한 require
const { add, square } = require("./module/test_module1");
const area = require("./module/test_module2");
// 불러온 객체 사용
console.log(add(10, 20));
console.log(square(30));

console.log(area.square(40));
console.log(area.rectangle(10, 20));
console.log(area.circle(30));
