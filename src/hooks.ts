import {useState, useEffect} from "react";

const useBackendReq = (path: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://${process.env.NODE_ENV === "production" ? 
            process.env.REACT_APP_HOSTED_BACKEND_URL : process.env.REACT_APP_LOCAL_BACKEND_URL}/${path}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => setError(err));
    }, [path]);

    return [loading, error, data];
}

export {useBackendReq};