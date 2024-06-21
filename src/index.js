import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {Notifications} from "@mantine/notifications";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import Login from "./module/login/login";
import Layout from "./module/layout/layout";
import './index.css';
import '@mantine/core/styles.css';

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
