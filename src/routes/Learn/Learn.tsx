import React, {useEffect} from "react";
import Styles from './Learn.module.scss';
import classNames from "classnames/bind";
import constImg from '../../icons/const-img.svg';

const cx = classNames.bind(Styles);

const Learn = () => {

    useEffect(() => {
        document.title = 'Learn | Matter';
    }, []);

    return (
        <div className={cx('learn')}>
            <div className={'page'}>
                <div className={cx('construction')}>
                    <img src={constImg} alt={''}/>
                    <h2>Under construction, check back soon!</h2>
                </div>
            </div>
        </div>
    );
};

export default Learn;