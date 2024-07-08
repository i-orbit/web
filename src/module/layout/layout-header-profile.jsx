import {Avatar, Group, Indicator, Menu, Text, UnstyledButton} from "@mantine/core";
import {
    IconBellRinging2Filled,
    IconCalendarCheck,
    IconChevronRight,
    IconKey,
    IconLogout,
    IconMessage,
    IconSettings,
    IconUserCog
} from "@tabler/icons-react";
import {forwardRef} from "react";
import AuthorizationService from "@common/authorization.service";

const UserButton = forwardRef(
    ({image, name, email, icon, ...others}, ref) => {
        return (
            <UnstyledButton
                ref={ref}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.md,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    '&:hover': {
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                })}
                {...others}
            >
                <Group wrap={true}>
                    <Indicator>
                        <Avatar src={image} radius="xl"/>
                    </Indicator>
                    <div style={{flex: 1, width: '130px'}}>
                        <Text size="sm" weight={500} truncate>
                            {name}
                        </Text>
                        <Text color="dimmed" size="xs" truncate>
                            {email}
                        </Text>
                    </div>
                    {icon || <IconChevronRight size="1rem"/>}
                </Group>
            </UnstyledButton>
        )
    }
);

export default function LayoutHeaderProfile() {
    const user = AuthorizationService.getAuthorizedUser();

    return (
        <Group position="center" className={'layout-header-profile'}>
            <Menu withArrow position={'bottom-right'} width={200}>
                <Menu.Target>
                    <UserButton
                        image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                        name={user?.name}
                        email={user?.email}
                    />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>通知中心</Menu.Label>
                    <Menu.Item icon={<IconBellRinging2Filled size='1.125rem'/>}>报警中心</Menu.Item>
                    <Menu.Item icon={<IconCalendarCheck size='1.125rem'/>}>待办任务</Menu.Item>
                    <Menu.Item icon={<IconMessage size='1.125rem'/>}>系统消息</Menu.Item>

                    <Menu.Label>配置管理</Menu.Label>
                    <Menu.Item icon={<IconSettings size='1.125rem'/>}>系统配置</Menu.Item>
                    <Menu.Item icon={<IconUserCog size='1.125rem'/>}>用户设置</Menu.Item>
                    <Menu.Item icon={<IconKey size='1.125rem'/>}>修改密码</Menu.Item>
                    <Menu.Item icon={<IconLogout size='1.125rem'/>}>退出登录</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}