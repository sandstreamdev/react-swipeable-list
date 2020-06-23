import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { classNames } from '@sandstreamdev/std/web';
import { noOp } from '@sandstreamdev/std/function';

import BasicListItem from '../list-items/BasicListItem';
import BasicSwipeContent from '../list-items/BasicSwipeContent';

import './StyledExample.css';

const StyledExample = () => {
  const items = [
    { id: uuidv4(), text: 'Item 1' },
    { id: uuidv4(), text: 'Item 2' },
    { id: uuidv4(), text: 'Item 3' },
    { id: uuidv4(), text: 'Item 4' }
  ];

  const swipeRightOptions = () => ({
    content: <BasicSwipeContent label="Delete" position="left" />,
    action: noOp
  });

  const swipeLeftOptions = () => ({
    content: <BasicSwipeContent label="Delete" position="right" />,
    action: noOp
  });

  return (
    <>
      <span className="page__action--title">Custom styled list wrapper</span>
      <div className="styled-swipeable-list__container">
        <SwipeableList>
          {({ className, ...rest }) => (
            <div className={classNames(className, 'styled-swipeable-list')}>
              {items.map(({ id, text }) => (
                <SwipeableListItem
                  key={id}
                  swipeLeft={swipeLeftOptions(id)}
                  swipeRight={swipeRightOptions(id)}
                  {...rest}
                >
                  <BasicListItem label={text} />
                </SwipeableListItem>
              ))}
            </div>
          )}
        </SwipeableList>
      </div>
    </>
  );
};

export default StyledExample;
