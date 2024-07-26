import React, {useImperativeHandle, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Accordion, Button, Grid, Group, Input, List, LoadingOverlay, NumberInput, Pill, ThemeIcon} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {tenantService} from "./tenant.service";
import {PAGE_STATE_CREATE, PAGE_STATE_EDIT} from "../../../common/consts";
import {IconFileTypePdf, IconFileTypeTxt} from "@tabler/icons-react";
import classes from '@assets/style/details.module.less';
import tenantClasses from "./tenant.module.css";

const TenantEditor = React.forwardRef(
    (props, ref) => {
        const [loading, setLoading] = useState(true);
        const [opened, {open, close}] = useDisclosure(false);
        const [pageState, setPageState] = useState(PAGE_STATE_CREATE);
        const [entity, setEntity] = useState({
            features: [{necessary: 'Y', name: '用户管理'}, {
                necessary: 'Y',
                name: '组织管理'
            }, {necessary: 'N', name: '设备台账'}]
        });
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

        const features = () => {
            return entity.features.map(f => (<Pill size={"md"} withRemoveButton={f.necessary === 'N'}>{f.name}</Pill>))
        }

        entity.attachments = [{
            name: "OpenAPI安全认证库 （Java）开发指南V1.1.11_20240516092452",
            extension: "pdf",
            size: "2320323"
        }, {
            name: "2024年06月27日分光光度法和容量法检测原始记录表",
            extension: "pdf",
            size: "2320323"
        }, {
            name: "东莞市水务集团供水有限公司License",
            extension: "text",
            size: "2320323"
        }]

        const attachments = () => {
            return entity.attachments.map(f => (
                <List.Item icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconFileTypePdf size={16}/>
                    </ThemeIcon>
                }><a href={""}>{`${f.name}.${f.extension}（${(f.size / 1024 / 1024).toFixed(2)}MB）`}</a></List.Item>)
            )
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
                                <Button size={"modal-actions"} onClick={() => {
                                }} variant={"filled"}>保存</Button>
                                <Button size={"modal-actions"} onClick={close} variant={"default"}>取消</Button>
                            </Group>
                        </div>
                        <div className={classes['modal-details-body-content']}>
                            <LoadingOverlay
                                visible={loading}
                                zIndex={1000}
                                overlayProps={{radius: 'sm', blur: 2}}
                            />
                            <form onSubmit={persist}>
                                <Accordion multiple={true} chevronPosition="right" defaultValue={['basic']} classNames={tenantClasses}>
                                    <Accordion.Item key={'basic'} value={'basic'}>
                                        <Accordion.Control className={classes['modal-details-subtitle']}>基本信息</Accordion.Control>
                                        <Accordion.Panel>
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
                                                    <div><i className={classes['required']}></i>手机号码：</div>
                                                    <div><Input size={"xs"}/></div>
                                                </Grid.Col>
                                                <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                                    <div><i className={classes['required']}></i>第二联系人：</div>
                                                    <div><Input size={"xs"}/></div>
                                                </Grid.Col>
                                                <Grid.Col className={classes["modal-details-form-item"]} span={5}>
                                                    <div><i className={classes['required']}></i>手机号码：</div>
                                                    <div><Input size={"xs"}/></div>
                                                </Grid.Col>
                                            </Grid>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item key={'features'} value={'features'}>
                                        <Accordion.Control className={classes['modal-details-subtitle']}>功能权限</Accordion.Control>
                                        <Accordion.Panel>
                                            <Group gap={"sm"}>{features()}</Group>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item key={'logo'} value={'logo'}>
                                        <Accordion.Control className={classes['modal-details-subtitle']}>LOGO</Accordion.Control>
                                        <Accordion.Panel>

                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item key={'limits'} value={'limits'}>
                                        <Accordion.Control className={classes['modal-details-subtitle']}>用量限制</Accordion.Control>
                                        <Accordion.Panel>
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
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item key={'attachments'} value={'attachments'}>
                                        <Accordion.Control className={classes['modal-details-subtitle']}>相关附件</Accordion.Control>
                                        <Accordion.Panel>
                                            <List spacing={"sm"} size={"sm"} center>
                                                {attachments()}
                                            </List>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>
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