import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './SwipeableList.css';

const SwipeableList = ({
  children,
  scrollStartThreshold,
  swipeStartThreshold,
  threshold,
  classes
}) =>
  typeof children === 'function' ? (
    children({
      className: clsx('swipeable-list', classes?.list),
      scrollStartThreshold,
      swipeStartThreshold,
      threshold
    })
  ) : (
    <div className={clsx('swipeable-list', classes?.list)}>
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  scrollStartThreshold: PropTypes.number,
  swipeStartThreshold: PropTypes.number,
  threshold: PropTypes.number,
  classes: PropTypes.shape({
    list: PropTypes.string
  })
};

export default SwipeableList;
