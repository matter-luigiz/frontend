import React, {useEffect} from "react";

const Learn = () => {

    useEffect(() => {
        document.title = 'Learn | Matter';
    }, []);

    return (
        <div className={'learn'}>
            <div className={'page'}>
                Welcome to Learn!
            </div>
        </div>
    );
};

export default Learn;