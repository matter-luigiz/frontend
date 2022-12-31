import React from "react";
import {useParams} from "react-router-dom";
import Styles from './ProductPage.module.scss';
import classNames from "classnames/bind";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import externalLink from '../../icons/external.svg';
import {useBackendReq} from "../../hooks";
import Product from "../../types/Product";

const cx = classNames.bind(Styles);

const testprod: Product = {
    name: 'Test Prod',
    category: 'Fabrics',
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

    const [loading, error, data] = useBackendReq(`${params['site']}/${params['id']}`);

    let product: Product;
    if (loading || error) {
        // return <div className={cx('product')}>
        //     <div className={'page'}>
        //         Loading...
        //     </div>
        // </div>
        product = testprod;
    } else {
        product = data as Product;
    }

    return <div className={cx('product')}>
        <div className={'page'}>
            <Breadcrumbs prev={[{text: product.category, link: `/search?cat=${product.category}`}]} current={product.name} />
            <div className={cx('product-info')}>
                <img src={product.imageUrl} alt={product.alt} className={cx('product-image')} />
                <div className={cx('product-text')}>
                    <h2>{product.name}</h2>
                    <p>{product.category}</p>
                    {product.price && <h3>{'$' + product.price + '/kg'}</h3>}
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