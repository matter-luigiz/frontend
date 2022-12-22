import React from 'react';
import './global.scss';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home/Home';
import Learn from "./routes/Learn/Learn";
import Search from "./routes/Search/Search";
import Supply from "./routes/Supply/Supply";

function App() {
    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} element={ <Home /> } />
                <Route path={'/learn'} element={ <Learn /> } />
                <Route path={'/search'} element={ <Search /> } />
                <Route path={'/supply'} element={ <Supply /> } />
            </Routes>
        </div>
    )
}

export default App;
