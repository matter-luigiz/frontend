import React from "react";
import Header from "../../components/Header/Header";

const Learn = () => {

    const tabs = [
        { text: 'Find Materials', link: '', selected: false},
        { text: 'Learn', link: '', selected: true},
        { text: 'Suppliers: Get Listed', link: '', selected: false}
    ];

    return (
        <div className={'learn'}>
            <Header tabs={tabs} />
            Welcome to Learn!
        </div>
    );
};

export default Learn;