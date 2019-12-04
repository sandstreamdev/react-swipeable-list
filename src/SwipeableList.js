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
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        scrollStartThreshold,
        swipeStartThreshold,
        threshold
      })
    )}
  </div>
);

SwipeableList.propTypes = {
  children: PropTypes.node,
  scrollStartThreshold: PropTypes.number,
  swipeStartThreshold: PropTypes.number,
  threshold: PropTypes.number
};

export default SwipeableList;
