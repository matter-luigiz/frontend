import React, {useState} from "react";
import Select from 'react-select'
import Styles from './Search.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

const Search = () => {
    const [search, setSearch] = useState('');

    const catOptions = [
        { value: 'all', label: 'All Categories'},
        { value: 'fabrics', label: 'Fabrics'},
        { value: 'packaging', label: 'Packaging'}
    ];
    const [category, setCategory] = useState(catOptions[0]);


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
                                        borderRadius: '.4rem'
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
            </div>
        </div>
    );
};

export default Search;