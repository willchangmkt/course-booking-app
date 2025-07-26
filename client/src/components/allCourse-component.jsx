import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";
import addCourse2 from "./img/addCourse2.svg";
import addCourse3 from "./img/addCourse3.svg";

const AllCourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //學生無法重複註冊
  const handleEnroll = (e) => {
    courseService
      .enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功!重新導向到修課列表。");
        navigate("/course");
      })
      .catch((e) => {
        window.alert("您已經註冊過此課程，無法重複註冊。");
        console.log(e);
      });
  };
  //導向登入頁面
  const handleLogin = () => {
    navigate("/login");
  };

  //導向註冊頁面
  const handleRegister = () => {
    navigate("/register");
  };
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    if (currentUser) {
      courseService
        .getAllCourse()
        .then((data) => {
          console.log(data.data);
          setCourseData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    //使用未登入會被要求登入
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
                      您需要先登入才能查看課程內容。
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
      {currentUser &&
        currentUser.user.role == "student" &&
        courseData &&
        courseData.length != 0 && (
          //登入者為學生會看到的畫面
          <div>
            <div className="about-header p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
              <div className="container-fluid ">
                <div className="row align-items-center">
                  {/* 左邊：文字內容 */}
                  <div className="col-md-8">
                    <h4 className="display-5 fw-bold">課程總覽</h4>
                    <p className="fs-6">
                      {currentUser?.user?.username || ""}{" "}
                      同學您好！這裡是課程總覽頁面，
                      <br />
                      選擇您喜歡的課程並立即報名參加吧！
                    </p>
                  </div>

                  {/* 右邊：圖片 */}
                  <div className="col-md-4  d-none d-md-flex justify-content-end py-5">
                    <img
                      src={addCourse2}
                      alt="學員課程"
                      className="img-fluid"
                      style={{ maxHeight: "150px", width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {courseData.map((course) => {
                return (
                  <div>
                    <div
                      key={course._id}
                      className="card"
                      style={{
                        width: "19.7rem",
                        flexWrap: "wrap",
                        padding: "0.5rem",
                        margin: "0rem",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          <b>課程名稱:</b> <br />
                          {course.title}
                        </h5>
                        <p
                          style={{ margin: "0.5rem 0rem" }}
                          className="card-text"
                        >
                          {course.description}
                        </p>
                        <p style={{ margin: "0.5rem 0rem" }}>
                          <b>學生人數:</b> {course.students.length}
                        </p>
                        <p style={{ margin: "0.5rem 0rem" }}>
                          <b>課程價格:</b> {course.price}
                        </p>
                        <p style={{ margin: "0.5rem 0rem" }}>
                          <b>課程日期:</b> {course.courseDate}
                        </p>
                        <p style={{ margin: "0.5rem 0rem" }}>
                          <b>課程時間:</b> {course.courseTime}
                        </p>
                        <p style={{ margin: "0.5rem 0rem" }}>
                          <b>課程講師:</b> {course.instructor.username}
                        </p>
                      </div>
                      <button
                        id={course._id}
                        className="btn btn-dark btn-lg"
                        onClick={handleEnroll}
                      >
                        報名課程
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      {currentUser &&
        currentUser.user.role == "instructor" &&
        courseData &&
        courseData.length != 0 && (
          //登入者為講師會看到的畫面
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="about-header p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
              <div className="container-fluid">
                <div className="row align-items-center">
                  {/* 左邊：文字內容 */}
                  <div className="col-md-8">
                    <h4 className="display-5 fw-bold">課程總覽</h4>
                    <p className="fs-6">
                      {currentUser?.user?.username || ""}{" "}
                      老師您好，這裡是《下班上課趣》的課程總覽頁面，
                      <br />
                      您可以瀏覽所有在本站已開設的課程（包含其他講師的課程）。
                    </p>
                  </div>

                  {/* 右邊：圖片 */}
                  <div className="col-md-4 d-none d-md-flex justify-content-end p-5">
                    <img
                      src={addCourse3}
                      alt="講師課程"
                      className="img-fluid"
                      style={{ maxHeight: "150px", width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {courseData.map((course, instructor) => {
                return (
                  <div
                    key={course._id}
                    className="card"
                    style={{
                      width: "19.7rem",
                      flexWrap: "wrap",
                      padding: "0.5rem",
                      margin: "0rem",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>課程名稱:</b> <br />
                        {course.title}
                      </h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text"
                      >
                        {course.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        <b>學生人數:</b> {course.students.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        <b>課程價格:</b> {course.price}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        <b>課程日期:</b> {course.courseDate}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        <b>課程時間:</b> {course.courseTime}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        <b>課程講師:</b> {course.instructor.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

export default AllCourseComponent;
