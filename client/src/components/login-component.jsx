import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import login1 from "../components/img/login1.svg";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // 顯示錯誤訊息用
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //登入本地驗證
  const handleLogin = async () => {
    try {
      // 用email, password 這兩個state 做登入
      // AuthService.login(email, password)會return 一個promise
      let response = await AuthService.login(email, password);
      // 把從伺服器得到的response 存到localStorage
      // user 的key 對上JSON.stringify(response.data) data 物件 用localStorage 存起來
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功！將重新導向至個人資料頁面。");
      // 在重新導向之前設定目前的使用者是誰
      // AuthService.getCurrentUser() 就是 localStorage.setItem("user", JSON.stringify(response.data)); 所設定的值
      // 系統就會有一個setCurrentUser 的值，他就會不斷追蹤目前我們的currentUser 是誰
      // 如有登入成功，就會設定setCurrentUser的值就要等於localStorage設定過的值

      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* 左側標題與說明 */}
            <div className="col-md-8">
              <h4 className="display-5 fw-bold">登入下班上課趣</h4>
              <p className="fs-6">
                已經有學員/講師身分了嗎?
                <br />
                快點來登入，一起來上課吧。
              </p>
            </div>

            {/* 右側圖片，垂直置中 */}
            <div className="col-md-4 d-none d-md-flex justify-content-end py-5">
              <img
                src={login1}
                alt="login illustration"
                style={{ maxHeight: "150px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          <div className="form-group">
            <label htmlFor="username">電子信箱：</label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
              placeholder="請輸入電子信箱"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">密碼：</label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              name="password"
              placeholder="請輸入密碼"
            />
          </div>
          <br />
          <div className="form-group">
            <button onClick={handleLogin} className="btn btn-dark btn-block">
              <span>登入系統</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
