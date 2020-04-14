import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {
  ActionAnimations,
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { findKey, mapEntries } from '@sandstreamdev/std/object';

import styles from '../app.module.css';
import transitionStyles from './transitions.module.css';

const itemContent = name => (
  <div className={styles.listItem}>
    <span>{name}</span>
  </div>
);

const SimpleList = () => {
  const [contentAnimation, setContentAnimation] = useState(
    ActionAnimations.REMOVE
  );
  const [listAnimations, setListAnimations] = useState(true);
  const [items, setItems] = useState(() => [
    { id: uuidv4(), text: 'Item 1' },
    { id: uuidv4(), text: 'Item 2' },
    { id: uuidv4(), text: 'Item 3' },
    { id: uuidv4(), text: 'Item 4' }
  ]);

  const deleteItemById = id =>
    setItems(items => items.filter(item => item.id !== id));

  const addItem = () =>
    setItems([...items, { id: uuidv4(), text: `New item` }]);

  const swipeRightOptions = id => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Delete</span>
      </div>
    ),
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id)
  });

  const swipeLeftOptions = id => ({
    content: (
      <div className={styles.contentRight}>
        <span>Delete</span>
      </div>
    ),
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id)
  });

  const handleChangeActionAnimation = ({ target: { value } }) =>
    setContentAnimation(ActionAnimations[value]);

  const handleChangeListAnimations = ({ target: { value } }) =>
    setListAnimations(value === 'true');

  const threshold = 0.33;
  const transitionTimeout = 2500;

  return (
    <>
      <span className={styles.actionInfo}>
        Swipe to delete (trigger threshold: {threshold})
      </span>
      <div className={styles.listContainer}>
        <SwipeableList threshold={threshold}>
          {({ scrollStartThreshold, swipeStartThreshold, threshold }) => (
            <TransitionGroup
              className="todo-list"
              enter={listAnimations}
              exit={listAnimations}
            >
              {items.map(({ id, text }) => (
                <CSSTransition
                  classNames={transitionStyles}
                  key={id}
                  timeout={transitionTimeout}
                >
                  <SwipeableListItem
                    key={id}
                    scrollStartThreshold={scrollStartThreshold}
                    swipeLeft={swipeLeftOptions(id)}
                    swipeRight={swipeRightOptions(id)}
                    swipeStartThreshold={swipeStartThreshold}
                    threshold={threshold}
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
          className={styles.switcher}
          value={findKey(value => value === contentAnimation)(ActionAnimations)}
          onChange={handleChangeActionAnimation}
        >
          {mapEntries((value, key) => (
            <option key={key} value={key}>
              {value.description}
            </option>
          ))(ActionAnimations)}
        </select>
      </div>
      <div>
        <span>List content animations:</span>
        <select
          className={styles.switcher}
          value={listAnimations}
          onChange={handleChangeListAnimations}
        >
          <option value="true">ON</option>
          <option value="false">OFF</option>
        </select>
      </div>
    </>
  );
};

export default SimpleList;
