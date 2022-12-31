import React, {useEffect, useMemo, useState} from "react";
import Select from 'react-select'
import Styles from './Search.module.scss';
import classNames from "classnames/bind";
import {useBackendReq} from "../../hooks";
import {Link, useSearchParams} from "react-router-dom";
import SearchResults from "../../components/SearchResults/SearchResults";

const cx = classNames.bind(Styles);

interface Category {
    name: string;
    image: string;
    alt: string;
}

interface SearchState {
    search?: string;
    category: string;
}

const Search = () => {
    const [search, setSearch] = useState('');
    const [showingResults, setShowingResults] = useState(false);
    const [searchState, setSearchState] = useState<SearchState>({category: 'all'});

    const [loading, , data] = useBackendReq('categories');

    const catOptions = useMemo(() => {
        if (loading) {
            return [ { value: 'loading', label: 'Loading Categories...' }];
        }
        const allOption = { value: 'all', label: 'All Categories'};
        let options = (data as Category[]).map(cat => ({ value: cat.name, label: cat.name }));
        options.unshift(allOption);
        return options;
    }, [data, loading])

    const [category, setCategory] = useState(catOptions[0]);

    useEffect(() => {
        setCategory(catOptions[0]);
    }, [catOptions, loading]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has('q')) {
            setSearch(searchParams.get('q') ?? '');
            setShowingResults(true);
        }
        if (searchParams.has('cat')) {
            setCategory(catOptions.find(cat =>
                cat.value.toLowerCase() === (searchParams.get('cat') ?? '').toLowerCase()
            ) ?? catOptions[0]);
            setShowingResults(true);
        }
    }, [catOptions, searchParams]);

    const displayCategories = (data: Category[]) => data.map(cat => (
        <div key={cat.name} className={cx('category')}>
            <img src={cat.image} alt={cat.alt} />
            {cat.name}
            <Link to={`/search?cat=${cat.name}`} className={cx('cat-link')} />
        </div>
    ));

    const handleSearch = () => {
        if (search !== '') {
            setSearchParams({'q': search, 'cat': category.value});
        } else {
            setSearchParams({'cat': category.value});
        }
        setSearchState({search: search, category: category.value})
        setShowingResults(true);
    }


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
                                onChange={cat => {
                                    setCategory(cat ? cat : catOptions[0]);
                                }}
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
                                    }),
                                    menu: (baseStyles) => ({
                                        ...baseStyles,
                                        zIndex: 2
                                    })
                                }}
                        />
                    </div>
                    <button className={'primary'} onClick={e => {
                        e.preventDefault();
                        handleSearch();
                    }}>Search</button>
                </form>
                {!showingResults ? <div className={cx('categories')}>
                    <h3>Find By Category</h3>
                    {!loading
                        ? <div className={cx('cat-grid')}>
                            {displayCategories(data as Category[])}
                        </div>
                        : 'Loading Categories...'
                    }
                </div> : <SearchResults {...searchState} />}
            </div>
        </div>
    );
};

export default Search;