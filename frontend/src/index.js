import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.css';
import './css/font-awesome.css';
import './css/themify-icons.css';
import './css/style.css';
import './css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/custom-style.css';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./consumer/components/common/ScrollToTop";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);

