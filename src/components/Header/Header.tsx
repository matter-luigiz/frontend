import React from "react";
import textlogo from '../../icons/textlogo.svg';
import Styles from './header.module.scss';
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

    return (
        <header className={cx('header')}>
            <img src={textlogo} alt={'matter'}/>
            <nav className={cx('navbar')}>
                <ul>
                    {
                        tabs.map(tab =>
                            <li className={cx({'selected': tab.selected})}>{tab.text}</li>
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