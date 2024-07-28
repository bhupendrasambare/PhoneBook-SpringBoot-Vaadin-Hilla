import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './route';
import 'bootstrap/dist/css/bootstrap.css';
import './themes/phone-book/styles.css'

createRoot(document.getElementById('outlet')!).render(createElement(RouterProvider, { router }));