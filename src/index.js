import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Icon from './images/ac_unit_icon.png';


document.title = "Do It!";

const changeFavicon = (link) => {
  let favicon = document.querySelector('link[rel="icon"]');
  if (favicon !== null) {
    favicon.href = link;
  } else {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = link;
    document.head.appendChild(favicon);
  }
};

// 새로운 파비콘 경로 설정
changeFavicon(Icon);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
