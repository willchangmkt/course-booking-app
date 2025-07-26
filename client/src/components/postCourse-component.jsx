import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import post1 from "./img/post1.svg";
import post2 from "./img/post2.svg";

//僅有教練可以操作的張貼課程
const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [courseDate, setCourseDate] = useState("");
  let [courseTime, setCourseTime] = useState("");
  let [message, setMessage] = useState("");

  const navigate = useNavigate();

  //張貼課程時需要的資料
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeDate = (e) => {
    setCourseDate(e.target.value);
  };
  const handleChangeTime = (e) => {
    setCourseTime(e.target.value);
  };
  //導向登入頁面
  const handleLogin = () => {
    navigate("/login");
  };

  //導向註冊頁面
  const handleRegister = () => {
    navigate("/register");
  };
  // 這裡是用CourseService，把 title, description, price 套進去之後
  const postCourse = () => {
    console.log("正在創建課程");
    CourseService.post(title, description, price, courseDate, courseTime)
      .then(() => {
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ padding: "3rem" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="p-5 mb-4 bg-accent-custom rounded-3 shadow-bk text-center">
                  <div className="container-fluid py-5">
                    <h1 className="display-4 fw-bold text-dark">
                      <i className="fa-solid fa-lock me-3"></i>
                      請先登入
                    </h1>
                    <p className="col-md-8 fs-4 mx-auto mb-4">
                      您需要先登入才能發布課程。
                      <br />
                      如果您還沒有帳號，請先註冊會員。
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        className="btn btn-dark btn-lg me-md-2"
                        onClick={handleLogin}
                      >
                        <i className="fa-solid fa-door-open me-2"></i>
                        立即登入
                      </button>
                      <button
                        className="btn btn-light btn-lg"
                        onClick={handleRegister}
                      >
                        <i className="fa-solid fa-user-plus me-2"></i>
                        註冊會員
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <div className="about-gym-header p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* 左邊文字 */}
                <div className="col-md-8">
                  <h4 className="display-5 fw-bold py-4">
                    發佈課程功能僅供講師訪問
                  </h4>
                </div>
                {/* 右邊圖片 */}
                <div className="col-md-4 d-none d-md-flex justify-content-end">
                  <img
                    src={post2}
                    alt="about gym"
                    className="img-fluid d-none d-md-block"
                    style={{ maxHeight: "150px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 如果是講師的話就會顯示這個form */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* 左側文字 */}
                <div className="col-md-8">
                  <h3 className="display-5 fw-bold">發布新課程</h3>
                  <p className="fs-6">
                    {currentUser?.user?.username || ""}{" "}
                    老師您好，歡迎來到課程發布頁面。
                    <br />
                    請在這裡輕鬆建立並發布您的新課程，分享專業，開啟更多學習的可能！
                  </p>
                </div>
                {/* 右側圖片 */}
                <div className="col-md-4 d-none d-md-flex justify-content-end p-5">
                  <img
                    src={post1}
                    alt="發佈新課程"
                    className="img-fluid"
                    style={{ maxHeight: "150px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <label for="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
            placeholder="請輸入課程名稱，不可少於6個字。"
          />
          <br />
          <label for="exampleforContent">課程內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
            placeholder="請輸入長度介於6到50字的課程介紹。"
          />
          <br />
          <label for="exampleforPrice">課程價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
            placeholder="請輸入課程價格。"
          />
          <br />
          <label for="exampleforDate">上課日期：</label>
          <input
            name="date"
            type="date"
            className="form-control"
            id="exampleforDate"
            onChange={handleChangeDate}
          />
          <br />
          <label for="exampleforTime">上課時間：</label>
          <input
            name="time"
            type="string"
            className="form-control"
            id="exampleforDate"
            onChange={handleChangeTime}
            placeholder="Ex.18:30～20:00"
          />
          <br />
          <button className="btn btn-dark" onClick={postCourse}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
