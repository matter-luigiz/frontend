import React, {useEffect, useState} from "react";
import Styles from './Home.module.scss';
import classNames from "classnames/bind";
import {Link, useNavigate} from "react-router-dom";

const cx = classNames.bind(Styles);

const Home = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Matter';
    }, []);

    return (
        <div className={cx('home')}>
            <div className={'page'}>
                <div className={cx('heading')}>
                    <div className={cx('text')}>
                        <h1>Access <span className={'green'}>sustainable & ethical raw materials</span> for your business.</h1>
                        <p><strong>Matter</strong> is the easiest way to find certified material suppliers that meet official ethical requirements.</p>
                        <form>
                            <input type={'text'} className={'textinput'} placeholder={'Ex. fabrics, chemicals...'} value={search} onChange={e => setSearch(e.target.value)}/>
                            <button className={'primary'} onClick={e => {e.preventDefault(); navigate(`/search?q=${search}&cat=all`);}}>Search</button>
                        </form>
                    </div>
                    <img src={''} alt={''}/>
                </div>
                <div className={cx('learn')}>
                    <h2>Learn what certifications mean, make informed decisions.</h2>
                    <button className={'secondary'}><Link to={'/learn'}>Read more</Link></button>
                </div>
                <div className={cx('supply')}>
                    <img src={''} alt={''} />
                    <div className={cx('text')}>
                        <h2>Suppliers! Join our directory today.</h2>
                        <p>Are you a supplier with sustainability or ethics certifications? Submit your information and
                            get your products in front of more business.</p>
                        <button className={'secondary'}><Link to={'/supply'}>Apply to be listed</Link></button>
                    </div>
                </div>
                <div className={cx('signup-ctr')}>
                    <div className={cx('signup')}>
                        <h3>Register your free account today and connect with sustainable suppliers</h3>
                        <form>
                            <input type={'text'} className={'textinput'} placeholder={'Email'}/>
                            <button className={'primary'} onClick={e => e.preventDefault()}>Get Started</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;