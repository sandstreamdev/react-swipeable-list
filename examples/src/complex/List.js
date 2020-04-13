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
    { id: 1, text: 'First', description: 'first decsription' },
    { id: 2, text: 'Second', description: 'second decsription' },
    { id: 3, text: 'Third', description: 'third decsription' },
    { id: 4, text: 'Fourth', description: 'fourth decsription' }
  ]);

  const swipeRightData = name => ({
    content: (
      <ItemContent
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
        color="red"
      />
    ),
    action: () => triggerItemAction(`Delete action triggered on "${name}" item`)
  });

  const swipeLeftData = name => ({
    content: (
      <ItemContent
        icon={<ReplyIcon />}
        label="Reply"
        color="green"
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

  return (
    <>
      <span className={styles.actionInfo}>
        List in smaller container (trigger threshold: 0.25)
      </span>
      <div className={styles.complexListContainer}>
        <SwipeableList threshold={0.25}>
          {items.map(({ id, text, description }) => (
            <SwipeableListItem
              key={id}
              swipeLeft={swipeLeftData(text)}
              swipeRight={swipeRightData(text)}
              onSwipeStart={handleSwipeStart}
              onSwipeEnd={handleSwipeEnd}
              onSwipeProgress={handleSwipeProgress}
            >
              <ListItem
                icon={<MailIcon />}
                name={text}
                description={description}
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
        <span className={styles.actionInfoValue}>
          {swipeProgress !== undefined ? swipeProgress : '-'}%
        </span>
      </div>
    </>
  );
};

export default ComplexList;
