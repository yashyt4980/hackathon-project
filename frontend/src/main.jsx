import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Footer from './components/Footer'
import { Toaster } from "react-hot-toast";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
    <Toaster/>
  </React.StrictMode>
)