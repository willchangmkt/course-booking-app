import { useNavigate } from "react-router-dom";
import profile1 from "./img/profile1.svg";

// 這個頁面就是要從props 裡面 拿到currentUser, setCurrentUser
const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  // // 一進來這個頁面就要讓他執行useEffect 裡面的callback FN
  // // 後面放一個empty array 代表說profile-component只要被渲染 就要讓他執行前面的 callbackFn
  // useEffect(() => {
  //   // 要做的事情就是執行setCurrentUser，要拿到AuthService.getCurrentUser()
  //   setCurrentUser(AuthService.getCurrentUser());
  // }, []);

  //格式化生日日期
  const formatDate = (dateString) => {
    if (!dateString) return "未提供";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  //顯示講師或學員註冊時的個人資料
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <div className="p-3 mb-3 bg-accent-custom rounded-3">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* 左側文字區塊 */}
                <div className="col-md-8">
                  <h4 className="display-5 fw-bold">上課趣・個人頁面</h4>
                  <p>親愛的會員，您尚未登入上課趣的會員系統。</p>
                </div>

                {/* 右側圖片區塊 */}
                <div className="col-md-4 d-none d-md-flex justify-content-end py-5">
                  <img
                    src={profile1}
                    alt="個人頁面"
                    className="img-fluid"
                    style={{ maxHeight: "150px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            在進入個人資料之前，您必須先登錄。
            <br />
            如果您已經登入，請重新整理此頁面。
          </div>
          <button
            style={{ margin: "0.5rem 0rem" }}
            className="btn btn-dark"
            onClick={handleLogin}
          >
            登入會員
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <div className="p-3 mb-3 bg-accent-custom rounded-3 shadow-bk">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* 左側文字區塊 */}
                <div className="col-md-8">
                  <h4 className="display-5 fw-bold">
                    {" "}
                    {currentUser?.user?.username || "您"} 的個人頁面
                  </h4>
                  <p>這裡是您在「上課趣」的個人資料頁面。</p>
                </div>

                {/* 右側圖片區塊 */}
                <div className="col-md-4 d-none d-md-flex justify-content-end p-5">
                  <img
                    src={profile1}
                    alt="個人資料"
                    className="img-fluid"
                    style={{ maxHeight: "150px", width: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 
          <h4>以下是 {currentUser?.user?.username || "您"} 的個人資料。</h4> */}

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>生日：{formatDate(currentUser.user.birthday)}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
