import React from "react";
import notFound1 from "./img/notFound1.svg";

//網址輸入錯誤的頁面
const NotFound = () => {
  return (
    <div className="about-gym-header p-3 mb-3 bg-secondary-subtle rounded-3">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", textAlign: "center" }}
      >
        <img
          src={notFound1}
          alt="notFound"
          style={{ width: "20vw", maxWidth: "800px", marginBottom: "1.5rem" }}
        />
        <h4 className="fw-bold">Oops! 沒有這個頁面。</h4>
      </div>
    </div>
  );
};

export default NotFound;
