import React, {useCallback, useEffect, useMemo, useState} from "react";
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
    const [page, setPage] = useState(1);

    const [loading, , data] = useBackendReq('categories');

    const catOptions = useMemo(() => {
        if (loading) {
            return [ { value: 'loading', label: 'Loading Categories...' }];
        }
        const allOption = { value: 'all', label: 'All Categories'};
        let options = (data as Category[]).map(cat => ({ value: cat.name, label: cat.name }));
        options.unshift(allOption);
        return options;
    }, [data, loading]);

    const [searchParams, setSearchParams] = useSearchParams();

    const findCategory = useCallback(() => (catOptions.find(cat =>
        cat.value.toLowerCase() === (searchParams.get('cat') ?? '').toLowerCase()
    ) ?? catOptions[0]), [catOptions, searchParams]);

    const [category, setCategory] = useState(catOptions[0]);
    const [searchState, setSearchState] = useState<SearchState>({category: 'all'});

    useEffect(() => {
        if (searchParams.has('q')) {
            setSearch(searchParams.get('q') ?? '');
            setShowingResults(true);
            setSearchState(state => ({...state, search: searchParams.get('q') ?? ''}));
        }
        if (searchParams.has('cat') && !loading) {
            setCategory(findCategory());
            setShowingResults(true);
            setSearchState(state => ({...state, category: findCategory().value}));
        } else if (!loading) {
            setCategory(catOptions[0]);
        }

        if (!searchParams.has('q') && !searchParams.has('cat')) {
            setShowingResults(false);
        }
    }, [catOptions, findCategory, searchParams, loading]);

    useEffect(() => {
        if (searchParams.has('p')) {
            setPage(parseInt(searchParams.get('p') ?? '1'));
        } else {
            setPage(1);
        }
    }, [searchParams]);

    const displayCategories = (data: Category[]) => data.map(cat => (
        <div key={cat.name} className={cx('category')}>
            <img src={cat.image} alt={cat.alt} />
            {cat.name}
            <Link to={`/search?cat=${cat.name}`} className={cx('cat-link')} />
        </div>
    ));

    const handleSearch = (newPage?: number) => {
        const pageToSet = newPage ?? 1;
        if (search !== '' && newPage !== 1) {
            setSearchParams({'q': search, 'cat': category.value, 'p': pageToSet.toString()});
        } else if (newPage !== 1) {
            setSearchParams({'cat': category.value, 'p': pageToSet.toString()});
        } else {
            setSearchParams({'cat': category.value});
        }
        setSearchState({search: search, category: category.value})
        setShowingResults(true);
    }

    const handlePageUpdate = (newPage: number) => {
        setPage(newPage);
        handleSearch(newPage);
    };


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
                            className={'textinput'}
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
                {!showingResults || loading ? <div className={cx('categories')}>
                    <h3>Find By Category</h3>
                    {!loading
                        ? <div className={cx('cat-grid')}>
                            {displayCategories(data as Category[])}
                        </div>
                        : 'Loading Categories...'
                    }
                </div> : <SearchResults {...searchState} page={page} updatePage={handlePageUpdate} />}
            </div>
        </div>
    );
};

export default Search;