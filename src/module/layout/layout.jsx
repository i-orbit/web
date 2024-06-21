import LayoutHeader from "./layout-header";
import LayoutSidebar from "./layout-sidebar";
import LayoutContent from "./layout-content";
import './layout.less'

export default function Layout() {
    return (
        <div className={"layout-wrapper"}>
            <LayoutHeader/>
            <div className={'layout-center'}>
                <LayoutSidebar/>
                <LayoutContent/>
            </div>
        </div>
    )

}