import {Button, Checkbox, Group, Input, Pagination, Table} from "@mantine/core";
import classes from "@assets/style/list.module.less";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {IconSearch} from "@tabler/icons-react";
import {message} from "../../common/component/message";
import {MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp} from "react-icons/md";
import SearchDictionaryLabels from "../../common/component/search/search-dictionary-labels";

export default function TenantIndex() {
    const [loading, {toggle}] = useDisclosure();
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAdvance, {toggle: toggleShowAdvance}] = useDisclosure(true);

    const tenants = [
        {
            id: "12312312312",
            name: "某某咳咳咳集团",
            alias: "咳咳咳",
            stateName: "正常",
            expireAt: '2025-01-01'
        },
        {
            id: "12312312313",
            name: "某某咳咳咳集团",
            alias: "咳咳咳",
            stateName: "正常",
            expireAt: '2025-01-01'
        },
    ]

    const rows = tenants.map(t => {
        return (
            <Table.Tr key={t.id}>
                <Table.Td>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRows.includes(t.id)}
                        onChange={(event) =>
                            setSelectedRows(
                                event.currentTarget.checked
                                    ? [...selectedRows, t.id]
                                    : selectedRows.filter((id) => id !== t.id)
                            )
                        }
                    />
                </Table.Td>
                <Table.Td>
                    {t.name}
                </Table.Td>
                <Table.Td>
                    {t.alias}
                </Table.Td>
                <Table.Td>
                    {t.stateName}
                </Table.Td>
                <Table.Td>
                    {t.expireAt}
                </Table.Td>
            </Table.Tr>
        )
    })

    const onDelete = () => {
        message.error("123123123");
    }

    return (
        <div className={classes['list-content']}>
            <div className={classes['search-bar']}>
                <div className={classes['search-main']}>
                    <div className={classes['search-condition']} style={{width: '50%'}}>
                        <div>关键字：</div>
                        <div>
                            <Input rightSection={<IconSearch/>} placeholder={"租户名称/租户别名/租户简称"}/>
                        </div>
                    </div>
                    <Group gap={'xs'} className={classes['search-actions']}>
                        <Button justify={'center'} variant={'white'} size={"compact-sm"} onClick={toggleShowAdvance}>
                            {!showAdvance && <MdKeyboardDoubleArrowDown size={'1rem'}/>}
                            {showAdvance && <MdKeyboardDoubleArrowUp size={'1rem'}/>}
                            高级查询
                        </Button>
                        <Button loading={loading} size="list-actions" variant={'filled'}>查询</Button>
                        <Button loading={loading} size="list-actions" variant={'filled'}
                                color={"rgba(92, 92, 92, 1)"}>重置</Button>
                    </Group>
                </div>
                <div className={`${classes['search-advance']} ${showAdvance ? classes['search-advance-show'] : classes['search-advance-hide']}`}>
                    <SearchDictionaryLabels name={"租户状态"} category={"TENANT_STATE"}/>
                </div>
            </div>
            <div className={classes['list']}>
                <Group className={classes.actions} gap="xs">
                    <Button loading={loading} onClick={toggle} size="list-actions" variant={'filled'}>新增</Button>
                    <Button loading={loading} onClick={onDelete} size="list-actions" variant={'filled'}
                            color={"red"}>删除</Button>
                </Group>
                <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Checkbox
                                    aria-label="Select row"
                                    checked={selectedRows.length === tenants.length}
                                    onChange={function () {
                                    }}
                                />
                            </Table.Th>
                            <Table.Th>租户名称</Table.Th>
                            <Table.Th>租户别名/简称</Table.Th>
                            <Table.Th>租户状态</Table.Th>
                            <Table.Th>过期时间</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
                <div className={classes.pagination}>
                    <Pagination total={10} size="sm" withEdges/>
                </div>
            </div>
        </div>
    )

}