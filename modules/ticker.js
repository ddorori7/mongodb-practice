// general_example.js와 함께

const util = require("util");
// 외부의 모듈을 불러오려면 require 함수로 모듈명을 명시하여 할당!
const EventEmitter = require("events").EventEmitter;
// 사용자 정의 객체가 on, emit 등의 이벤트 기능을 수행하려면
// EventEmitter를 상속받아야 한다.

let tick_target = null; // Ticker가 이벤트를 발생시킬 목적지

const Ticker = function (target) {
  tick_target = target;

  // emit으로 stop 이벤트를 발생시키면
  // 처리할 리스너 등록
  this.on("stop", () => {
    clearInterval(ticker);
    // clearInterVal(timer) -> 지정된 timer 해제
  });
};

// Prototype을 이용한 객체 공용 메서드 작성
Ticker.prototype.start = () => {
  ticker = setInterval(() => {
    // setInterval(callback, ms)
    //  -> ms 시간마다 callback함수 실행(반복)
    tick_target.emit("tick");
    // tick_target객체로 tick 이벤트 전송
  }, 1000); // 1초에 한번씩 이벤트 전송
};

// node 의 util 패키지로 EventEmitter 의 Prototype으로 상속
// util.inherits(constructor, superConstructor)
util.inherits(Ticker, EventEmitter);

// Ticker 모듈 내보내기
module.exports = Ticker;
