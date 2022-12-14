import React, { useState } from 'react';
import './global.scss';
import Styles from './App.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function App() {
    const [listing, setListing] = useState();
    const [error, setError] = useState('');
    const [site, setSite] = useState('');

    const getListing = (site: string) => fetch(`http://${process.env.REACT_APP_BACKEND_URL}/${site}`)
        .then(res => res.json())
        .then(res => setListing(res))
        .catch(() => setError(`Failed to get listing for site ${site}`));


    return (
        <div className={cx('App')}>
            <form onSubmit={e => { e.preventDefault(); getListing(site).then(r => r); } }>
                <input value={site} onChange={e => setSite(e.target.value)}/>
                <input type={"submit"} />
            </form>

            <p>{error ? error : listing ? JSON.stringify(listing) : 'Enter a site'}</p>
        </div>
    );
}

export default App;
