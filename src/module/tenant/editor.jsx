import React, {useImperativeHandle, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, Grid, Group, Input, List, LoadingOverlay, NumberInput, ThemeIcon, useMantineTheme} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {tenantService} from "./tenant.service";
import {PAGE_STATE_CREATE, PAGE_STATE_EDIT} from "../../common/consts";
import {IconCircleCheck, IconFileTypePdf, IconFileTypeTxt} from "@tabler/icons-react";
import classes from '@assets/style/details.module.less';

const TenantEditor = React.forwardRef(
    (props, ref) => {
        const [loading, setLoading] = useState(true);
        const [opened, {open, close}] = useDisclosure(false);
        const [pageState, setPageState] = useState(PAGE_STATE_CREATE);
        const [entity, setEntity] = useState({});
        const theme = useMantineTheme();
        const form = useForm({
            initialValues: {
                name: '',
                alias: '',
                logo: '',
                license: '',
                userAmount: 0,
                videoAmount: 0,
            },
            validate: {
                name: isNotEmpty("")
            }
        })

        setTimeout(() => setLoading(false), 4000);

        useImperativeHandle(ref, () => (
            {
                open: (id) => {
                    setPageState(typeof id === "undefined" ? PAGE_STATE_CREATE : PAGE_STATE_EDIT);
                    if (PAGE_STATE_EDIT === pageState) {
                        setLoading(true)
                        tenantService.get(id).then(res => {
                            setEntity(res);
                            setLoading(false);
                        })
                    }
                    open();
                }
            }
        ));

        const persist = () => {

        }

        const render = () => {
            if (!opened) {
                return null;
            }
            return (
                <div className={classes['modal-details']}>
                    <div className={classes['modal-details-body']}>
                        <div className={classes['modal-details-body-title']}>
                            <div>
                                {pageState === PAGE_STATE_CREATE ? "新增租户" : "编辑租户信息"}
                            </div>
                            <Group gap={"xs"} className={classes['modal-details-actions']}>
                                <Button size={"modal-actions"} onClick={() => {}} variant={"filled"}>保存</Button>
                                <Button size={"modal-actions"} onClick={close} variant={"default"}>取消</Button>
                            </Group>
                        </div>
                        <div className={classes['modal-details-body-content']}>
                            <LoadingOverlay
                                visible={loading}
                                zIndex={1000}
                                overlayProps={{ radius: 'sm', blur: 2 }}
                            />
                            <form onSubmit={persist}>
                                <div className={classes["modal-details-subtitle"]}>基本信息</div>
                                <Grid>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>租户名称：</div>
                                        <div><Input size={"xs"} {...form.getInputProps('name')}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>租户简称：</div>
                                        <div><Input size={"xs"} {...form.getInputProps('alias')}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>主要联系人：</div>
                                        <div><Input size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>联系手机号码：</div>
                                        <div><Input size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>第二联系人：</div>
                                        <div><Input size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                        <div><i className={classes['required']}></i>联系手机号码：</div>
                                        <div><Input size={"xs"}/></div>
                                    </Grid.Col>
                                </Grid>
                                <div className={classes["modal-details-subtitle"]}>功能权限</div>
                                <div className={classes["modal-details-subtitle"]}>LOGO</div>
                                <div className={classes["modal-details-subtitle"]}>用量限制</div>
                                <Grid>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={2}>
                                        <div><i className={classes['required']}></i>用户数量：</div>
                                        <div><NumberInput size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={2}>
                                        <div><i className={classes['required']}></i>数据点数量：</div>
                                        <div><NumberInput size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={2}>
                                        <div><i className={classes['required']}></i>设备数量：</div>
                                        <div><NumberInput size={"xs"}/></div>
                                    </Grid.Col>
                                    <Grid.Col className={classes["modal-details-form-item"]} span={2}>
                                        <div><i className={classes['required']}></i>视频路数：</div>
                                        <div><NumberInput size={"xs"}/></div>
                                    </Grid.Col>
                                </Grid>
                                <div className={classes["modal-details-subtitle"]}>相关附件</div>
                                <div style={{"padding": "0.5rem 1.5rem"}}>
                                    <List spacing={"sm"} size={"sm"} center>
                                        <List.Item icon={
                                            <ThemeIcon color="teal" size={24} radius="xl">
                                                <IconFileTypePdf size={16} />
                                            </ThemeIcon>
                                        }>2024年06月27日分光光度法和容量法检测原始记录表.pdf</List.Item>
                                        <List.Item icon={
                                                           <ThemeIcon color="teal" size={24} radius="xl">
                                                               <IconFileTypePdf size={16} />
                                                           </ThemeIcon>
                                                       }>OpenAPI安全认证库 （Java）开发指南V1.1.11_20240516092452.pdf</List.Item>
                                        <List.Item icon={
                                            <ThemeIcon color="teal" size={24} radius="xl">
                                                <IconFileTypeTxt size={16} />
                                            </ThemeIcon>
                                        }>东莞市水务集团供水有限公司License.txt</List.Item>
                                    </List>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <>{render()}</>
        )
    }
);

export default TenantEditor;