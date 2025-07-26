let JwtStrategy = require("passport-jwt").Strategy; //JWT驗證
let ExtractJwt = require("passport-jwt").ExtractJwt; // 把製作出來的JWT需要的部分拉出來
const User = require("../models").user; //連結user model

// 直接return 一個function ，裡面要放的參數就是passport 的套件
// index.js 執行(module.exports 執行後面Fn 時 passport 套件就會自動套進去)時就會自動套入passport 套件
module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   要去給說secret 或是RSA的話就要給key
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        // console.log(jwt_payload)
      try {
        // 拿到之前存在JWT裡面id 的部分，用這個id 去找user 是誰
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
            // done 是在jwt strategy 裡面的第二個參數
            // 這裡的功能就是說 如果有找到foundUser 的話，就在這裡return done null 跟foundUser
          return done(null, foundUser); // 把req.user 的值設定成 <= foundUser
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};