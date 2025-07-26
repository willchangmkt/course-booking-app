// 基本上就是一個form，告訴你有要填用戶名稱、電子信箱、密碼、身分(只能填教練或學生)
import React, { useState } from "react";
// 導入重新導向的hook
import { useNavigate } from "react-router-dom";
// 導入做登入註冊等等用的功能性服務
import AuthService from "../services/auth.service";
import register1 from "./img/register1.svg";

const RegisterComponent = () => {
  // 拿到useNavigate() 回傳的物件
  const navigate = useNavigate();
  console.log(navigate);
  // 製作四個state
  let [username, setUsername] = useState("");
  let [birthday, setBirthday] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  // 顯示錯誤訊息用
  let [message, setMessage] = useState("");

  // 只要handleUsername 有改變就要執行setUsername()讓他變成e.target.value
  // 下面三個同上
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  //註冊時所需的資料
  const handleRegister = () => {
    // 使用上面import 的AuthService
    // 所謂的handleRegister 就是讓AuthService他去幫我們執行register
    // 這四個參數在RegisterComponent裡面都是state，只要改變下面四個input 四個state都會跟著改
    // AuthService.register本身是async Fn，他會return 一個promise 給我們，所以可以.then，當然也可用await寫
    AuthService.register(username, birthday, email, password, role)
      .then(() => {
        window.alert("恭喜您！註冊成功。您現在將被導向到登入頁面");
        navigate("/login");
      })
      // 註冊失敗
      .catch((e) => {
        // console.log(e);
        setMessage(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div className="p-3 mb-3 bg-accent-custom rounded-3  shadow-bk">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* 左側文字說明 */}
            <div className="col-md-8">
              <h4 className="display-5 fw-bold">加入下班上課趣</h4>
              <p className="fs-6">
                不論你是 <strong>學員</strong> 還是 <strong>講師</strong>
                ，都非常歡迎您加入我們。
                <br />
                一起來感受下班後的有趣生活。
              </p>
            </div>

            {/* 右側圖片 */}
            <div className="col-md-4 d-none d-md-flex justify-content-end py-5">
              <img
                src={register1}
                alt="about gym"
                className="img-fluid"
                style={{ maxHeight: "150px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* 顯示錯誤訊息的地方 */}
        {/* 如果 message 是 falsy value 的話 就不會顯示任何的值*/}
        {/* message預設是empty string  是falsy value 直到在handleRegister 裡面setMessage 寫了一些訊息之後 前面變成true 才會顯示後面的部分*/}
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            // 只要input 有改變，就要執行
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="birthday">生日：</label>
          <input
            onChange={handleBirthday}
            type="date"
            className="form-control"
            name="birthday"
            placeholder="1993/05/13"
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
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份：</label>
          <select onChange={handleRole} className="form-control" name="role">
            <option value="" disabled selected>
              請選擇註冊身份
            </option>
            <option>student</option>
            <option>instructor</option>
          </select>
        </div>
        <br />
        {/* 只要按下註冊會員，就要處理事件 */}
        <button onClick={handleRegister} className="btn btn-dark">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
