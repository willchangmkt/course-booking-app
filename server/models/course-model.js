const mongoose = require("mongoose");
const { Schema } = mongoose;

// 課程course
const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  // 課程描述
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  courseDate: {
    type: String,
    required: true,
  },
  courseTime: {
    type: String,
    required: true,
  },
  instructor: {
    // 連結到mongoose 裡面的User 這個model
    // 所以這裡的type 很特別
    // 這兩行意思是我們設定instructor 他的type是mongoose.Schema.Types.ObjectId
    // 只有instructor可以製作一個新的course
    type: mongoose.Schema.Types.ObjectId, // 就是在mongoose 裡面所設定的primary key
    ref: "User", //連結到哪裡
    required: true,
  },
  students: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
