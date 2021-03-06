const express = require("express");
const router = express.Router();

const { ObjectId } = require("mongodb");
// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;

/*
[app.js 일부]
//  express 객체 생성
const app = express();
*/

function APIRouter(app) {
  router.get("/friends.json", (req, resp) => {
    let db = app.get("db");

    db.collection("friends")
      .find()
      .toArray()
      .then((result) => {
        //  json 결과 출력
        resp
          .status(200)
          .header({ "Content-Type": "text/json;charset=utf-8" })
          .json(result);
      });
  });

  router.get("/friends/:id.json", (req, resp) => {
    let db = app.get("db");

    db.collection("friends")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        resp
          .status(200)
          .header({ "Content-Type": "text/json;charset=utf-8" })
          .json(result);
      });
  });

  return router;
}

//  라우터 내보내기
module.exports = APIRouter;
