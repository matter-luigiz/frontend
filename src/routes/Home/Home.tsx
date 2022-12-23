import React, {useState} from "react";

const Home = () => {
    const [listing, setListing] = useState();
    const [error, setError] = useState('');
    const [site, setSite] = useState('');

    const getListing = (site: string) => fetch(`http://${process.env.REACT_APP_BACKEND_URL}/${site}`)
        .then(res => res.json())
        .then(res => setListing(res))
        .catch(() => setError(`Failed to get listing for site ${site}`));

    return (
        <div className={'home'}>
            <div className={'page'}>
                <form onSubmit={e => {
                    e.preventDefault();
                    getListing(site).then(r => r);
                }}>
                    <input value={site} onChange={e => setSite(e.target.value)}/>
                    <input type={"submit"}/>
                </form>

                <p>{error ? error : listing ? JSON.stringify(listing) : 'Enter a site'}</p>
            </div>
        </div>
    );
}

export default Home;