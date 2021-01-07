import React from 'react';
import {Button, Icon, InputGroup} from "@blueprintjs/core";

// Styles
import styles from "./search.module.scss";

export const PositionFormSearch = ({searchText, setSearchText, onSubmit}) => {
    return (
        <>
            <div className={styles.position__search}>
                <InputGroup
                    disabled={false}
                    large={true}
                    className={styles.input__text}
                    placeholder="example: ip.ru"
                    leftElement={<Icon icon="search" />}
                    type='search'
                    icon={'search'}
                    id={'search'}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <div>
                    <Button icon="search" large={true} intent="primary" text="Search" onClick={onSubmit} />
                </div>
            </div>
        </>
    )
};