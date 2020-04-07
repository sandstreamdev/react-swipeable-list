import React from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableList.css';

const SwipeableList = ({
  children,
  scrollStartThreshold,
  swipeStartThreshold,
  threshold
}) => (
  <div className={styles.swipeableList} data-testid="list-wrapper">
    {typeof children === 'function'
      ? children({ scrollStartThreshold, swipeStartThreshold, threshold })
      : React.Children.map(children, child =>
          React.cloneElement(child, {
            scrollStartThreshold,
            swipeStartThreshold,
            threshold
          })
        )}
  </div>
);

SwipeableList.propTypes = {
  children: PropTypes.any,
  scrollStartThreshold: PropTypes.number,
  swipeStartThreshold: PropTypes.number,
  threshold: PropTypes.number
};

export default SwipeableList;
