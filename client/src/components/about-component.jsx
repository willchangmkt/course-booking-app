import React from "react";
import about1 from "./img/about1.svg";
import react1 from "./img/react1.svg";
import backend1 from "./img/backend1.svg";
import "./style/AboutComponent.css";

const AboutComponent = () => {
  return (
    <div className="about-container">
      {/* 原本 */}
      <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* 左側：標題與文字說明 */}
            <div className="col-md-8">
              <h4 className="display-5 fw-bold">關於《下班上課趣》</h4>
              <p className="fs-6">
                《下班上課趣》是一個由我獨立開發的課程報名平台 Side Project，
                專為想在下班後充實自我的使用者設計。
                <br />
                使用者可以依照需求註冊為 <b>
                  學員
                </b> 報名喜歡的課程，或是註冊為 <b>講師</b> 發布並管理課程內容。
              </p>
            </div>

            {/* 右側：圖片靠右 */}
            <div className="col-md-4  d-none d-md-flex justify-content-end py-5">
              <img
                src={about1}
                alt="about gym"
                className="img-fluid"
                style={{ maxHeight: "150px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 原本 */}

      <div className="about-content">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4  d-none d-md-flex align-items-center">
              <img
                src={react1}
                className="img-fluid rounded-start"
                alt="前端網站"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">前端網站</h3>
                <h5 className="card-title">Front-end / 前端技術</h5>
                <ul className="card-text">
                  <li>採用 React 作為前端框架開發整體網頁</li>
                  <li>
                    圖片素材來源：unDraw（免費授權插畫網站）、Freepik（免費授權圖片網站）
                  </li>
                  <li>使用 Axios 向後端發送請求並取得資料（data fetching）</li>
                </ul>
                <p className="card-text">
                  <small className="text-body-secondary">
                    若對前端設計或功能有任何建議，歡迎來信與我分享 👉
                    yuan625@gmail.com
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4  d-none d-md-flex align-items-center">
              <img
                src={backend1}
                className="img-fluid rounded-start"
                alt="後端服務"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">後端服務</h3>
                <h5 className="card-title">Back-end / 後端技術</h5>
                <ul className="card-text">
                  <li>使用 Node.js + Express 搭建後端伺服器</li>
                  <li>資料庫採用 MongoDB</li>
                  <li>架構設計遵循 RESTful API 標準</li>
                </ul>
                <p className="card-text">
                  <small className="text-body-secondary">
                    若您對網站的後端邏輯或架構有任何想法或問題，也非常歡迎來信交流
                    👉 yuan625@gmail.com
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
