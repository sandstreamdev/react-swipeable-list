import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import App from './App';

ReactDOM.render(
  <div className="application">
    <div className="smartphone">
      <div className="smartfone__content">
        <App />
      </div>
    </div>
    <footer className="footer smartfone__footer">
      <span>
        {`Made with ❤️ by `}
        <a className="footer__link" href="https://sanddev.com/">
          Sandstream Development
        </a>
      </span>
      <div>
        <span>
          <a
            className="footer__link"
            href="https://github.com/sandstreamdev/react-swipeable-list"
          >
            GitHub
          </a>
        </span>
        {` • `}
        <span>
          {`License: `}
          <a
            className="footer__link"
            href="https://github.com/sandstreamdev/react-swipeable-list/blob/master/LICENSE"
          >
            MIT
          </a>
        </span>
      </div>
    </footer>
  </div>,
  document.getElementById('root')
);
