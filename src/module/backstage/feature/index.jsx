import classes from "@assets/style/list.module.less";
import {Group, Tree} from "@mantine/core";
import {featureService} from "./feature.service";
import {useEffect, useState} from "react";
import {IconChevronDown} from "@tabler/icons-react";
import SplitPane, { Pane } from "react-split-pane";

export default function FeatureIndex() {
    const [features, setFeatures] = useState([]);
    const [query, setQuery] = useState({});

    useEffect(() => {
        featureService.getTree().then(res => {
            setFeatures(res);
        })
    }, [query]);

    return (
        <>
            <SplitPane split="vertical" className={classes['tree-index']}>
                <Pane initialSize={"220px"} maxSize={"300px"} className={classes['tree-index-tree']}>
                    <div className={classes['tree-index-title']}>功能模块</div>
                    <Tree data={features}
                          renderNode={({ node, expanded, hasChildren, elementProps }) => (
                              <Group gap={5} {...elementProps}>
                                  {hasChildren && (
                                      <IconChevronDown
                                          size={18}
                                          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                      />
                                  )}
                                  <span>{node.name}</span>
                              </Group>
                          )}/>
                </Pane>
                <Pane initialSize={"220px"} className={classes['tree-index-content']}>
                    <div className={classes['tree-index-title']}>包含功能菜单</div>
                </Pane>
            </SplitPane>
        </>
    )
}