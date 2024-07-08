import {useRef} from "react";
import {Button, Grid, PasswordInput, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {modals} from "@mantine/modals";
import {useDisclosure} from '@mantine/hooks';
import {loginService} from "./login.service";
import {message} from "../../common/component/message";
import ModalChangePassword from "../../common/component/modal-change-password";
import AuthorizationService from '../../common/authorization.service'
import {IconLock, IconUser} from '@tabler/icons-react';
import './login.less'

const ERROR_CODE_USER_LOGGED_ELSEWHERE = "0x00100001";


export default function Login() {
    const [loading, loadingHandler] = useDisclosure(false);
    const cmpChangePassword = useRef()

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            captchaKey: '',
            captchaValue: '',
            platform: 'WEB',
            forcedReplacement: 'N'
        },

        validate: {
            username: isNotEmpty(""),
            password: isNotEmpty(""),
        },
    });

    const openConfirmForceReplacementModal = () => {
        modals.openConfirmModal({
            title: '系统提醒',
            children: (
                <Text size="sm">
                    您的账户已在另一地点登录，是否强制登录
                </Text>
            ),
            labels: {confirm: '是', cancel: '否'},
            onConfirm: () => {
                login(Object.assign(form.values, {forcedReplacement: "Y"}));
            }
        });
    }

    const onAuthorized = () => {
        loginService.getAuthorizedUser().then(user => {
            if (user.forceChangePassword) {
                cmpChangePassword.current.open(user.loginName);
                return;
            }
            AuthorizationService.storeAuthorizedUser(user);
            window.location.href = "/";
        })
    }

    const onLoginFailed = (e) => {
        if (e.response.data.code === ERROR_CODE_USER_LOGGED_ELSEWHERE) {
            openConfirmForceReplacementModal();
            return;
        }
        message.error(e.response.data.message);
    }

    const login = (values) => {
        loadingHandler.open();
        loginService.authorize(values).then(onAuthorized).catch(onLoginFailed).finally(loadingHandler.close);
    }

    return (
        <>
            <ModalChangePassword ref={cmpChangePassword} onPasswordChanged={onAuthorized} force={true}/>
            <div className={'login-wrapper'}>
                <div className={'login-panel'}>
                    <div className={'login-panel-left'}></div>
                    <div className={'login-panel-right'}>
                        <div className={'login-form'}>
                            <div className={'login-title'}>
                                <div>欢迎使用</div>
                                <div>ORBIT-智慧物联管理平台</div>
                            </div>
                            <form onSubmit={form.onSubmit(login)}>
                                <Grid grow gutter="xl">
                                    <Grid.Col span={12}>
                                        <TextInput
                                            icon={<IconUser size='1.2rem'/>}
                                            styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                            label="用户名："
                                            placeholder="用户名/手机号码/邮箱地址"
                                            {...form.getInputProps('username')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <PasswordInput
                                            icon={<IconLock size='1.2rem'/>}
                                            styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                            label="密码："
                                            placeholder="请输入您的登录密码"
                                            {...form.getInputProps('password')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={12}></Grid.Col>
                                    <Grid.Col span={12}>
                                        <Button
                                            loading={loading}
                                            radius="xl"
                                            size={"md"}
                                            fullWidth
                                            type="submit">
                                            登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}