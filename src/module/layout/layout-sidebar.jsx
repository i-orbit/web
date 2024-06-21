import {NavLink, ScrollArea} from "@mantine/core";
import {IconFingerprint, IconGauge} from "@tabler/icons-react";

const __CHILD_OFFSET__ = 28;

export default function LayoutSidebar() {
    return (
        <ScrollArea className={'layout-sidebar'} type={"never"}>
            <NavLink
                label={"First parent link"}
                icon={<IconGauge size={"1rem"} stroke={1.5}/>}
                childrenOffset={__CHILD_OFFSET__}
                active={true}
                variant={"filled"}
            >
                <NavLink label="First child link"/>
                <NavLink label="Second child link"/>
                <NavLink label="Nested parent link" childrenOffset={__CHILD_OFFSET__}>
                    <NavLink label="First child link"/>
                    <NavLink label="Second child link"/>
                    <NavLink label="Third child link"/>
                </NavLink>
            </NavLink>

            <NavLink
                label="Second parent link"
                icon={<IconFingerprint size="1rem" stroke={1.5}/>}
                childrenOffset={__CHILD_OFFSET__}
            >
                <NavLink label="First child link"/>
                <NavLink label="Second child link"/>
                <NavLink label="Third child link"/>
            </NavLink>
        </ScrollArea>
    )
}