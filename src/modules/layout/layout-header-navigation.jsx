import {createStyles, Group, rem} from "@mantine/core";
import React, {useState} from "react";

const useStyles = createStyles((theme) => ({
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
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
    const {classes, cx} = useStyles();
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
        <Group position="left" className={'layout-header-navigation'}>
            {items}
        </Group>
    )
}