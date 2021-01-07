import React, {useEffect, useState} from 'react';
import { Select } from "@blueprintjs/select";
import {Button, MenuItem} from "@blueprintjs/core";
import regionsData from "../../../../../../../data/regions/shop_ip_kladr_api_region";

// Styles
import styles from './regions.module.scss';

export const PositionFormRegions = ({searchRegion, setSearchRegion}) => {

    const [regions, setRegions] = useState([]);

    useEffect( () => setRegions(regionsData), []);

    const handleQueryChange = query => {
        if (query === '') return  setRegions(regionsData);
        let sortedByQuery = regionsData.filter(region => region.name.includes(query));
        setRegions(sortedByQuery);
    };

    const handleClick = (item) => {
        console.log('clicked', item);
        setSearchRegion({name: item.name, type_short: item.type_short});
    };

    const itemRenderer = (item, {handleClick}) => {
        return (
            <MenuItem
                key={item.id}
                label={item.type_short}
                text={item.name}
                onClick={handleClick}
                shouldDismissPopover={true}
            />
        )
    };

    return (
        <>
           <Select
               items={regions}
               filterable={true}
               className={'position-form-regions'}
               // itemPredicate={'Films.itemPredicate'}
               itemRenderer={itemRenderer}
               noResults={"No results."}
               onItemSelect={handleClick}
               onQueryChange={handleQueryChange}
               popoverProps={{popoverClassName: styles.regionsPopover}}
           >
               <Button text={searchRegion.name ? `${searchRegion.name} ${searchRegion.type_short}` : 'Регион'} rightIcon="caret-down" />
           </Select>
        </>
    )
};


