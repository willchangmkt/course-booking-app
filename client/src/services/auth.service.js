import axios from "axios";
// 連結到後端伺服器
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  // 登入的話要提供這些資料
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  // 登出的話就是把存在localStorage 的資料刪除，這樣子寫在login-component 裡面的
  //   localStorage.setItem("user", JSON.stringify(response.data)); 就會不見
  logout() {
    localStorage.removeItem("user");
  }
  // 註冊的話要提供參數這些資料
  register(username, birthday, email, password, role) {
    // 執行axios.post，post 到後端進行註冊的route，之前也有用postman驗證過
    // 如果要用post 的method 的話，資料要放在要post的url 後面，用大括號包起來
    // axios.post會return 一個promise ，所以直接return 就好
    // 如果對AuthService去執行register 的話就會自動post 到api /register，並帶入{}內的四個參數
    // 如果註冊成功的話就會return 一個promise，這個promise 就會變成fulfill
    return axios.post(API_URL + "/register", {
      username,
      birthday,
      email,
      password,
      role,
    });
  }
  // 登入之後希望React 可以知道目前登入的人是誰
  // 拿到local storage 儲存的使用者
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
// 創建一個AuthService() 所製作出來的物件，執行constructor
export default new AuthService();
