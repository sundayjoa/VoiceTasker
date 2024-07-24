import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Icon from './images/ac_unit_icon.png';
import AppRouter from './AppRouter';


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

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppRouter tab = "home" />);

reportWebVitals();
