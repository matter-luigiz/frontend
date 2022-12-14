import React from 'react';
import './global.scss';
import Styles from './App.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function App() {
  return (
    <div className={cx('App')}>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
