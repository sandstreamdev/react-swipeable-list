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

import BasicListItem from '../list-items/BasicListItem';
import BasicSwipeContent from '../list-items/BasicSwipeContent';

import './AnimationsExample.css';

const AnimationsExample = () => {
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
    content: <BasicSwipeContent label="Delete" position="left" />,
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id)
  });

  const swipeLeftOptions = id => ({
    content: <BasicSwipeContent label="Delete" position="right" />,
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
      <span className="page__action--title">
        Swipe to delete (trigger threshold: {threshold})
      </span>
      <div className="animations-swipeable-list__container">
        <SwipeableList threshold={threshold}>
          {({
            className,
            scrollStartThreshold,
            swipeStartThreshold,
            threshold
          }) => (
            <TransitionGroup
              className={className}
              enter={listAnimations}
              exit={listAnimations}
            >
              {items.map(({ id, text }) => (
                <CSSTransition
                  classNames="my-node"
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
                    <BasicListItem label={text} />
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      </div>
      <button className="page__button" onClick={addItem}>
        Add item
      </button>
      <div className="animations__switcher-row">
        <span>Item content animation:</span>
        <select
          className="page__select animations__switcher"
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
          className="page__select animations__switcher"
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

export default AnimationsExample;
