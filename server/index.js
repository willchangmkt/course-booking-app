const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// 拿到routes資料夾，並拿到.auth 屬性，這樣就可以得到router
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
// 因為知道拿到的是一個function 所以可以直接執行function，裡面放的參數就是上面拿到的passport 套件
require("./config/passport")(passport);
// 因為是用同台電腦發送HTTP request 所以要安裝
const cors = require("cors");

// 連結MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/awDB")
  .then(() => {
    console.log("連結到awDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares  (post使用)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 有接收到任何跟/api/user有關的route 都要讓他連結到authRoute
app.use("/api/user", authRoute); //使用者登入或註冊
// course route應該被jwt保護
// 如果request header內部沒有jwt，則request就會被視為是unauthorized
app.use(
  "/api/courses",
  // 設定passport.authenticate middleware 保護
  // 每一個跟/api/courses有關的route都會去執行
  // 就會使用passport.js 裡面Jwt 的strategy
  passport.authenticate("jwt", { session: false }),
  courseRoute
); //查閱課程需經過驗證


// 只有登入系統的人，才能夠去新增課程或註冊課程
// 所以他們手上都會有JWT，
// 在做course 這個route 時就要去驗證他的JWT 是不是有效的
// 只有透過JWT 登入的人才能新增或註冊課程

// port 3000 是react 預設的port，所以這裡用8080
app.listen(8080, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
