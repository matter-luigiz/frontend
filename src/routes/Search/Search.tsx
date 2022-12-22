import React from "react";
import Header from "../../components/Header/Header";

const Search = () => {

    const tabs = [
        { text: 'Find Materials', link: '', selected: true},
        { text: 'Learn', link: '', selected: false},
        { text: 'Suppliers: Get Listed', link: '', selected: false}
    ];

    return (
        <div className={'search'}>
            <Header tabs={tabs} />
            Welcome to Search!
        </div>
    );
};

export default Search;