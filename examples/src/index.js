import React from 'react';
import ReactDOM from 'react-dom';

import styles from './app.css';
import App from './App';

ReactDOM.render(
  <div className={styles.testApp}>
    <div className={styles.smartphone}>
      <div className={styles.content}>
        <App />
      </div>
    </div>
  </div>,
  document.getElementById('root')
);
