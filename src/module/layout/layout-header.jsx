import {Group, Image} from "@mantine/core";
import React from "react";
import LayoutHeaderNavigation from "./layout-header-navigation";
import LayoutHeaderProfile from "./layout-header-profile";
import logo from '../../assets/images/logo.png'

export default function LayoutHeader() {
    return (
        <div className={'layout-header'}>
            <LayoutHeaderNavigation />
            <LayoutHeaderProfile />
        </div>
    )
}