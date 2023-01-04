import React from "react";
import Styles from './Pagination.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

type PaginationProps = {
    numPages: number;
    maxVisible?: number;
    curPage: number;
    handleUpdate: (newPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
    const {numPages, maxVisible, curPage, handleUpdate} = props;

    const pages = Array.from({length: numPages}, (_, i) => i + 1);

    return (<div className={cx('pagination')}>
        {numPages > 1 && <button onClick={() => curPage > 1 && handleUpdate(curPage - 1)}>Previous</button>}
        {pages.map(page =>
            <button
                className={cx({'selected': page === curPage})}
                key={page}
                onClick={() => handleUpdate(page)}
            >{page}</button>
        )}
        {numPages > 1 && <button onClick={() => curPage < numPages && handleUpdate(curPage + 1)}>Next</button>}
    </div>)
};

export default Pagination;