import {Group, rem} from "@mantine/core";
import {createStyles} from '@mantine/emotion'
import React, {useState} from "react";
import classes from "./layout.module.less";

const useStyles = createStyles((theme, _, u) => ({
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        [u.dark] {
            color: var(--mantine-color-dark-0);
        },
        [u.light] {

        },
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            colorScheme: "light",
            backgroundColor: theme.primaryColor,
            color: theme.primaryColor,
        },
    },
}));

export default function LayoutHeaderNavigation() {
    const menus = [
        {url: 'http://baidu.com', name: '首页', id: '1'},
        {url: 'http://google.com', name: '配置管理', id: '2'},
        {url: 'http://github.com', name: '系统管理', id: '3'}
    ]
    const [active, setActive] = useState('');
    // const {classes, cx} = useStyles();
    const items = menus.map((link) => (
        <a
            key={link.id}
            href={link.url}
            className={cx(classes.link, {[classes.linkActive]: active === link.id})}
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