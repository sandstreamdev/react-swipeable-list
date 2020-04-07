import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import styles from './app.module.css';
import transitionStyles from './transitions.module.css';

function App() {
  const [items, setItems] = useState([
    { id: uuidv4(), text: 'Buy eggs' },
    { id: uuidv4(), text: 'Pay bills' },
    { id: uuidv4(), text: 'Invite friends over' },
    { id: uuidv4(), text: 'Fix the TV' }
  ]);

  return (
    <SwipeableList>
      {props => (
        <TransitionGroup className="todo-list">
          {items.map(({ id, text }) => (
            <CSSTransition
              key={id}
              timeout={2500}
              classNames={transitionStyles}
            >
              <SwipeableListItem
                swipeRight={{
                  content: (
                    <div className={styles.contentLeft}>
                      <span>Left content</span>
                    </div>
                  ),
                  endAnimation: 'delete',
                  action: () =>
                    setItems(items => items.filter(item => item.id !== id))
                }}
                {...props}
              >
                <div className={styles.listItem}>
                  <span>{text}</span>
                </div>
              </SwipeableListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </SwipeableList>
  );
}

export default App;
