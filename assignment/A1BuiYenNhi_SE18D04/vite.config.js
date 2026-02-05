import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Tự mở trình duyệt khi chạy npm run dev (dùng trình duyệt mặc định)
    // open: 'msedge', // Nếu muốn mở cụ thể Microsoft Edge thì dùng dòng này
  },
})
