import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import ListItem from './ComplexListItem';
import ComplexItemContent from './ComplexItemContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../images/icons';
import styles from './app.module.css';

function App() {
  const [triggeredSimpleItemAction, triggerSimpleItemAction] = useState('');
  const [triggeredComplexItemAction, triggerComplexItemAction] = useState('');

  const swipeRightDataSimple = name => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Left content</span>
      </div>
    ),
    action: () => triggerSimpleItemAction(`Swipe right action on "${name}"`)
  });

  const swipeLeftDataSimple = name => ({
    content: (
      <div className={styles.contentRight}>
        <span>Right content</span>
      </div>
    ),
    action: () => triggerSimpleItemAction(`Swipe left action on "${name}"`)
  });

  const itemContentSimple = name => (
    <div className={styles.listItem}>
      <span>{name}</span>
    </div>
  );

  const swipeRightDataComplex = name => ({
    content: (
      <ComplexItemContent
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
        color="red"
      />
    ),
    action: () =>
      triggerComplexItemAction(`Delete action triggered on "${name}" item`)
  });

  const swipeLeftDataComplex = name => ({
    content: (
      <ComplexItemContent
        icon={<ReplyIcon />}
        label="Reply"
        color="green"
        side="left"
      />
    ),
    action: () =>
      triggerComplexItemAction(`Reply action triggered on "${name}" item`)
  });

  return (
    <div className={styles.example}>
      <h3>react-swipeable-list example</h3>
      <h5>(try also mobile view in dev tools for touch events)</h5>
      <h3>Simple example (with default 0.5 action trigger threshold)</h3>
      <span className={styles.actionInfo}>{triggeredSimpleItemAction}</span>
      <div className={styles.listContainer}>
        <SwipeableList>
          <SwipeableListItem
            swipeRight={swipeRightDataSimple('Item with swipe right')}
          >
            {itemContentSimple('Item with swipe right')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataSimple('Item with swipe left')}
          >
            {itemContentSimple('Item with swipe left')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeRight={swipeRightDataSimple('Item with both swipes')}
            swipeLeft={swipeLeftDataSimple('Item with both swipes')}
          >
            {itemContentSimple('Item with both swipes')}
          </SwipeableListItem>
          <SwipeableListItem>
            {itemContentSimple('Item without swipe actions')}
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <h3>
        More complex items and scroll (with 0.25 action trigger threshold)
      </h3>
      <h3>List in smaller container</h3>
      <span className={styles.actionInfo}>{triggeredComplexItemAction}</span>
      <div className={styles.complexListContainer}>
        <SwipeableList threshold={0.25}>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('First')}
            swipeRight={swipeRightDataComplex('First')}
          >
            <ListItem
              icon={<MailIcon />}
              name="first"
              description="first description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="second"
              description="second description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="third"
              description="third description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="fourth"
              description="fourth description"
            />
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <h3>List in size to content container</h3>
      <span className={styles.actionInfo}>{triggeredComplexItemAction}</span>
      <div className={styles.listContainer}>
        <SwipeableList threshold={0.25}>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('First')}
            swipeRight={swipeRightDataComplex('First')}
          >
            <ListItem
              icon={<MailIcon />}
              name="first"
              description="first description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="second"
              description="second description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="third"
              description="third description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="fourth"
              description="fourth description"
            />
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <div>THE END</div>
    </div>
  );
}

export default App;
