import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import styles from '../app.module.css';

const SimpleList = () => {
  const [triggeredItemAction, triggerItemAction] = useState('None');
  const [swipeProgress, handleSwipeProgress] = useState();
  const [swipeAction, handleSwipeAction] = useState('None');

  const swipeRightData = name => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Left content</span>
      </div>
    ),
    action: () => triggerItemAction(`Swipe right action on "${name}"`)
  });

  const swipeLeftData = name => ({
    content: (
      <div className={styles.contentRight}>
        <span>Right content</span>
      </div>
    ),
    action: () => triggerItemAction(`Swipe left action on "${name}"`)
  });

  const itemContent = name => (
    <div className={styles.listItem}>
      <span>{name}</span>
    </div>
  );

  const handleSwipeStart = () => {
    triggerItemAction('None');
    handleSwipeAction('Swipe started');
  };

  const handleSwipeEnd = () => {
    handleSwipeAction('Swipe ended');
    handleSwipeProgress();
  };

  return (
    <>
      <span className={styles.actionInfo}>Trigger threshold: 0.5</span>
      <div className={styles.listContainer}>
        <SwipeableList>
          <SwipeableListItem
            swipeRight={swipeRightData('Item with swipe right')}
            onSwipeStart={handleSwipeStart}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={handleSwipeProgress}
          >
            {itemContent('Item with swipe right')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftData('Item with swipe left')}
            onSwipeStart={handleSwipeStart}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={handleSwipeProgress}
          >
            {itemContent('Item with swipe left')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeRight={swipeRightData('Item with both swipes')}
            swipeLeft={swipeLeftData('Item with both swipes')}
            onSwipeStart={handleSwipeStart}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={handleSwipeProgress}
          >
            {itemContent('Item with both swipes')}
          </SwipeableListItem>
          <SwipeableListItem>
            {itemContent('Item without swipe actions')}
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <div className={styles.summary}>
        <span className={styles.actionInfo}>Triggered action:</span>
        <span className={styles.actionInfoValue}>{triggeredItemAction}</span>
        <span className={styles.actionInfo}>Callback swipe action:</span>
        <span className={styles.actionInfoValue}>{swipeAction}</span>
        <span className={styles.actionInfo}>Callback swipe progress:</span>
        <span className={styles.actionInfoValue}>
          {swipeProgress !== undefined ? swipeProgress : '-'}%
        </span>
      </div>
    </>
  );
};

export default SimpleList;
