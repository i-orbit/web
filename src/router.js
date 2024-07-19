import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./module/layout/layout";
import TenantIndex from "./module/backstage/tenant";
import Login from "./module/login/login";
import React from "react";
import FeatureIndex from "./module/backstage/feature";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path={`/backstage/tenants`} element={<TenantIndex/>}/>
                    <Route path={`/backstage/features`} element={<FeatureIndex/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
