import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableList.css';

const SwipeableList = ({ children, scrollElement, threshold }) => {
  const [blockSwipe, setBlockSwipe] = useState(false);

  useEffect(() => {
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollElement]);

  const handleDragStart = () => setBlockSwipe(false);

  const handleDragEnd = () => setBlockSwipe(false);

  const handleScroll = () => setBlockSwipe(true);

  return (
    <div
      className={styles.swipeableList}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onScroll={handleScroll}
      data-testid="list-wrapper"
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { blockSwipe, threshold })
      )}
    </div>
  );
};

SwipeableList.propTypes = {
  children: PropTypes.node,
  scrollElement: PropTypes.instanceOf(EventTarget),
  threshold: PropTypes.number
};

export default SwipeableList;
