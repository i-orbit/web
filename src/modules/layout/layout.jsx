import AuthorizationService from "../../utils/authorization.service";
import LayoutHeader from "./layout-header";
import LayoutSidebar from "./layout-sidebar";
import LayoutContent from "./layout-content";
import './layout.scss'

export default function Layout() {
    const user = AuthorizationService.getAuthorizedUser();
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