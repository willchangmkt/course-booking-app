#  Course Booking Website — 課程預約網站 Side Project

# 作品說明
這是一個使用 MERN Stack（MongoDB、Express、React、Node.js）打造的課程預約網站 Side Project，採用 RESTful Routing 設計、前後端分離架構。

使用者可選擇身分註冊與登入：
* 學員：瀏覽、搜尋、報名、取消課程
* 講師：上架、修改、刪除自己的課程，並可瀏覽所有課程

## 功能

- 導覽列（Nav Bar）：位於頁面上方，方便導覽網站內容。
- 關於本站：簡要介紹本網站以及所使用的技術與架構。  
- 註冊會員：使用者可選擇註冊為學員或講師。  
- 會員登入 / 登出：可進行帳號登入與登出操作。  
- 全部課程：講師可瀏覽所有課程，學員可報名課程。  
- 個人頁面：顯示使用者身份與基本會員資料。  
- 你的課程：學員可查看與取消已報名課程，講師可修改與刪除自己開設的課程。  
- 搜尋課程：學員可依課程名稱搜尋欲報名的課程。  
- 發布課程：講師可新增並上架新課程。


## 畫面
![CBProject1](https://i.meee.com.tw/HbX6lue.jpg)
![CBProject2](https://i.meee.com.tw/MVQseZi.jpg)
![CBProject3](https://i.meee.com.tw/djbI8ei.jpg)
![CBProject4](https://i.meee.com.tw/5OzJ46T.jpg)
![CBProject5](https://i.meee.com.tw/7BUnjHy.jpg)
![CBProject6](https://i.meee.com.tw/Md7zMWa.jpg)
![CBProject7](https://i.meee.com.tw/R4ugwJL.jpg)

## 操作影片
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/9Qw5UW6WDbo/maxresdefault.jpg)](https://youtu.be/9Qw5UW6WDbo)

## 安裝
Node.js 版本建議為: v20.12.0 以上
React.js 版本建議為: v18.3.1 以上

### 安裝套件
請分別進入 `server` 與 `client` 目錄執行：`npm install`

**前端套件 (client)：**

- axios@1.9.0
- bootstrap@5.3.7
- react@19.1.0
- react-bootstrap@2.10.10
- react-dom@19.1.0
- react-router-dom@7.6.2
- react-scripts@5.0.1
- web-vitals@2.1.4

**後端套件 (server)：**
- bcrypt@6.0.0
- cors@2.8.5
- dotenv@16.5.0
- express@5.1.0
- joi@17.13.3
- jsonwebtoken@9.0.2
- mongoose@8.15.1
- passport@0.7.0
- passport-jwt@4.0.1
- passport-local@1.0.0


### 環境變數設定
請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

1. 確保已安裝 [Node.js](https://nodejs.org/)
2. 開啟終端機並導航至 `server` 目錄
3. 執行以下指令啟動後端伺服器：node index.js
4. 後端伺服器將於 `http://localhost:8080` 運行
5. 開啟另一個終端機並導航至 `client` 目錄
6. 執行以下指令啟動前端應用：npm start
7. 前端應用將於 `http://localhost:3000` 開啟


### 開啟專案
專案運行後，在瀏覽器輸入以下即可看到畫面
http://localhost:3000/

### 環境變數說明

```env
PASSPORT_SECRET= #自行定義的本地驗證secret
```

### 資料夾說明
- client - 前端資料放置處
  - modules - 模組放置處
  - public - 靜態資源放置處(font-awesome)
  - src - 資源放置處
    - component - 網頁頁面component放置處
    - img - 圖片放置處
    - style - 網頁樣式放置處
    - service - 連接後端auth & course routes
- server - 後端資料放置處
  - config - 驗證方法放置處
  - model - 課程Schema及User Schema放置處
  - modules - 模組放置處
  - routes - 網頁路徑放置處

### 專案技術
- Node.js v20.12.0
- React.js v18.3.1 
- Bootstrap v5.3.7
- font-awesome v6.5.2

## 聯絡作者
您可以透過以下的方式與我聯繫
我的信箱: yuan625@gmail.com
