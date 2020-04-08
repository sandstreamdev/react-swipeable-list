import React from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableList.css';

const SwipeableList = ({
  children,
  scrollStartThreshold,
  swipeStartThreshold,
  threshold,
  className,
  ...rest
}) => (
  <div
    className={`${styles.swipeableList} ${className}`}
    data-testid="list-wrapper"
    {...rest}
  >
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
  threshold: PropTypes.number,
  className: PropTypes.string
};

export default SwipeableList;
