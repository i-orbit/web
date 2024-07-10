import React, {useState} from "react";
import {dictionaryService} from "@common/service/dictionary.service";
import classes from "@assets/style/list.module.less";

const SearchDictionaryLabels = React.forwardRef(
    (props, ref) => {
        const [entity, setEntity] = useState({});

        dictionaryService.getCategory(props.category).then((res) => {
            setEntity(res);
        })

        return (
            <>
                <div className={classes['search-advance-condition']}>
                    <div>{props.name || entity.name}：</div>
                    <div>
                        {entity.dictionaries?.map(node => (<a href={"/"}>{node.name}</a>))}
                    </div>
                </div>
            </>
        )
    }
);

export default SearchDictionaryLabels;