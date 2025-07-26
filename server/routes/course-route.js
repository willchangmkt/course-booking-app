// routes >course-route.js

const router = require("express").Router();
// 拿到courseSchema
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

// 測試passport.js用
router.use((req, res, next) => {
  console.log("course route正在接受一個request...");
  next();
});

// 獲得系統中的所有課程
router.get("/", async (req, res) => {
  console.log("正在獲得所有課程");
  try {
    let courseFound = await Course.find({})
      // .populate是在mongoose 裡面的query obj (thenable obj，跟promise 很像但不是)裡面才能用的一個method
      // 根據instructor 的id 去找到跟instructor 有關的資料，並且附加在課程資訊裡面(mongoose 內建功能)
      // 根據courseFound裡面的這些Document的instructor的屬性找到跟instructor 有關的資料
      // .populate("instructor" 就是用instructor去找到跟instructor 有關的資料
      // 第二個參數是一個array ，array 裡面就要說需要的資料是什麼
      .populate("instructor", ["username", "email"])
      // 這裡加上exec() 讓他變成promise
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(5000).send(e);
  }
});

// 用講師id來尋找課程 (在所有的課程裡面去尋找)
router.get("/instructor/:_instructor_id", async (req, res) => {
  try {
    let { _instructor_id } = req.params;
    // 找到Course instructor 的屬性 等於  _instructor_id
    let coursesFound = await Course.find({ instructor: _instructor_id })
      // 把關聯資料（ref）自動拉出來
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用學生id來尋找註冊過的課程
router.get("/student/:_student_id", async (req, res) => {
  try {
    let { _student_id } = req.params;
    let coursesFound = await Course.find({ students: _student_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用課程id尋找課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params; // 從 URL 中取得課程 ID
  try {
    let courseFound = await Course.findOne({ _id }) // 在資料庫查找這個 ID 的課程
      .populate("instructor", ["email"]) // 連結講師資料，並只取 email 欄位
      .exec();
    return res.send(courseFound); // 回傳查到的課程資料
  } catch (e) {
    return res.status(500).send(e); // 出錯的話回傳 500
  }
});

// 用課程名稱尋找課程
router.get("/findByName/:name", async (req, res) => {
  // 用 req.params 把課程名稱找出來
  let { name } = req.params;
  try {
    // 找到資料庫中的名稱跟輸入搜尋列的名稱相同的值
    // 這裡不能用findone 要用 find，如果用findone 只會給我們一個物件而已 而不是array
    // 在資料庫裏面並沒有限制課程名稱是不能重複的，所以可能會有某堂課程名稱一樣但講師不同
    // 所以用find 才會讓retuen 的type 從document 變成array
    let courseFound = await Course.find({ title: name })
      .populate("instructor", ["email", "username"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 讓學生透過課程id來註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();

    // 檢查學生是否已經註冊過這門課程
    if (course.students.includes(req.user._id)) {
      return res.status(400).send("您已經註冊過這門課程了");
    }
    // crouse-route 有受到JWT 的保護，使用者帶著JWT來的話，在request.user 裡面就會包含使用者資訊
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.send(e);
  }
});

//讓學生透過課程id來退出課程
router.post("/quit/:_id", async (req, res) => {
  console.log("已退出課程");
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    //jwt
    course.students.pop(req.user._id);
    console.log([course.students]);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.send(e);
  }
});

// 新增課程
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   每一個User 都會有有一個在user-model 裡面都會有一個instance method 叫做isStudent
  //  如果身分是學生就不能新增課程
  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能發佈新課程。若你已經是講師，請透過講師帳號登入。");
  }
  // 透過title, description, price 創造新課程
  let { title, description, price, courseDate, courseTime } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      courseDate,
      courseTime,
      //   特別設定製作new Course 的時候，他的instructor 的屬性要設定給req.user._id 的部分
      //   目前正在創建Course 的人他創建出來的課程的instructor屬性一定要等於req.user._id，也就是在passport.j已經驗證過的使用者他的_id，也就是在mongoDb 裡面的id
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send({
      message: "新課程已經保存",
      // savedCourse,
    });
  } catch (e) {
    return res.status(500).send("無法創建課程。。。");
  }
});

// 修改課程
router.patch("/:_id", async (req, res) => {
  console.log("正在修改課程，課程ID:", req.params._id);
  console.log("req.body:", req.body);

  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let { _id } = req.params;
  // 確認課程存在
  if (!_id) {
    return res.status(400).send({ message: "課程 ID 不能為空" });
  }
  try {
    let courseFound = await Course.findOne({ _id });
    console.log("找到的課程:", courseFound);
    if (!courseFound) {
      return res
        .status(400)
        .send({ message: "找不到課程。無法更新課程內容。" });
    }

    // 使用者必須是此課程講師，才能編輯課程
    // 如果courseFound找到的 instructor ID 等於 用JWT 確認的使用者req.user._id
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log("更新後的課程:", updatedCourse);
      return res.send({
        message: "課程已經被更新成功",
        // 更新好的課程就可以讓使用者看一下資料
        updatedCourse,
      });
    } else {
      // 如果ID比較之後不同
      return res.status(403).send("只有此課程的講師才能編輯課程。");
    }
  } catch (e) {
    console.error("更新課程時發生錯誤:", e);
    return res.status(500).send({ message: e.message });
  }
});

// 刪除課程
router.delete("/:_id", async (req, res) => {
  console.log("正在刪除數據!");
  let { _id } = req.params;
  // 確認課程存在
  try {
    console.log("正在刪除數據2");
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("找不到課程。無法刪除課程。");
    }

    // 使用者必須是此課程講師，才能刪除課程
 if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.status(200).json({
        message: "課程已被成功刪除。",
      });
    } else {
      return res.status(403).send("只有此課程的講師才能刪除課程。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
