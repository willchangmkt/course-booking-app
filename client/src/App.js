import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import AllCourseComponent from "./components/allCourse-component";
import UpdateCourseComponent from "./components/updateCourse-component";
import AboutGymComponent from "./components/about-component";
import NotFound from "./components/notFound-component";
import "./components/style/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  // 我要知道目前登入的人是誰
  // 先假定目前來到這個profile-component 的時候current user 的state 是null
  // lifting 到這裡 讓其他所有的component 都可以使用(知道登出登入狀態以讓nav 可以改變)
  // 到這邊直接改成AuthService.getCurrentUser() 拿到目前的使用者是誰，這就是currentUser 預設的直
  //  CurrentUser()的state 是設定在app.js，App.js 每次開啟時都都會去找目前localStorage 儲存的是誰，然後把他設定成current user
  //  所以下面的Layout 本身，<LoginComponent/> <ProfileComponent/>都會收到這裡的影響
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComponent />} />
          {/* 會員註冊 */}
          <Route path="register" element={<RegisterComponent />} />

          <Route
            path="login"
            element={
              <LoginComponent
                // 如有登入成功也要設定目前的currentUser 是誰
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="course"
            element={
              <CourseComponent
                // 這兩個state 都用的到就繼續保留
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            // 這個route 就要跟 nav-component.js 裡面新增課程的<Link>的to="/postCourse""一樣
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="allCourse"
            element={
              <AllCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/updateCourse/:courseId"
            element={
              <UpdateCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route path="/about" element={<AboutGymComponent />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
