import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {
  ActionAnimation,
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { mapValues } from '@sandstreamdev/std/object';

import styles from '../app.module.css';
import transitionStyles from './transitions.module.css';

const SimpleList = () => {
  const [contentAnimation, setContentAnimation] = useState(
    ActionAnimation.REMOVE
  );
  const [listAnimations, setListAnimations] = useState('on');
  const [items, setItems] = useState(() => [
    { id: uuidv4(), text: 'Item 1' },
    { id: uuidv4(), text: 'Item 2' },
    { id: uuidv4(), text: 'Item 3' },
    { id: uuidv4(), text: 'Item 4' }
  ]);

  const addItem = () =>
    setItems([...items, { id: uuidv4(), text: `New item` }]);

  const swipeRightData = id => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Delete</span>
      </div>
    ),
    actionAnimation: contentAnimation,
    action: () => setItems(items => items.filter(item => item.id !== id))
  });

  const swipeLeftData = id => ({
    content: (
      <div className={styles.contentRight}>
        <span>Delete</span>
      </div>
    ),
    actionAnimation: contentAnimation,
    action: () => setItems(items => items.filter(item => item.id !== id))
  });

  const itemContent = name => (
    <div className={styles.listItem}>
      <span>{name}</span>
    </div>
  );

  const handleChangeActionAnimation = ({ target: { value } }) =>
    setContentAnimation(value);

  const handleChangeListAnimations = ({ target: { value } }) =>
    setListAnimations(value);

  return (
    <>
      <span className={styles.actionInfo}>
        Swipe to delete (trigger threshold: 0.33)
      </span>
      <div className={styles.listContainer}>
        <SwipeableList threshold={0.33}>
          {props => (
            <TransitionGroup
              className="todo-list"
              enter={listAnimations === 'on'}
              exit={listAnimations === 'on'}
            >
              {items.map(({ id, text }) => (
                <CSSTransition
                  key={id}
                  timeout={2500}
                  classNames={transitionStyles}
                >
                  <SwipeableListItem
                    key={id}
                    swipeLeft={swipeLeftData(id)}
                    swipeRight={swipeRightData(id)}
                    {...props}
                  >
                    {itemContent(text)}
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      </div>
      <button onClick={addItem}>Add item</button>
      <div className={styles.switcherRow}>
        <span>Item content animation:</span>
        <select
          onChange={handleChangeActionAnimation}
          value={contentAnimation}
          className={styles.switcher}
        >
          {mapValues(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))(ActionAnimation)}
        </select>
      </div>
      <div>
        <span>List content animations:</span>
        <select
          onChange={handleChangeListAnimations}
          value={listAnimations}
          className={styles.switcher}
        >
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>
      </div>
    </>
  );
};

export default SimpleList;
