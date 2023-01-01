import React, {useMemo, useState} from "react";
import Styles from './Supply.module.scss';
import classNames from "classnames/bind";
import {useBackendReq} from "../../hooks";

const cx = classNames.bind(Styles);

interface Category {
    name: string;
    image: string;
    alt: string;
}

interface Upload {
    link?: string;
}

const Supply = () => {

    const [loading, , data] = useBackendReq('categories');

    const catOptions: string[] = useMemo(() => {
        if (loading) {
            return ['Loading Categories...'];
        }

        let options = data as Category[];
        options.push({name: 'Other', image: '', alt: ''});
        return options.map(opt => opt.name);
    }, [data, loading]);

    const [uploads, setUploads] = useState<Upload[]>([{link: ''}]);

    const renderCatBoxes = () => {
        return catOptions.map(catOption => <div key={catOption} className={cx('checkbox-ctr')}>
            <input id={catOption} type={'checkbox'} />
            <label htmlFor={catOption}>{catOption}</label>
        </div>);
    }

    const renderUploads = () => {
        return uploads.map((upload, ind) => <div key={upload.link} className={cx('upload')}>
            <label>Certificate {ind + 1}</label>
            <div className={cx('upload-inputs')}>
                <input type={'text'} className={'textinput'} placeholder={'Paste or type link'}/>
                OR
                <input type={'file'} className={cx('uploadinput')} accept={'application/pdf'}/>
            </div>
            {uploads.length === ind + 1 &&
                <button className={'quaternary'} onClick={e => {e.preventDefault(); setUploads(cur => cur.concat([{link: ''}]))}}>+ Add another certificate</button>}
        </div>);
    }

    return (
        <div className={cx('supply')}>
            <div className={'page'}>
                <div className={cx('heading')}>
                    <img src={''} alt={''}/>
                    <div className={cx('text')}>
                        <h1>Join our materials directory today as a
                            <span className={'green'}> sustainable or ethical</span> supplier.</h1>
                        <p>Fill out the following form with your supplier business information.
                            Our team will review your application and get back to you within 15 business days.</p>
                    </div>
                </div>
                <form className={cx('form')}>
                    <p className={cx('req')}>* = Required Field</p>
                    <div className={cx('contact')}>
                        <div className={cx('input-label')}>
                            <label htmlFor={'name'}>Supplier/Business Name*</label>
                            <input id={'name'} type={'text'} placeholder={'Type...'} className={'textinput'}/>
                        </div>

                        <div className={cx('input-label')}>
                            <label htmlFor={'email'}>Contact Email*</label>
                            <input id={'email'} type={'text'} placeholder={'Type...'} className={'textinput'}/>
                        </div>
                    </div>
                    <div className={cx('categories')}>
                        <label>Category(ies) of your materials*</label>
                        <div className={cx('boxes')}>
                            {renderCatBoxes()}
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <label htmlFor={'description'}>Further description or links to your products/materials/services*</label>
                        <textarea id={'description'} placeholder={'Type...'} className={'textinput'}/>
                    </div>
                    <div className={cx('certifications')}>
                        <label>Upload proof of certifications*</label>
                        <p>We accept links and PDFs including unique keys with validation that your certification is valid.
                            To learn about what kind of certifications we are looking for in suppliers that we showcase in our directory, go to Learn.</p>
                        <div className={cx('uploads')}>
                            {renderUploads()}
                        </div>
                    </div>
                    <button className={'primary'} onClick={e => e.preventDefault()}>Submit supplier application</button>
                </form>
            </div>
        </div>
    );
};

export default Supply;