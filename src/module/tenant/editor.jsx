import React, {useImperativeHandle, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, Grid, Group, Input, LoadingOverlay, Modal, Text, TextInput, useMantineTheme} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {tenantService} from "./tenant.service";
import {PAGE_STATE_CREATE, PAGE_STATE_EDIT} from "../../common/consts";
import {IconUser} from "@tabler/icons-react";
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
                                <Grid>
                                    <Grid.Col span={6}>
                                        <div>租户名称</div>
                                        <div><Input /></div>
                                    </Grid.Col>
                                </Grid>
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