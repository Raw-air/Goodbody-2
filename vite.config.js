import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Goodbody-2/', // <--- 這裡非常重要！必須跟你的 GitHub 專案名稱一模一樣
})