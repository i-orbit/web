import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Login from './modules/login/login'
import Layout from './modules/layout/layout'
import reportWebVitals from './reportWebVitals';
import {http} from "./utils/request";
import {MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import {ModalsProvider} from "@mantine/modals";

window.$http = http;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider withNormalizeCSS withGlobalStyles>
        <ModalsProvider>
            <Notifications position="top-center"/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </ModalsProvider>
    </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
