import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import ListItem from './ListItem';
import ItemContent from './ItemContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../../images/icons';

import styles from '../app.module.css';

const ComplexList = () => {
  const [triggeredItemAction, triggerItemAction] = useState('None');
  const [swipeProgress, handleSwipeProgress] = useState();
  const [swipeAction, handleSwipeAction] = useState('None');
  const [items] = useState([
    { id: 1, text: 'First', description: 'first description' },
    { id: 2, text: 'Second', description: 'second description' },
    { id: 3, text: 'Third', description: 'third description' },
    { id: 4, text: 'Fourth', description: 'fourth description' }
  ]);

  const swipeRightOptions = name => ({
    content: (
      <ItemContent
        color="red"
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
      />
    ),
    action: () => triggerItemAction(`Delete action triggered on "${name}" item`)
  });

  const swipeLeftOptions = name => ({
    content: (
      <ItemContent
        color="green"
        icon={<ReplyIcon />}
        label="Reply"
        side="left"
      />
    ),
    action: () => triggerItemAction(`Reply action triggered on "${name}" item`)
  });

  const handleSwipeStart = () => {
    triggerItemAction('None');
    handleSwipeAction('Swipe started');
  };

  const handleSwipeEnd = () => {
    handleSwipeAction('Swipe ended');
    handleSwipeProgress();
  };

  const threshold = 0.25;

  return (
    <>
      <span className={styles.actionInfo}>
        List in smaller container (trigger threshold: {threshold})
      </span>
      <div className={styles.complexListContainer}>
        <SwipeableList threshold={threshold}>
          {items.map(({ id, text, description }) => (
            <SwipeableListItem
              key={id}
              swipeLeft={swipeLeftOptions(text)}
              swipeRight={swipeRightOptions(text)}
              onSwipeEnd={handleSwipeEnd}
              onSwipeProgress={handleSwipeProgress}
              onSwipeStart={handleSwipeStart}
            >
              <ListItem
                description={description}
                icon={<MailIcon />}
                name={text}
              />
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
      <div className={styles.summary}>
        <span className={styles.actionInfo}>Triggered action:</span>
        <span className={styles.actionInfoValue}>{triggeredItemAction}</span>
        <span className={styles.actionInfo}>Callback swipe action:</span>
        <span className={styles.actionInfoValue}>{swipeAction}</span>
        <span className={styles.actionInfo}>Callback swipe progress:</span>
        <span className={styles.actionInfoValue}>{swipeProgress ?? '-'}%</span>
      </div>
    </>
  );
};

export default ComplexList;
