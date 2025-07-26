//使錯誤訊息以message顯示時更容易理解
const Joi = require("joi");



// 先做registerValidation fn ，用於使用者註冊系統時要通過這個，data是參數
const registerValidation = (data) => {
  // 這個schema的功能就是做一個Joi object，裡面描述這個data 應該要長什麼樣子
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    birthday: Joi.string().required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    // 要註冊的話只能填這兩者其中之一
    role: Joi.string().required().valid("student", "instructor"),
  });
  // 要validate 的對象就是data，這裡就會告訴我說validate的結果是什麼
  return schema.validate(data); //return boolean
};

// 登入時的驗證(email, password)
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// 驗證課程(課程標題, 課程描述, 課程價格)
const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(9999).required(),
    courseDate: Joi.string().required(),
    courseTime: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
