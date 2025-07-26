// 有了 index.js 之後要拿到任何models 的話，都只要required models 就好
// 接下來如果有人required models 這個資料夾的話，就會得到後面的object{}
// 後面的obj 就有user 跟course 這兩個屬性 分別代表製作好的兩個model
module.exports = {
  user: require("./user-model"),
  course: require("./course-model"),
};
