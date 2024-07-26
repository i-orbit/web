import classes from "@assets/style/list.module.less";
import {Tree} from "@mantine/core";
import {featureService} from "./feature.service";
import {useEffect, useState} from "react";

export default function FeatureIndex() {
    const [features, setFeatures] = useState([]);

    // useEffect(() => {
    //     featureService.getTree().then(res => {
    //         setFeatures(res);
    //     })
    // }, [features]);

    return (
        <>
            <div className={classes['tree-index']}>
                <div className={classes['tree-index-tree']}>
                    <div className={classes['tree-index-title']}>功能模块</div>
                    <Tree data={features} />
                </div>
                <div className={classes['tree-index-content']}>
                    <div className={classes['tree-index-title']}>包含功能菜单</div>
                </div>
            </div>
        </>
    )
}