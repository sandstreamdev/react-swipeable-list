import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { classNames } from '@sandstreamdev/std/web';
import { identity } from '@sandstreamdev/std/function';

import styles from '../app.module.css';
import customStyles from './custom.module.css';

const itemContent = name => (
  <div className={styles.listItem}>
    <span>{name}</span>
  </div>
);

const StyledList = () => {
  const items = [
    { id: uuidv4(), text: 'Item 1' },
    { id: uuidv4(), text: 'Item 2' },
    { id: uuidv4(), text: 'Item 3' },
    { id: uuidv4(), text: 'Item 4' }
  ];

  const swipeRightOptions = () => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Delete</span>
      </div>
    ),
    action: identity
  });

  const swipeLeftOptions = () => ({
    content: (
      <div className={styles.contentRight}>
        <span>Delete</span>
      </div>
    ),
    action: identity
  });

  return (
    <>
      <span className={styles.actionInfo}>
        Custom styled list wrapper width
      </span>
      <div className={styles.listContainer}>
        <SwipeableList>
          {({ className, ...rest }) => (
            <div
              className={classNames({
                [className]: true,
                [customStyles.customList]: true
              })}
            >
              {items.map(({ id, text }) => (
                <SwipeableListItem
                  key={id}
                  swipeLeft={swipeLeftOptions(id)}
                  swipeRight={swipeRightOptions(id)}
                  {...rest}
                >
                  {itemContent(text)}
                </SwipeableListItem>
              ))}
            </div>
          )}
        </SwipeableList>
      </div>
    </>
  );
};

export default StyledList;
