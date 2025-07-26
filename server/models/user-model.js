// models > user-model.js

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// 對於所有的用戶我都要確認身分，在之後的登入也要確認他的密碼，密碼要hash
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
    birthday:{
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  // 趙的沒有
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// instance methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isIsntructor = function () {
  return this.role == "instructor";
};

// // 是一個非同步函式，需要兩個參數，就要放
// // password 因為下方有執行bcrypt.compare password跟this.password
// // 在.comparePassword 裡面會做的事情很簡單，
// // 他會先用bcrypt 確認password跟資料庫裏面的hash 過的this.password 會不會相同
// // 如果相同result 就會是true 不相同就會是false
// userSchema.methods.comparePassword = async function (password, cb) {
//   let result = await bcrypt.compare(password, this.password);
//   // 要比較的對象會在Fn 的參數裡面
//   // this.password代表存在usermodel(userSchema)裡面的雜湊密碼
//   return cb(null, result);
// };

// 從上面改的
// comparePassword有兩個參數，是password, cb 
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    // 他會分成兩種狀況，第一種狀況是如果我在執行bcrypt.compare 的時候他失敗了發生error
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    // 失敗時執行cb，也就是上面的第二個參數放的fn，這個fn 放兩個參數，一個是error，另一個是result
    // 如果cb 被執行的時候，參數是這裡的e 的話就代表抓到錯誤，而錯誤是發生在上面的bcrypt.compare執行時有問題
    return cb(e, result);
  }
};

// mongoose middlewares
// 若使用者為新用戶，或者是正在更改密碼，則將密碼進行雜湊處理
// 在儲存之前進行雜湊處理
// 這裡的next 跟express 裡面的next 很類似，就是把控制權交給下一個middleware
// 這裡因為要用this屬性，所以不能用arrowFn 不然會抓不到this 屬性
userSchema.pre("save", async function (next) {
  // this 代表 mongoDB 內的 document
  // 新用戶在Mongoose 裡面有一個叫做this.isNew的屬性會是true
  //  this屬性有一個叫isModified的method，這裡可以放一個屬性(這裡叫password)
  // 他就會去檢查這個document的password 有沒有被改過
  if (this.isNew || this.isModified("password")) {
    // 只要有改過 就要將密碼做雜湊處理，用10的saltRound
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  // hash 結束之後，就可以在if 外面執行next，在if 外面執行next就是讓控制權交給下一個middleware
  next();
});

module.exports = mongoose.model("User", userSchema);
