# Assignment 1 - BuiYenNhi-SE18D04

**News Management System (NMS)** – Chỉ làm **UI (Frontend)**.  
Assignment 2 sẽ kết nối backend + database.

## Công nghệ

- **React** + **Vite**
- **react-router-dom** (routing)
- Dữ liệu **mock** trong `src/data/` (chưa gọi API)

## Cấu trúc thư mục

```
BuiYenNhi-SE18D04/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── layout/          # Layout admin (Sidebar, Header, Layout)
│   ├── data/                # Mock data (users, categories, news, tags)
│   ├── pages/
│   │   ├── Login.jsx        # Trang đăng nhập
│   │   └── admin/           # Quản lý tài khoản, danh mục, tin tức
│   ├── styles/              # CSS chung (index, Login, AdminPages)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Chạy project

```bash
npm install
npm run dev
```

Đăng nhập: **Admin** / **Admin** → vào trang admin.

## Chức năng (UI)

- **Login:** Admin / Admin → redirect admin
- **Quản lý tài khoản:** CRUD + Tìm kiếm (popup Create/Update, confirm Delete)
- **Quản lý danh mục:** CRUD + Tìm kiếm
- **Quản lý tin tức:** CRUD + Tìm kiếm

Dữ liệu đang dùng mock trong state, chưa gọi backend. Assignment 2 sẽ thay bằng axios + REST API.
