import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ۱. ابزارهای اتصال ریداکس رو ایمپورت می‌کنیم
import { Provider } from 'react-redux'
import { store } from './store/store.jsx' // حواست به مسیرِ فایلی که ساختی باشه

createRoot(document.getElementById('root')).render(
  // ۲. کل اپلیکیشن رو داخل Provider قرار می‌دیم و store رو بهش پاس می‌دیم
  <Provider store={store}>
    <App />
  </Provider>
)
