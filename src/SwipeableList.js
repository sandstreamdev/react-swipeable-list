import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableList.css';

const SwipeableList = ({ children }) => {
  const [blockSwipe, setBlockSwipe] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);

    return () => {
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  const onDragStart = () => {
    setBlockSwipe(false);
    setDragging(true);
  };

  const onDragEnd = () => {
    setBlockSwipe(false);
    setDragging(false);
  };

  const onScroll = () => {
    if (dragging && !blockSwipe) {
      setBlockSwipe(true);
    }
  };

  return (
    <div
      className={styles.swipeableList}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onScroll={onScroll}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { blockSwipe })
      )}
    </div>
  );
};

SwipeableList.propTypes = {
  children: PropTypes.node
};

export default SwipeableList;
