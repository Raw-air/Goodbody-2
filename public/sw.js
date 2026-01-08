// 這是讓 Android 認可妳是 APP 的必要檔案
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // 這裡暫不處理快取，確保妳每次打開都是最新版
});