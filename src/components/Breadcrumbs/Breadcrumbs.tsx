import React from "react";
import Styles from './Breadcrumbs.module.scss';
import classNames from "classnames/bind";
import {Link} from "react-router-dom";

const cx = classNames.bind(Styles);


type Crumbs = {
    prev: { text: string, link: string }[];
    current: string;
}

const Breadcrumbs = ({prev, current}: Crumbs) => {
    return (
        <div className={cx('breadcrumbs')}>
            {prev.map((val, ind) => <div className={cx('prev')} key={ind}>
                <Link className={cx('prevlink')} key={val.link} to={val.link}>{val.text}</Link>
                <span>&gt;</span>
            </div>)}
            <span className={cx('current')}>{current}</span>
        </div>
    );
};

export default Breadcrumbs;