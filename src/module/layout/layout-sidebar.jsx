import {NavLink, ScrollArea} from "@mantine/core";
import {IconChevronRight, IconFingerprint} from "@tabler/icons-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const __CHILD_OFFSET__ = 28;

export default function LayoutSidebar() {
    const menus = [
        {url: '/backstage/tenants', name: '租户管理', id: '1'},
        {url: '/backstage/features', name: '功能配置', id: '2'},
        {url: '/backstage/system-properties', name: '系统属性配置', id: '3'}
    ]
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const items = menus.map((link) => (
        <NavLink
            label={link.name}
            leftSection={<IconFingerprint size="1rem" stroke={1.5}/>}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl"/>}
            childrenOffset={__CHILD_OFFSET__}
            key={link.id}
            active={active === link.id}
            variant="filled"
            onClick={(event) => {
                event.preventDefault();
                setActive(link.id);
                navigate(link.url);
            }}
        ></NavLink>
    ));

    return (
        <ScrollArea className={'layout-sidebar'} type={"never"}>
            {items}
        </ScrollArea>
    )
}