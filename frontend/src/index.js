import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/themify-icons.css';
import './scss/style.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/custom-style.css';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);

