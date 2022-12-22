import React, {useState} from "react";
import Header from "../../components/Header/Header";

const Home = () => {
    const [listing, setListing] = useState();
    const [error, setError] = useState('');
    const [site, setSite] = useState('');

    const getListing = (site: string) => fetch(`http://${process.env.REACT_APP_BACKEND_URL}/${site}`)
        .then(res => res.json())
        .then(res => setListing(res))
        .catch(() => setError(`Failed to get listing for site ${site}`));

    const tabs = [
        { text: 'Find Materials', link: '', selected: false},
        { text: 'Learn', link: '', selected: false},
        { text: 'Suppliers: Get Listed', link: '', selected: false}
    ];

    return (
        <div className={'home'}>
            <Header tabs={tabs}/>
            <form onSubmit={e => { e.preventDefault(); getListing(site).then(r => r); } }>
                <input value={site} onChange={e => setSite(e.target.value)}/>
                <input type={"submit"} />
            </form>

            <p>{error ? error : listing ? JSON.stringify(listing) : 'Enter a site'}</p>
        </div>
    );
}

export default Home;