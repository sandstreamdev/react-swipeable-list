import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import SwipeableList from '../SwipeableList';
import SwipeableListItem from '../SwipeableListItem';
import { swipeLeftMouse } from './helpers';

afterEach(cleanup);

test('list rendering with items', () => {
  const { getByText } = render(
    <SwipeableList>
      <SwipeableListItem>
        <span>Item content 1</span>
      </SwipeableListItem>
      <SwipeableListItem>
        <span>Item content 2</span>
      </SwipeableListItem>
    </SwipeableList>
  );

  expect(getByText('Item content 1')).toBeInTheDocument();
  expect(getByText('Item content 2')).toBeInTheDocument();
});

test('blocking swipe on scroll', () => {
  const callbackLeft = jest.fn();

  const { queryAllByTestId, getByTestId } = render(
    <SwipeableList>
      <SwipeableListItem
        swipeLeft={{
          content: <span>Left swipe content</span>,
          action: callbackLeft
        }}
      >
        <span>Item content 1</span>
      </SwipeableListItem>
      <SwipeableListItem>
        <span>Item content 2</span>
      </SwipeableListItem>
    </SwipeableList>
  );

  const listItem = queryAllByTestId('content')[0];
  const listContainer = getByTestId('list-wrapper');

  // try to swipe - should work
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(1);

  fireEvent.mouseDown(listContainer, {
    clientX: 100,
    clientY: 20
  });
  fireEvent.scroll(listContainer, { target: { scrollY: 100 } });

  // block swipe should be on
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(1);

  fireEvent.mouseUp(listContainer);

  // swiping should be possible again
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(2);
});

test('blocking swipe on scrollElement scroll', () => {
  const callbackLeft = jest.fn();

  const { queryAllByTestId } = render(
    <SwipeableList scrollElement={window.document}>
      <SwipeableListItem
        swipeLeft={{
          content: <span>Left swipe content</span>,
          action: callbackLeft
        }}
      >
        <span>Item content 1</span>
      </SwipeableListItem>
    </SwipeableList>
  );

  const listItem = queryAllByTestId('content')[0];

  // try to swipe - should work
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(1);

  fireEvent.scroll(window.document, { target: { scrollY: 100 } });

  // block swipe should be on
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(1);

  fireEvent.mouseUp(window.document);

  // swiping should be possible again
  swipeLeftMouse(listItem);
  expect(callbackLeft).toHaveBeenCalledTimes(2);
});
