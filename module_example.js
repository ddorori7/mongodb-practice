// 내장 객체
/*
console
process
exports
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
