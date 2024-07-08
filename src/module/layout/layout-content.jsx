import {Outlet} from 'react-router-dom'

export default function LayoutContent() {
    return (
        <div className={'layout-content'}>
            <Outlet></Outlet>
        </div>
    )
}