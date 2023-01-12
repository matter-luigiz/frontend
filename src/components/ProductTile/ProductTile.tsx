import React, {useState} from "react";
import Styles from './ProductTile.module.scss';
import classNames from "classnames/bind";
import {ReactComponent as Heart} from '../../icons/heart.svg';
import Product from "../../types/Product";
import {Link} from "react-router-dom";
import {fullSite} from "../../sites";

const cx = classNames.bind(Styles);

const ProductTile = (props: Product) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className={cx('tile')}>
            <div className={cx('image')}>
                <img src={props.image} alt={props.alt}/>
                <button className={cx('like')} onClick={() => setLiked(!liked)}>
                    <Heart className={cx({'liked': liked})} />
                </button>
            </div>
            <div className={cx('attributes-ctr')}>
                <div className={cx('attributes')}>
                    <span className={cx('name')}>{props.name}</span>
                    <span className={cx('type')}>{props.category}</span>
                    {props.price && <span className={cx('price')}>Price: {props.price}</span>}
                    <h4 className={cx('source')}>{fullSite(props.site)}</h4>
                </div>
            </div>
            <Link to={`/product/${props.site}/${props.id}`} className={cx('product-link')} />
        </div>
    );
};

export default ProductTile;