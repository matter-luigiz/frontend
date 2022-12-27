import React from "react";
import textlogo from '../../icons/textlogo.svg';
import Styles from './header.module.scss';
import {Link, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

interface Tab {
    text: string;
    link: string;
    selected: boolean;
}

interface HeaderProps {
    tabs: Tab[];
}

const Header = (props: HeaderProps) => {
    const {tabs} = props;
    const navigate = useNavigate();

    return (
        <header className={cx('header')}>
            <Link to={'/'} className={cx('homelink')}><img src={textlogo} alt={'matter'}/></Link>
            <nav className={cx('navbar')}>
                <ul>
                    {
                        tabs.map(tab =>
                            <li key={tab.link} className={cx({'selected': tab.selected})} onClick={() => navigate(tab.link)}>
                                <Link to={tab.link}>{tab.text}</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
            <div className={cx('buttons')}>
                <button className={'secondary'}>Sign in</button>
                <button className={'primary'}>Register</button>
            </div>
        </header>
    );
};

export default Header;