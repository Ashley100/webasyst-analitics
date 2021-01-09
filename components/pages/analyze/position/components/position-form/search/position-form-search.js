import React, {useState} from 'react';
import {Button, Icon, InputGroup} from "@blueprintjs/core";

// Styles
import styles from "./search.module.scss";

export const PositionFormSearch = ({searchText, setSearchText, onSubmit, isFormReady, setFormReady}) => {

    let [isSearchInputFilled, setSearchInputFilled] = useState(false);
    let [isSearchUrlValid, setSearchUrlValid] = useState(false);

    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }
    const onSearchInputChange = e => {
        setSearchText(e.target.value);

        e.target.value.length > 0   ? setSearchInputFilled(true) : setSearchInputFilled(false);
        validateUrl(e.target.value) ? setSearchUrlValid(true) : setSearchUrlValid(false);

        if(isSearchInputFilled && isSearchUrlValid) setFormReady(true);
        else setFormReady(false);


        console.log(validateUrl(e.target.value));
    };

    return (
        <>
            <div className={styles.position__search}>
                <div>
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
                        onChange={onSearchInputChange}
                    />
                    {(!isSearchUrlValid && isSearchInputFilled) && <code className="db fz-12 lh-12 c-orange-1 mt-12">Неверный формат URL. Пример: <span className="c-blue-3">http://google.com</span></code>}
                    {!isSearchInputFilled && <code className="db fz-12 lh-12 c-orange-1 mt-12">Необходимо ввести адрес сайта.</code>}
                </div>
                <div>
                    <Button icon="search" disabled={!isFormReady} large={true} intent="primary" text="Search" onClick={onSubmit} />
                </div>
            </div>
        </>
    )
};