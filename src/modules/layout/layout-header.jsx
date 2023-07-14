import {Avatar, Group, Menu, UnstyledButton, Text} from "@mantine/core";
import {forwardRef} from "react";
import {
    IconArrowsLeftRight,
    IconChevronRight, IconLogout,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings, IconTrash, IconUserCog
} from "@tabler/icons-react";
import AuthorizationService from "../../utils/authorization.service";


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
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                })}
                {...others}
            >
                <Group noWrap={true}>
                    <Avatar src={image} radius="xl"/>
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

export default function LayoutHeader() {
    const user = AuthorizationService.getAuthorizedUser();

    return (
        <div className={'layout-header'}>
            <div className={'layout-header-logo'}>

            </div>
            <div className={'layout-header-navigation'}>

            </div>
            <div  className={'layout-header-icons'}>

            </div>
            <div className={'layout-header-profile'}>
                <Group position="center">
                    <Menu withArrow position={'bottom-end'} offset={-2}>
                        <Menu.Target>
                            <UserButton
                                image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                                name={user?.name}
                                email={user?.email}
                            />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            <Menu.Item icon={<IconSettings size={14} />}>系统配置</Menu.Item>
                            <Menu.Item icon={<IconUserCog size={14} />}>用户配置</Menu.Item>
                            <Menu.Item icon={<IconLogout size={14} />}>tuitui</Menu.Item>
                            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                            <Menu.Item
                                icon={<IconSearch size={14} />}
                                rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                            >
                                Search
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </div>
        </div>
    )
}