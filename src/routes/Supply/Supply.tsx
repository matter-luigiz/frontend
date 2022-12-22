import React from "react";
import Header from "../../components/Header/Header";

const Supply = () => {

    const tabs = [
        { text: 'Find Materials', link: '', selected: false},
        { text: 'Learn', link: '', selected: false},
        { text: 'Suppliers: Get Listed', link: '', selected: true}
    ];

    return (
        <div className={'supply'}>
            <Header tabs={tabs} />
            Welcome to Supply!
        </div>
    );
};

export default Supply;