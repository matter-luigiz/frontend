import React, {useState} from "react";
import Styles from './ProductTile.module.scss';
import classNames from "classnames/bind";
import {ReactComponent as Heart} from '../../icons/heart.svg';
import Product from "../../types/Product";

const cx = classNames.bind(Styles);

const ProductTile = (props: Product) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className={cx('tile')}>
            <div className={cx('image')}>
                <img src={props.imageUrl} alt={props.alt}/>
                <button className={cx('like')} onClick={() => setLiked(!liked)}>
                    <Heart className={cx({'liked': liked})} />
                </button>
            </div>
            <div className={cx('attributes')}>
                <span className={cx('name')}>{props.name}</span>
                <span className={cx('type')}>{props.type}</span>
                {props.price && <span className={cx('price')}>{`$${props.price}/kg`}</span>}
            </div>

        </div>
    );
};

export default ProductTile;