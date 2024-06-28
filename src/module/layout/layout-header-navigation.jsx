import {Group} from "@mantine/core";
import React, {useState} from "react";
import classes from "./layout.module.less";

export default function LayoutHeaderNavigation() {
    const menus = [
        {url: 'http://baidu.com', name: '首页', id: '1'},
        {url: 'http://google.com', name: '配置管理', id: '2'},
        {url: 'http://github.com', name: '系统管理', id: '3'}
    ]
    const [active, setActive] = useState('');
    const items = menus.map((link) => (
        <a
            key={link.id}
            href={link.url}
            className={`${classes.link} ${active === link.id ? classes['link-active'] : ''}`}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.id)
            }}
        >
            {link.name}
        </a>
    ));

    return (
        <Group position={"left"} className={'layout-header-navigation'}>
            {items}
        </Group>
    )
}