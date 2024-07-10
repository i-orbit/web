import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./module/layout/layout";
import TenantIndex from "./module/tenant";
import Login from "./module/login/login";
import React from "react";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path={`/tenants`} element={<TenantIndex/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
