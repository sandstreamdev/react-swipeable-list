import React from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { identity } from '@sandstreamdev/std/function';

import ListItem from '../complex/ListItem';
import ItemContent from '../complex/ItemContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../../images/icons';

import styles from '../app.module.css';

const SizeToContentList = () => {
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
      <ItemContent
        color="red"
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
      />
    ),
    action: identity
  });

  const swipeLeftOptions = () => ({
    content: (
      <ItemContent
        color="green"
        icon={<ReplyIcon />}
        label="Reply"
        side="left"
      />
    ),
    action: identity
  });

  return (
    <div className={styles.listContainer}>
      <SwipeableList>
        {items.map(({ id, text, description }) => (
          <SwipeableListItem
            key={id}
            swipeLeft={swipeLeftOptions(text)}
            swipeRight={swipeRightOptions(text)}
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
  );
};

export default SizeToContentList;
