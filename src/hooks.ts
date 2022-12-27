import {useState, useEffect} from "react";

const useBackendReq = (path: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_BACKEND_URL}/${path}`)
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