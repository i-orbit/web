import {NavLink, ScrollArea} from "@mantine/core";
import {IconFingerprint, IconGauge} from "@tabler/icons-react";
import React, {useState} from "react";

const __CHILD_OFFSET__ = 28;

export default function LayoutSidebar() {
    const menus = [
        {url: '/tenants', name: '租户管理', id: '1'},
        {url: 'http://google.com', name: '功能配置', id: '2'}
    ]
    const [active, setActive] = useState('');
    const items = menus.map((link) => (
        <NavLink
            label={link.name}
            icon={<IconFingerprint size="1rem" stroke={1.5}/>}
            childrenOffset={__CHILD_OFFSET__}
            key={link.id}
            active={active === link.id}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.id)
                window.location.href = link.url
            }}
        ></NavLink>
    ));

    return (
        <ScrollArea className={'layout-sidebar'} type={"never"}>
            {items}
            {/*<NavLink*/}
            {/*    label="Second parent link"*/}
            {/*    icon={<IconFingerprint size="1rem" stroke={1.5}/>}*/}
            {/*    childrenOffset={__CHILD_OFFSET__}*/}
            {/*>*/}
            {/*    <NavLink label="First child link"/>*/}
            {/*    <NavLink label="Second child link"/>*/}
            {/*    <NavLink label="Third child link"/>*/}
            {/*</NavLink>*/}
        </ScrollArea>
    )
}