// ticker.js와 함께

const Ticker = require("./module/ticker.js");
let count = 0; // 카운트 변수

// tick 이벤트를 받으면 처리할 리스너
process.on("tick", () => {
  count++;
  console.log(count, "초가 흘렀습니다!");

  if (count >= 10) {
    ticker.emit("stop");
  }
});

// ticker 생성
let ticker = new Ticker(process);
ticker.start();
