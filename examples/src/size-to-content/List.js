import React, { useState } from 'react';
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
  const [items] = useState([
    { id: 1, text: 'First', description: 'first decsription' },
    { id: 2, text: 'Second', description: 'second decsription' },
    { id: 3, text: 'Third', description: 'third decsription' },
    { id: 4, text: 'Fourth', description: 'fourth decsription' },
    { id: 5, text: 'Fifth', description: 'fifth decsription' },
    { id: 6, text: 'Sixth', description: 'sixth decsription' },
    { id: 7, text: 'Seventh', description: 'seventh decsription' },
    { id: 8, text: 'Eighth', description: 'eighth decsription' },
    { id: 9, text: 'Ninth', description: 'ninth decsription' },
    { id: 10, text: 'Tenth', description: 'tenth decsription' },
    { id: 11, text: 'Eleventh', description: 'eleventh decsription' },
    { id: 12, text: 'Twelfth', description: 'twelfth decsription' }
  ]);

  const swipeRightData = () => ({
    content: (
      <ItemContent
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
        color="red"
      />
    ),
    action: identity
  });

  const swipeLeftData = () => ({
    content: (
      <ItemContent
        icon={<ReplyIcon />}
        label="Reply"
        color="green"
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
            swipeLeft={swipeLeftData(text)}
            swipeRight={swipeRightData(text)}
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
  );
};

export default SizeToContentList;
