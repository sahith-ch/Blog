import React from 'react';
import Styles from "./Search.module.css";

interface Props {
    setInputVal: React.Dispatch<React.SetStateAction<string>>;
}

function Search(props: Props) {
    const { setInputVal } = props;

    return (
        <div className={Styles.container}>
            <input
                onChange={(e) => setInputVal(e.target.value)}
                className={Styles.Search}
                placeholder='Search'
                type='text'
            />
        </div>
    );
}

export default Search;
