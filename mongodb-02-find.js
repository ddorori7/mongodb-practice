// const MongoClient = require("mongodb").MongoClient;
// 객체 구조 할당 방식(위와 같은 역할)
// 다른 모듈에서 내보낸 함수 가져오기
// const {
//   testInsertOneDoc,
//   testInsertManyDocs,
//   testDeleteAll,
// } = require("./mongodb-01-crud");
const { MongoClient } = require("mongodb");
const { resourceUsage } = require("process");

const url = "mongodb://localhost:27017"; // 접속 URL
const client = new MongoClient(url, { useNewUrlParser: true });

// 문서 한 개 가져오기
function testFindOne() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect().then((client) => {
    const db = client.db("mydb");

    db.collection("friends")
      .findOne()
      .then((result) => {
        console.log(result);
        client.close();
      });
  });
}
// testFindOne();

// 문서 전체 가져오기
function testFindAll() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  client
    .connect()
    .then((client) => {
      const db = client.db("mydb");
      db.collection("friends")
        .find()
        .toArray()
        // toArray로 배열로 변경하면 Promise의 도움을 받을 수 있다
        //(node:10740) UnhandledPromiseRejectionWarning: -> find()뒤에 .toArray()
        .then((result) => {
          for (let doc of result) {
            console.log(doc);
          }
        })
        .then(() => {
          client.close();
        });
    })
    .catch((reason) => {
      console.error(reason);
    });
}
// testFindAll();

// 조건 검색
// SELECT * FROM friends WHERE name='____'
// 조건 객체 { name: '값' } : =
function testFindByName(name) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect().then((client) => {
    const db = client.db("mydb");

    db.collection("friends")
      .find(
        /* 조건 객체 */
        { name: name } // 키 : 변수명 -> 일치하면 { name }으로 써도 ㅇ
      )
      .toArray()
      .then((result) => {
        for (let doc of result) {
          console.log(doc);
        }
      })
      .then(() => {
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
      });
  });
}
// testFindByName("고길동");

// 조건 조합 검색
// SELECT * FROM ... WHERE cond1 and(or) cond2
function testFindCombinedWhere() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .find(
        /* gender: 여성 and species: 인간 */
        /* 
        { $and: [{ gender: " 여성" }, { species: "인간" }] }
       */

        /* species: 인간 or age > 15 */
        { $or: [{ species: "인간" }, { age: { $gt: 15 } }] }
      )
      .toArray()
      .then((result) => {
        for (let doc of result) {
          console.log(doc);
        }
      })
      .then(() => {
        client.close();
      });
  });
}
// testFindCombinedWhere();

// projection
function testFindProjection() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .find({} /* 검색 조건(없으면 전체대상) */)
      // 표시할 필드 선택(project) -> 키 : 1(표시), 키 : 2(생략)
      //   .project({ name: 1, age: 1 })
      .project({ _id: 0 }) // 특정 필드만 표시하지 않을 때
      .skip(2) // 2문서 건너뛰기
      .limit(2) // 2문서 표시
      .toArray()
      .then((docs) => {
        for (let doc of docs) {
          console.log(doc);
        }
      })
      .then(() => {
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
      });
  });
}
testFindProjection();
