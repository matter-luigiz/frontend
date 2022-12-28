import React from "react";
import {useParams} from "react-router-dom";
import Styles from './ProductPage.module.scss';
import classNames from "classnames/bind";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const cx = classNames.bind(Styles);

const testprod = {
    name: 'Test Prod',
    category: 'Fabric',
    liked: true,
    alt: 'Test Prod',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    price: 5.30,
    id: 1,
    site: 'test'
};

const ProductPage = () => {
    const params = useParams();

    console.log(params);

    const product = testprod;

    return <div className={cx('product')}>
        <div className={'page'}>
            <Breadcrumbs prev={[{text: product.category, link: `/search?cat=${product.category}`}]} current={product.name} />
        </div>
    </div>;
};

export default ProductPage;