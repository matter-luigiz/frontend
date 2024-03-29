import React from "react";
import {useBackendReq} from "../../hooks";
import Product, {convertToProduct} from "../../types/Product";
import ProductGrid from "../ProductGrid/ProductGrid";
import Styles from './SearchResults.module.scss';
import classNames from "classnames/bind";
import Pagination from "../Pagination/Pagination";

const cx = classNames.bind(Styles);


type SearchProps = {
    search?: string;
    category: string;
    page: number;
    updatePage: (newPage: number) => void;
}

const SearchResults = ({search, category, page, updatePage}: SearchProps) => {

    const [loading, error, data] = useBackendReq(`search?cat=${category}&p=${page}${search ? `&q=${search}` : ''}`);

    let results: Product[];
    let count: number;
    if (loading || error) {
        return <div className={cx('product')}>
            <div className={'page'}>
                Loading...
            </div>
        </div>
    } else {
        const res = data as {data: any[], size: number};
        results = (res.data).map(convertToProduct) as Product[];
        count = res.size;
    }

    return <div className={cx('results')}>
        <p className={cx('results-count')}>
            {count} results
            {search ? ' for ' : ''} {search && <span>{search}</span>}
        </p>
        <ProductGrid products={results} />
        <div className={cx('pagination-ctr')}>
            <Pagination numPages={Math.ceil(count / 20)} curPage={page} handleUpdate={updatePage}/>
        </div>
    </div>

};

export default SearchResults;