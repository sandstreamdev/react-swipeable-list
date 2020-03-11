import React from 'react';
import ReactDOM from 'react-dom';

import styles from './app.module.css';
import App from './App';

ReactDOM.render(
  <div className={styles.testApp}>
    <div className={styles.smartphone}>
      <div className={styles.content}>
        <App />
      </div>
    </div>
    <footer>
      <span>
        {`Made with ❤️ by `}
        <a href="https://sanddev.com/">Sandstream Development</a>
      </span>
      <div>
        <span>
          <a href="https://github.com/sandstreamdev/react-swipeable-list">
            GitHub
          </a>
        </span>
        {` • `}
        <span>
          {`License: `}
          <a href="https://github.com/sandstreamdev/react-swipeable-list/blob/master/LICENSE">
            MIT
          </a>
        </span>
      </div>
    </footer>
  </div>,
  document.getElementById('root')
);
