import React from "react";
import {useParams} from "react-router-dom";
import Styles from './ProductPage.module.scss';
import classNames from "classnames/bind";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import externalLink from '../../icons/external.svg';

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
            <div className={cx('product-info')}>
                <img src={product.imageUrl} alt={product.alt} className={cx('product-image')} />
                <div className={cx('product-text')}>
                    <h2>{product.name}</h2>
                    <p>{product.category}</p>
                    <h3>$ {product.price}/kg</h3>
                    <div className={cx('description')}>
                        <h4>Information on Material</h4>
                    </div>
                    <div className={cx('buttons')}>
                        <button className={'primary'}>View on supplier's site <img src={externalLink} alt={''}/></button>
                        <button className={'quaternary'}>Save for Later</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default ProductPage;