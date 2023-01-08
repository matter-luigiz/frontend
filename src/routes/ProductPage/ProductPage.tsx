import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Styles from './ProductPage.module.scss';
import classNames from "classnames/bind";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import externalLink from '../../icons/external.svg';
import {useBackendReq} from "../../hooks";
import Product, {convertToProduct} from "../../types/Product";
import {fullSite} from "../../sites";

const cx = classNames.bind(Styles);


const capitalize = (str: string) => {
    let words = str.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
};

const ProductPage = () => {
    const params = useParams();

    const [loading, error, data] = useBackendReq(`product/${params['id']}`);

    let product: Product;

    useEffect(() => {
        document.title = 'View Product | Matter';
    }, []);

    if (loading) {
        return <div className={cx('product')}>
            <div className={'page'}>
                Loading...
            </div>
        </div>
    } else if (error) {
        return <div className={cx('product')}>
            <div className={'page'}>
                {'Error :( : ' + error}
            </div>
        </div>
    } else {
        product = convertToProduct(data);
    }

    return <div className={cx('product')}>
        <div className={'page'}>
            <Breadcrumbs prev={[{text: product.category, link: `/search?cat=${product.category}`}]} current={product.name} />
            <div className={cx('product-info')}>
                <div className={cx('product-image')}>
                    <img src={product.image} alt={product.alt} className={cx('product-image')} />
                </div>
                <div className={cx('product-text')}>
                    <h2>{product.name}</h2>
                    <span className={cx('source')}>{fullSite(product.site)}</span>
                    <p>{product.category}</p>
                    {product.price && <h3>Price: {product.price}</h3>}
                    {product.description && <div className={cx('description')}>
                        <h4>Information on Material</h4>
                        {product.description}
                    </div>}
                    {product.otherFields && Object.entries(product.otherFields).map((field: any[]) => (
                        <div className={cx('field')} key={field[0]}>
                            <h4>{capitalize(field[0])}</h4>
                            {field[1]}
                        </div>
                    ))}
                    <div className={cx('buttons')}>
                        <button className={'primary'}>
                            <a href={product.link} className={cx('supply-link')} target={'_blank'} rel="noreferrer">
                                View on supplier's site <img src={externalLink} alt={''}/>
                            </a>
                        </button>
                        <button className={'quaternary'}>Save for Later</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default ProductPage;