import React, {useEffect, useState} from "react";
import {dictionaryService} from "@common/service/dictionary.service";
import classes from "@assets/style/list.module.less";

const SearchDictionaryLabels = React.forwardRef(
    (props, ref) => {
        const [entity, setEntity] = useState({});
        const [selections, setSelections] = useState([]);

        useEffect(() => {
            dictionaryService.getCategory(props.category).then((res) => {
                setEntity(res);
            })
        }, [props.category])

        const onLabelClick = (node) => {
            return () => {
                const selected = [...selections];
                const index = selected.indexOf(node.id);
                if (index >= 0) {
                    selected.splice(index, 1);
                } else {
                    selected.push(node.id);
                }
                setSelections(selected);
                props.onSelectionChange(selected);
            }
        }

        return (
            <>
                <div className={classes['search-advance-condition']}>
                    <div>{props.name || entity.name}：</div>
                    <div className={classes['search-advance-condition-labels']}>
                        {
                            entity.dictionaries?.map(node => (
                                <label
                                    key={node.id}
                                    onClick={onLabelClick(node)}
                                    className={`${selections.includes(node.id) ? classes['selected'] : ''}`}>
                                    {node.name}
                                </label>
                            ))
                        }
                    </div>
                </div>
            </>
        )
    }
);

export default SearchDictionaryLabels;