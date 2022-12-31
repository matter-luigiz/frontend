import React from "react";
import {useBackendReq} from "../../hooks";
import Product from "../../types/Product";
import ProductGrid from "../ProductGrid/ProductGrid";
import Styles from './SearchResults.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);


type SearchProps = {
    search?: string;
    category: string;
}

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

const testproducts: Product[] = Array(30).fill(testprod);

const SearchResults = ({search, category}: SearchProps) => {

    const [loading, error, data] = useBackendReq(`search?cat=${category}${search ? `&q=${search}` : ''}`)

    let results: Product[];
    if (loading || error) {
        // return <div className={cx('product')}>
        //     <div className={'page'}>
        //         Loading...
        //     </div>
        // </div>
        results = testproducts;
    } else {
        results = data as Product[];
    }

    return <div className={cx('results')}>
        <p className={cx('results-count')}>
            {results.length} results
            {search ? ' for ' : ''} {search && <span>{search}</span>}
        </p>
        <ProductGrid products={results} />
    </div>

};

export default SearchResults;