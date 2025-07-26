import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import logo from "./img/logo.png";

//導覽列可執行登出功能
const NavComponent = ({ currentUser, setCurrentUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.alert("登出成功!");
    // 有登出的話，就讓在app.js 裡面的currentUser 的state變成null
    setCurrentUser(null);
    // 登出後關閉導覽列
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
          {/* 手機版Logo */}
          <div className="d-block d-lg-none mx-auto">
            <Link to="/" className="text-decoration-none" onClick={closeNav}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", width: "auto" }}
              />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
            {/* 左邊的選單 */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeNav}>
                  <i className="fa-regular fa-circle-user"></i> 關於此網站
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allCourse" onClick={closeNav}>
                  <i className="fa-solid fa-table-list"></i> 全部課程
                </Link>
              </li>
            </ul>

            {/* 中間 LOGO */}
            <div className="position-absolute top-50 start-50 translate-middle text-center d-none d-lg-block">
              <Link to="/" className="text-decoration-none">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "60px", width: "auto" }}
                />
              </Link>
            </div>

            {/* 右邊的登入／登出選單 */}
            <ul className="navbar-nav ms-auto">
              {!currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" onClick={closeNav}>
                      <i className="fa-solid fa-user-plus"></i> 註冊會員
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeNav}>
                      <i className="fa-solid fa-door-open"></i> 會員登入
                    </Link>
                  </li>
                </>
              )}

              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile" onClick={closeNav}>
                      <i className="fa-regular fa-address-card"></i> 個人頁面
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/course" onClick={closeNav}>
                      <i className="fa-solid fa-list"></i> 你的課程
                    </Link>
                  </li>
                  {currentUser.user.role === "instructor" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/postCourse" onClick={closeNav}>
                        <i className="fa-solid fa-user-plus"></i> 發布課程
                      </Link>
                    </li>
                  )}
                  {currentUser.user.role === "student" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/enroll" onClick={closeNav}>
                        <i class="fa-solid fa-magnifying-glass"></i> 搜尋課程
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      <i className="fa-solid fa-right-from-bracket"></i> 登出
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;