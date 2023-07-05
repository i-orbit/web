import { TextInput, PasswordInput, Button, Grid } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import styles from './login.less'

export default function Login() {
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
    })

    return (
        <div className={styles['login-wrapper']}>
            <div className={styles['login-panel']}>
                <div className={styles['login-panel-left']}></div>
                <div className={styles['login-panel-right']}>
                    <div className={styles['login-form']}>
                        <div className={styles['login-title']}>
                            <div>欢迎使用</div>
                            <div>ORBIT-智慧物联管理平台</div>
                        </div>
                        <form onSubmit={form.onSubmit(() => {})}>
                            <Grid grow gutter="xl">
                                <Grid.Col span={12}>
                                    <TextInput
                                        styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                        label="用户名："
                                        placeholder="用户名/手机号码/邮箱地址"
                                        {...form.getInputProps('username')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <PasswordInput
                                        styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                        label="密码："
                                        placeholder="请输入您的登录密码"
                                        {...form.getInputProps('password')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Button radius="xl" size={"md"} fullWidth type="submit">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                                </Grid.Col>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}