import React, {useImperativeHandle, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, Grid, Group, Modal, Text, TextInput, useMantineTheme} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {tenantService} from "./tenant.service";
import {PAGE_STATE_CREATE, PAGE_STATE_EDIT} from "../../common/consts";
import {IconUser} from "@tabler/icons-react";

const TenantEditor = React.forwardRef(
    (props, ref) => {
        const [loading, setLoading] = useState(false);
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

        return (
            <Modal opened={opened}
                   onClose={close}
                   closeOnEscape={false}
                   closeOnClickOutside={false}
                   size={'100%'}
                   title={<Text size="lg" fw={700}>{pageState === 'CREATE' ? "新增租户信息" : "编辑租户信息"}</Text>}
                   overlayProps={{
                       color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                       opacity: 0.55,
                       blur: 3,
                   }}>
                <form onSubmit={form.onSubmit(persist)}>
                    <Grid gutter="md">
                        <Grid.Col span={5}>
                            <TextInput
                                styles={{label: {fontSize: '0.9rem', paddingBottom: '8px'}}}
                                label="租户名称："
                                placeholder="请输入租户名称"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                        <Grid.Col span={5} offset={1}>
                            <TextInput
                                styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                label="租户别名："
                                placeholder="请输入租户别名"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter="xs">
                        <Grid.Col span={5}>
                            <TextInput
                                styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                label="联系人："
                                placeholder="请输入租户名称"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                        <Grid.Col span={5} offset={1}>
                            <TextInput
                                styles={{label: {fontSize: '1rem', paddingBottom: '8px'}}}
                                label="租户别名："
                                placeholder="请输入租户别名"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group justify="flex-end" gap={"0.6rem"} style={{ marginTop: '1.5rem', marginBottom: '0.7rem' }}>
                                <Button
                                    loading={loading}
                                    radius="xs"
                                    size={"modal-actions"}
                                    type="submit">
                                    保存
                                </Button>
                                <Button
                                    loading={loading}
                                    radius="xs"
                                    size={"modal-actions"}
                                    variant={"default"}>
                                    取消
                                </Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </form>
            </Modal>
        )
    }
);

export default TenantEditor;