import React from 'react';
import './global.scss';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './routes/Home/Home';
import Learn from "./routes/Learn/Learn";
import Search from "./routes/Search/Search";
import Supply from "./routes/Supply/Supply";
import Header from "./components/Header/Header";
import ProductPage from "./routes/ProductPage/ProductPage";

function App() {
    const location = useLocation();

    const tabs = [
        { text: 'Find Materials', link: 'search', selected: location.pathname === '/search'},
        { text: 'Learn', link: 'learn', selected: location.pathname === '/learn'},
        { text: 'Suppliers: Get Listed', link: 'supply', selected: location.pathname === '/supply'}
    ];

    return (
        <div className={'App'}>
            <Header tabs={tabs}/>
            <Routes>
                <Route path={'/'} element={ <Home /> } />
                <Route path={'/learn'} element={ <Learn /> } />
                <Route path={'/search'} element={ <Search /> } />
                <Route path={'/supply'} element={ <Supply /> } />
                <Route path={'/product/:site/:id'} element={ <ProductPage /> } />
            </Routes>
        </div>
    )
}

export default App;
