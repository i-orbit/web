import LayoutHeader from "./layout-header";
import LayoutSidebar from "./layout-sidebar";
import LayoutContent from "./layout-content";
import './layout.less'
import {useEffect} from "react";

export default function Layout() {
    useEffect(() => {
        document.title = "ORBIT-智慧物联管理平台"
    }, []);

    return (
        <div className={"layout-wrapper"}>
            <LayoutSidebar/>
            <LayoutHeader/>
            <LayoutContent/>
        </div>
    )

}