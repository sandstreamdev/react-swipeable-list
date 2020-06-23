import React from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { noOp } from '@sandstreamdev/std/function';

import ComplexListItem from '../list-items/ComplexListItem';
import ComplexSwipeContent from '../list-items/ComplexSwipeContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../../images/icons';

import './SizeToContentExample.css';

const SizeToContentExample = () => {
  const items = [
    { id: 1, text: 'First', description: 'first description' },
    { id: 2, text: 'Second', description: 'second description' },
    { id: 3, text: 'Third', description: 'third description' },
    { id: 4, text: 'Fourth', description: 'fourth description' },
    { id: 5, text: 'Fifth', description: 'fifth description' },
    { id: 6, text: 'Sixth', description: 'sixth description' },
    { id: 7, text: 'Seventh', description: 'seventh description' },
    { id: 8, text: 'Eighth', description: 'eighth description' },
    { id: 9, text: 'Ninth', description: 'ninth description' },
    { id: 10, text: 'Tenth', description: 'tenth description' },
    { id: 11, text: 'Eleventh', description: 'eleventh description' },
    { id: 12, text: 'Twelfth', description: 'twelfth description' }
  ];

  const swipeRightOptions = () => ({
    content: (
      <ComplexSwipeContent
        icon={<DeleteIcon />}
        label="Delete"
        position="left"
      />
    ),
    action: noOp
  });

  const swipeLeftOptions = () => ({
    content: (
      <ComplexSwipeContent
        icon={<ReplyIcon />}
        label="Reply"
        position="right"
      />
    ),
    action: noOp
  });

  return (
    <div className="size-to-content-swipeable-list__container">
      <SwipeableList>
        {items.map(({ id, text, description }) => (
          <SwipeableListItem
            key={id}
            swipeLeft={swipeLeftOptions(text)}
            swipeRight={swipeRightOptions(text)}
          >
            <ComplexListItem
              description={description}
              icon={<MailIcon />}
              name={text}
            />
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default SizeToContentExample;
