import {useState, useEffect} from "react";

const useBackendReq = (path: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`${process.env.NODE_ENV === "production" ? 
            'https://' + process.env.REACT_APP_HOSTED_BACKEND_URL : 'http://' + process.env.REACT_APP_LOCAL_BACKEND_URL}/${path}`)
            .then(res => {
                if (!res.ok) {
                    setError(res.statusText);
                }
                return res;
            })
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [path]);

    return [loading, error, data];
}

export {useBackendReq};