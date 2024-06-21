import React, {useImperativeHandle} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, Grid, Group, Modal, PasswordInput, Space, Text, useMantineTheme} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {IconLock} from '@tabler/icons-react';
import {message} from "./message";
import {loginService} from "../../module/login/login.service";

const __REG_PASSWORD_ = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

const ModalChangePassword = React.forwardRef(
    (props, ref) => {
        const [loading, loadingHandler] = useDisclosure(false);
        const [opened, {open, close}] = useDisclosure(false);
        const theme = useMantineTheme();
        const form = useForm({
            initialValues: {
                originalValue: '',
                newValue: '',
                confirmValue: ''
            },
            validate: {
                originalValue: isNotEmpty(""),
                newValue: (value) => __REG_PASSWORD_.test(value) ? null : "密码长度最少 8 位且至少包含1个字母、1个数字和1个特殊字符",
                confirmValue: (value, values) => value === values.newValue ? null : "两次输入的密码不一致"
            }
        })

        const action = (values) => {
            loadingHandler.open();
            loginService.changePasswordWithOriginalPassword(values).then(() => {
                message.success("密码修改成功");
                props.onPasswordChanged();
            }).finally(() => {
                loadingHandler.close();
            })
        }

        useImperativeHandle(ref, () => (
            {
                open
            }
        ))

        return (
            <Modal opened={opened}
                   onClose={close}
                   withCloseButton={false}
                   closeOnEscape={false}
                   closeOnClickOutside={false}
                   title={<Text size="lg"
                                fw={700}>{props.force ? "初次登录或密码已过期, 请修改密码" : "修改密码"}</Text>}
                   overlayProps={{
                       color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                       opacity: 0.55,
                       blur: 3,
                   }}>
                <form onSubmit={form.onSubmit(action)}>
                    <Grid grow gutter="xl">
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                icon={<IconLock size='1rem'/>}
                                styles={{label: {paddingBottom: '4px'}}}
                                label="原密码："
                                placeholder="请输入原密码"
                                {...form.getInputProps('originalValue')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                icon={<IconLock size='1rem'/>}
                                styles={{label: {paddingBottom: '4px'}}}
                                label="新密码："
                                placeholder="请输入新密码"
                                {...form.getInputProps('newValue')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                icon={<IconLock size='1rem'/>}
                                styles={{label: {paddingBottom: '4px'}}}
                                label="确认新密码："
                                placeholder="请输入再次输入新密码"
                                {...form.getInputProps('confirmValue')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Space h="xs"/>
                    <Group mt="lg" position="right">
                        <Button size="sm" type="submit" fullWidth={props.force} loading={loading}>确定修改</Button>
                        {(!props.force) && <Button size="sm" variant="light" onClick={close} color="gray" disabled={loading}>取消修改</Button>}
                    </Group>
                </form>
            </Modal>
        )
    }
)

export default ModalChangePassword;