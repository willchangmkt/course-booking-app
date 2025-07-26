import React from "react";
import { useNavigate } from "react-router-dom";
import homepage2 from "./img/homepage2.jpg";
import homepage3 from "./img/homepage3.jpg";
import homepage4 from "./img/homepage4.jpg";
import homepage1 from "./img/homepage1.jpg";
import homepage5 from "./img/homepage5.svg";
import homepage6 from "./img/homepage6.svg";
import banner1 from "./img/banner1.jpg";
import banner2 from "./img/banner2.jpg";
import banner3 from "./img/banner3.jpg";
import "./style/style.css";
import { useEffect } from "react";
import * as bootstrap from "bootstrap";

const HomeComponent = () => {
  const navigate = useNavigate();

  //導向所有課程
  const handleAddCourse = () => {
    window.alert("一起來看看有哪些課程吧!");
    navigate("/allCourse");
  };

  //導向張貼課程
  const handlePost = () => {
    window.alert("開始來上架新課程吧!");
    navigate("/postCourse");
  };

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  }, []);
  
  //這是首頁
  return (
    <main>
      <div className="container py-4">
        <div className="py-4 rounded-3">
          {/* 輪播區塊 */}
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* 輪播指示器 */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            {/* 輪播圖片與文字start  */}
            <div className="carousel-inner ">
              {[banner1, banner2, banner3].map((imgSrc, index) => (
                <div
                  key={index}
                  className={`carousel-item position-relative rounded-3 overflow-hidden ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <img
                    src={imgSrc}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />

                  {/* 半透明遮罩 */}
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

                  {/* 置中文字 */}
                  <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                    <h1>歡迎來到《下班上課趣》</h1>
                    <p className="fs-5">
                      這裡是一個讓上班族下班後輕鬆預約喜歡課程的網站。
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 上/下一張按鈕 */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* 輪播圖片與文字end  */}
        </div>
        <div className="p-5 mb-4 bg-primary-custom rounded-3 shadow-bk">
          <div className="container-fluid text-center">
            <br />

            <div className="card mx-auto w-100 " style={{ maxWidth: "720px" }}>
              <div className="card-body">
                <h5 className="card-title">
                  使用者可依身份選擇登入為 <b>學員</b> 或 <b>講師</b>：
                </h5>
                <p className="card-text">
                  <i className="fa-solid fa-book-open-reader"></i> <b>學員</b>{" "}
                  可以瀏覽並預約下班後的各類興趣課程
                  <br />
                  <i className="fa-solid fa-chalkboard-user"></i> <b>講師</b>{" "}
                  可新增、編輯與刪除自己開設的課程內容
                </p>
              </div>
            </div>

            <hr />
            <p className="fw-bold fs-5">本網站為個人 Side Project</p>
            <p className="fs-5">
              前端採用 React 框架開發完成，後端使用 Node.js + Express.js。
            </p>
          </div>
        </div>
        {/* 四個圈圈s */}

        <div className="container-fluid p-5 text-center  d-none d-md-flex">
          <div className="col-md-12 d-flex justify-content-between flex-wrap gap-3">
            <button
              type="button"
              className="border-0 bg-transparent p-0"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              title=""
              data-bs-content="放慢腳步，休息一下。"
              data-bs-placement="top"
            >
              <div className="flex-grow-1 mx-2">
                <img src={homepage1} className="uniform-circle-img" alt="..." />
                <div className="card-body">
                  <p className="card-text mt-4">下班後來點放鬆</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              className="border-0 bg-transparent p-0"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              title=""
              data-bs-content="讓生活多一點成就感。"
              data-bs-placement="top"
            >

              <div className="flex-grow-1 mx-2">
                <img src={homepage2} className="uniform-circle-img" alt="..." />
                <div className="card-body mt-4">
                  <p className="card-text">學會新技能</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              className="border-0 bg-transparent p-0"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              title=""
              data-bs-content="不只是上課，還能認識有趣的同伴。"
              data-bs-placement="top"
            >

              <div className="flex-grow-1 mx-2">
                <img src={homepage3} className="uniform-circle-img" alt="..." />
                <div className="card-body">
                  <p className="card-text mt-4">遇見同好</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              className="border-0 bg-transparent p-0"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              title=""
              data-bs-content="工作之外，打造更好的自己。"
              data-bs-placement="top"
            >
              <div className="flex-grow-1 mx-2">
                <img src={homepage4} className="uniform-circle-img" alt="..." />
                <div className="card-body">
                  <p className="card-text mt-4">為自己升級</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 四個圈圈e */}
        <div className="row align-items-md-stretch">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="bg-primary-custom p-5 text-dark bg-opacity-50 border rounded-3 shadow-bk">
              <div className="row align-items-center">

                {/* 左邊：文字與按鈕 */}
                <div className="col-md-8">
                  <h2>我是學員</h2>
                  <p>
                    無論是瑜伽、攝影、烘焙還是外語練習
                    <br />
                    一起在下班後開啟充實又快樂的學習時光！
                  </p>
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={handleAddCourse}
                  >
                    立即選課
                  </button>
                </div>

                {/* 右邊：圖片 */}
                <div className="col-md-4  d-none d-md-flex justify-content-end">
                  <img
                    src={homepage6}
                    alt="學員圖片"
                    className="img-fluid uniform-circle-img"
                    style={{ maxHeight: "120px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 bg-primary-custom bg-opacity-10 border rounded-3 shadow-bk">
              <div className="row align-items-center">
                {/* 左側：文字與按鈕 */}
                <div className="col-md-8">
                  <h2>我是講師</h2>
                  <p>
                    您可以在這裡發揮專業，上架課程！
                    <br />
                    推廣課程給更多人知道。
                  </p>
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={handlePost}
                  >
                    開設課程
                  </button>
                </div>

                {/* 右側：圖片 */}
                <div className="col-md-4  d-none d-md-flex justify-content-end">
                  <img
                    src={homepage5}
                    alt="講師圖片"
                    className="img-fluid uniform-circle-img"
                    style={{ maxHeight: "120px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default HomeComponent;
