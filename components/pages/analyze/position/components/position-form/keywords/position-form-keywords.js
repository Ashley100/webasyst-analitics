import React, {useState} from "react";
import {Button, TagInput} from "@blueprintjs/core";

export const PositionFormKeywords = ({searchKeywords, setSearchKeywords}) => {

    const onKeywordAdded = (word) => {
        let keywordsTemp = [...searchKeywords];
        keywordsTemp.push(word.join());
        setSearchKeywords(keywordsTemp);
        console.log(searchKeywords);
    };

    const onKeywordRemove = (word) => {
        let keywordsTemp = [...searchKeywords];
        let wordIndex = keywordsTemp.indexOf(word);
        keywordsTemp.splice(wordIndex, 1);
        setSearchKeywords(keywordsTemp);
    };

    const clearButton = (
        <Button
            disabled={false}
            icon={"cross"} //"refresh"
            minimal={true}
            onClick={() => { setSearchKeywords([]) }}
        />
    );

    return (
        <>
            <TagInput
                onChange={() => {}}
                onAdd={onKeywordAdded}
                onRemove={onKeywordRemove}
                placeholder="keyword..."
                rightElement={clearButton}
                values={searchKeywords}
            />
        </>
    )
};