//routes > auth.js
//任何跟認證使用者(authentication)有關的route都會由auth.js 處理
const router = require("express").Router();
// 導入用joi 套件做的驗證物件
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");  //驗證使用者身分

// 設定一個middleware，只是讓我們知道"正在接收一個跟auth有關的請求"
router.use((req, res, next) => {
  console.log("正在接收一個跟auth有關的請求");
  next();
});

// Postman test 測試API 有沒有正常運作
router.get("/testAPI", async (req, res) => {
  return res.send("成功連結auth route...");
});

// 使用者註冊
router.post("/register", async (req, res) => {
  //確認數據是否符合規範
  console.log(req.body);
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  // 尋找有沒有email 屬性剛好跟req.body.email一樣
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已經被註冊過了！");

  // 製作新用戶
  let { email, username, password, role, birthday } = req.body;
  // 用User 的constructor
  let newUser = new User({ email, username, password, role, birthday });
  // 儲存使用者
  try {
    let savedUser = await newUser.save();
    // 如成功儲存，把儲存的資料告訴他，給他一個物件
    return res.send({
      msg: "成功儲存新用戶。",
      // 給他看saveUser 屬性，會自動連結到newUser.save()的結果
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存用戶");
  }
});

// 使用者登入，在這個route 我們要驗證使用者，
// 驗證完後就要製作一個jwt 給他存在他的瀏覽器裡面
// 但目前還不用寫說如何讓使用者把jwt存在瀏覽器，目前只要先製作出來就好
router.post("/login", async (req, res) => {
  console.log("成功進到login route。")
  //確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  // 先找到有沒有持有這個信箱的人
  const foundUser = await User.findOne({ email: req.body.email });
  // 沒找到的話
  if (!foundUser) {
    return res.status(401).send("無法找到使用者，請確認信箱是否正確。");
  }
  // 確認信箱存在 且帳秘輸入的值都符合規範
  // 用在models > user-model.js 裡面設定的comparePassword instance method，
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    // 這個err 會發生是在user model 裡面
    if (err) return res.status(500).send(err);
    //確認isMatch 是true 還是false，是在models > user-model.js裡面
    //  執行cb 時 return cb(null, result);第一個值是null，第二個就是結果
    if (isMatch) {
      // 製作json web token
      // 先想想什麼可以放進JWT 裡面
      // _id 就是mongoDB所製作出來的ID
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      // 第一個參數就是上面的tokenObject 第二個就是secret
      // 這個jwt.sign接著就會用HMAC去計算出一個token的值，這個值就會回傳給使用者
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      // 回傳物件給使用者，並寫下token 的屬性
      return res.send({
        message: "成功登入",
        // JWT 後面一定要有空格，不然會有bug
        token: "JWT " + token,
        // 讓他看到在資料庫存的資料是什麼
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

//修改使用者資料(目前只能從postman上修改)，未開放給使用者
router.patch("/:_id", async (req, res) => {
  //確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  try {
    let { username, birthday, email, password } = req.body;
    let newData = await User.findOneAndUpdate(
      { _id },
      { username, birthday, email, password ,role },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    res.send({ msg: "已成功修改資料!", updatedDate: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;
