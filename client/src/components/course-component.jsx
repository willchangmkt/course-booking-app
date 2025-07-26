import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import course1 from "./img/course1.svg";
import course2 from "./img/course2.svg";
import courseService from "../services/course.service";
import authService from "../services/auth.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  //導向修改課程畫面(講師操作)
  const handleUpdateCourse = (courseId) => {
    navigate(`/updateCourse/${courseId}`);
  };

  // 專門用來「重新取得課程資料」的方法
  const fetchCourses = () => {
    // 取得目前使用者的 _id
    const _id = currentUser.user._id;

    // 如果使用者是講師，取得他開設的所有課程
    if (currentUser.user.role === "instructor") {
      courseService
        .get(_id)
        .then((data) => setCourseData(data.data)) // 把取得的課程資料存入 state
        .catch((e) => console.log(e)); // 若失敗則印出錯誤
    }

    // 如果使用者是學生，取得他已註冊的所有課程
    else if (currentUser.user.role === "student") {
      courseService
        .getEnrolledCourses(_id)
        .then((data) => setCourseData(data.data)) // 存入 state
        .catch((e) => console.log(e)); // 若失敗則印出錯誤
    }
  };

  //講師可以刪除課程
  const handleDeleteCourse = (e) => {
    const courseId = e.target.id;
    if (window.confirm("您確定要刪除這個課程嗎？按下確定後即刪除課程!")) {
      console.log("正在刪除課程");
      courseService
        .deleteCourse(courseId)
        .then((response) => {
          console.log(response.data.message); // "課程已被成功刪除。"
          window.alert(response.data.message);
          fetchCourses();
        })
        .catch((error) => {
          console.error(error.response.data.message);
          window.alert(error.response.data.message || "刪除課程時發生錯誤。");
        });
    }
  };

  //導向添加課程畫面
  const handleAddCourse = () => {
    navigate("/allCourse");
  };

  //退出註冊的課程(學生操作)
  const handleQuit = (e) => {
    courseService
      .quit(e.target.id)
      .then(() => {
        window.alert("課程退出成功!");
        setCurrentUser(authService.getCurrentUser());
        navigate("/course");
      })
      .catch((e) => {
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

  //使用者是講師可以查看已發佈的課程，學員可以註冊課程
  useEffect(() => {
    if (currentUser && currentUser.user) {
      const _id = currentUser.user._id;
      if (currentUser.user.role === "instructor") {
        courseService
          .get(_id)
          .then((data) => {
            console.log(data.data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "student") {
        courseService
          .getEnrolledCourses(_id)
          .then((data) => {
            console.log(data.data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  // 如果沒有登入，顯示請先登入的頁面
  if (!currentUser) {
    return (
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
    );
  }

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser &&
        currentUser.user &&
        currentUser.user.role === "instructor" && (
          <div>
            <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
              <div className="container-fluid">
                <div className="row align-items-center">
                  {/* 左側文字區塊 */}
                  <div className="col-md-8">
                    <h4 className="display-5 fw-bold">
                      {" "}
                      {currentUser?.user?.username || "您"} 的開課列表
                    </h4>
                    <p>
                      {currentUser?.user?.username || ""}{" "}
                      老師您好，這是您目前在《下班上課趣》所開設的課程。
                      <br />
                      在這裡可以進行課程修改、刪除課程，並確認目前學生人數。
                    </p>
                  </div>

                  {/* 右側圖片區塊 */}
                  <div className="col-md-4  d-none d-md-flex justify-content-end py-5">
                    <img
                      src={course1}
                      alt="講師課程圖"
                      className="img-fluid"
                      style={{ maxHeight: "150px", width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {currentUser &&
        currentUser.user &&
        currentUser.user.role === "instructor" &&
        courseData &&
        courseData.length !== 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => {
              return (
                <div
                  key={course._id}
                  className="card"
                  style={{
                    width: "19.7rem",
                    flexWrap: "wrap",
                    padding: "0.5rem",
                    margin: "0.6rem",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title"><b>課程名稱:</b> <br />{course.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }} className="card-text">
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
                      <b>課程講師</b>: {course.instructor.username}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleUpdateCourse(course._id)}
                  >
                    修改課程內容
                  </button>
                  <br />
                  <button
                    id={course._id}
                    className="btn btn-outline-danger"
                    onClick={handleDeleteCourse}
                  >
                    刪除課程
                  </button>
                </div>
              );
            })}
          </div>
        )}

      {currentUser &&
        currentUser.user &&
        currentUser.user.role === "student" && (
          <div>
            <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  {/* 左側文字區塊 */}
                  <div className="col-md-8">
                    <h4 className="display-5 fw-bold">
                      {" "}
                      {currentUser?.user?.username || "您"} 的修課列表
                    </h4>
                    <p>
                      {currentUser?.user?.username || ""}{" "}
                      同學您好，以下是您目前已經註冊的課程。
                      <br />
                      想查閱更多課程並報名，請點選新增課程按鈕。
                    </p>
                    <button className="btn btn-dark" onClick={handleAddCourse}>
                      新增課程
                    </button>
                  </div>

                  {/* 右側圖片區塊 */}
                  <div className="col-md-4  d-none d-md-flex justify-content-end">
                    <img
                      src={course2}
                      alt="學員課程圖"
                      className="img-fluid"
                      style={{ maxHeight: "150px", width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {currentUser &&
        currentUser.user &&
        currentUser.user.role === "student" &&
        courseData &&
        courseData.length !== 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => {
              return (
                <div
                  key={course._id}
                  className="card"
                  style={{
                    width: "19.7rem",
                    flexWrap: "wrap",
                    padding: "0.5rem",
                    margin: "0.6rem",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title"><b>課程名稱:</b> <br />{course.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }} className="card-text">
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
                    className="btn btn-outline-secondary btn-lg"
                    onClick={handleQuit}
                  >
                    退出課程
                  </button>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default CourseComponent;
