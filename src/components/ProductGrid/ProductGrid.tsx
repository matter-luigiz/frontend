import React from "react";
import ProductTile from "../ProductTile/ProductTile";
import Product from "../../types/Product";
import Styles from "./ProductGrid.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({products}:ProductGridProps) => {
    return <div className={cx('product-grid')}>
        {products.map((product, index) => <ProductTile key={index} {...product} />)}
    </div>;
};

export default ProductGrid;