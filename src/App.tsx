import React from 'react';
import Styles from './App.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function App() {
  return (
    <div className={cx('App')}>
      Hello, World!
    </div>
  );
}

export default App;
