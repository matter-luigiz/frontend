import React, {useEffect, useMemo, useState} from "react";
import Select from 'react-select'
import Styles from './Search.module.scss';
import classNames from "classnames/bind";
import {useBackendReq} from "../../hooks";

const cx = classNames.bind(Styles);

interface Category {
    name: string;
    image: string;
    alt: string;
}

const Search = () => {
    const [search, setSearch] = useState('');

    const [loading, , data] = useBackendReq('categories');

    const catOptions = useMemo(() => !loading ? [
        { value: 'all', label: 'All Categories'},
        { value: 'fabrics', label: 'Fabrics'},
        { value: 'packaging', label: 'Packaging'}
    ] : [ { value: 'loading', label: 'Loading Categories...' }], [loading])
    const [category, setCategory] = useState(catOptions[0]);

    useEffect(() => {
        setCategory(catOptions[0]);
    }, [catOptions, loading]);

    const displayCategories = (data: Category[]) => data.map(cat => (
        <div key={cat.name} className={cx('category')}>
            <img src={cat.image} alt={cat.alt} />
            {cat.name}
        </div>
    ));


    return (
        <div className={cx('search')}>
            <div className={'page'}>
                <h1>Search for materials</h1>
                <form className={cx('searchbar')}>
                    <div className={cx('inputs')}>
                        <input
                            type={'text'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={'Keyword'}
                            className={cx('searchbox')}
                        />
                        <Select className={cx('cat-select')}
                                options={catOptions}
                                value={category}
                                onChange={cat => setCategory(cat ? cat : catOptions[0])}
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        borderWidth: '3px',
                                        borderColor: '#D9D9D9',
                                        height: '100%',
                                        borderRadius: '.4rem',
                                        transition: 'border-color .25s'
                                    }),
                                    option: (baseStyles, state) => ({
                                        ...baseStyles,
                                        backgroundColor: state.isSelected ? '#0B9160' :
                                            state.isFocused ? '#83DBBB' : '#FCFFFE'
                                    })
                                }}
                        />
                    </div>
                    <button className={'primary'}>Search</button>
                </form>

                <div className={cx('categories')}>
                    <h3>Find By Category</h3>
                    {!loading
                        ? <div className={cx('cat-grid')}>
                            {displayCategories(data as Category[])}
                        </div>
                        : 'Loading Categories...'
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;