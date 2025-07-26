// 這個 不是 React 的 class component，
// 而是一個 普通的 JavaScript 類別（class），
// 用來封裝跟 Course 有關的 API 呼叫邏輯，
// 屬於 service 層邏輯，與 UI 無關。

// 可以發現無論是哪一個route 都需要設定一個token 所以可以把確認token 的部分設成一個fn也可以 之後可以自己完成

import axios from "axios";
// 要post 到course 這個api
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  // 要製作新的課程 要給title, description, price 所以在這個CourseService 第一個可以做的動作就是post
  post(title, description, price, courseDate, courseTime) {
    // 要post 的話可能有token 也可能沒有
    let token;
    // 如果在localStorage 有user 的話就可以找到token
    if (localStorage.getItem("user")) {
      // 得到物
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // axios.post 會return 一個promise，所以直接return 就好

    return axios.post(
      API_URL,
      { title, description, price, courseDate, courseTime },
      // token 放在第三個參數，放一個物件，物件中設定一個headers 的屬性
      // 裡面放Authorization，裡面的值要放的就是token
      // 這樣axios.post就會直接在header 裡面設定Authorization是JWT
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //更新課程
  courseUpdate(_id, title, description, price, courseDate, courseTime) {
    console.log("Updating course with ID:", _id);
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/" + _id,
      { title, description, price, courseDate, courseTime },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //顯示所有課程
  getAllCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/", {
      headers: {
        Authorization: token,
      },
    });
  }

  // 使用學生id，找到學生註冊的課程
  getEnrolledCourses(_id) {
    // 這裡也要用到token，所以複製get(_id) 的程式碼
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 使用instructor id，來找到講師擁有的課程
  // 同樣要get 課程的話，要先得到token
  get(_id) {
    console.log("Fetching course with ID:", _id);
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 這樣就可以在一個http request 裡面 去包含token 然後把這個token 帶到後端
    // 後端就會去看我們的token 是不是可以使用的，然後就會根據我們的請求給予資料
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 學生找課程的功能，與server 中的courseRoute.js搭配服用
  getCourseByName(name) {
    // 拿到token
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // get 到API_URL "/findByName/" 加上我們給的名稱
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  //學生註冊課程
  // 跟sever 的 crouse-route 搭配服用
  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      // _id 就是要註冊的課程的id，因為這是一個post request，後面就要放要放的data，因為沒有所以放空物件
      // 接著再放headers
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //學生退出課程
  quit(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/quit/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //講師刪除課程
  deleteCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
