import React from "react";
import {useParams} from "react-router-dom";

const ProductPage = () => {
    const params = useParams();

    console.log(params);

    return <div className={'product'}>

    </div>;
};

export default ProductPage;