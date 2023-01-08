import React, {useState} from "react";
import textlogo from '../../icons/textlogo.svg';
import Styles from './header.module.scss';
import {Link, useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import menuIcon from '../../icons/menu-icon.svg';

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
    const [showNav, setShowNav] = useState(false);

    return (
        <header className={cx('header')}>
            <div className={cx('mobile-top-ctr')}>
                <Link to={'/'} className={cx('homelink')}><img src={textlogo} alt={'matter'}/></Link>
                <button className={cx('nav-toggle')} onClick={() => setShowNav(!showNav)}>
                    <img src={menuIcon} alt={''}/>
                </button>
            </div>
            <div className={cx('nav-ctr', {'hide': !showNav})}>
                <nav className={cx('navbar')}>
                    <ul>
                        {
                            tabs.map(tab =>
                                <li key={tab.link} className={cx({'selected': tab.selected})}
                                    onClick={() => {setShowNav(false); navigate(tab.link)}}>
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
            </div>
        </header>
    );
};

export default Header;