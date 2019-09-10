import React, { useState } from 'react';
import { SwipeableList, SwipeableListItem } from 'react-swipeable-list';

import ListItem from './ListItem';
import ComplexItemBackground from './ComplexItemBackground';
import { ReactComponent as MailIcon } from '../images/mail.svg';
import { ReactComponent as ReplyIcon } from '../images/reply.svg';
import { ReactComponent as DeleteIcon } from '../images/delete.svg';
import './app.css';

function App() {
  const [triggeredSimpleItemAction, triggerSimpleItemAction] = useState('');
  const [triggeredComplexItemAction, triggerComplexItemAction] = useState('');

  return (
    <div className="example">
      <h3>react-swipeable-list example</h3>
      <h5>(switch on dev tools to mobile view)</h5>
      <h3>Simple example</h3>
      <div className="list-container">
        <SwipeableList>
          <SwipeableListItem
            swipeRight={{
              background: (
                <div className="background-left">
                  <span>Left background</span>
                </div>
              ),
              action: () =>
                triggerSimpleItemAction(
                  'Swipe right action on "Item with swipe right"'
                )
            }}
          >
            <div className="list-item">
              <span>Item with &apos;swipe right&apos;</span>
            </div>
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={{
              background: (
                <div className="background-right">
                  <span>Right background</span>
                </div>
              ),
              action: () =>
                triggerSimpleItemAction(
                  'Swipe left action on "Item with swipe left"'
                )
            }}
          >
            <div className="list-item">
              <span>Item with &apos;swipe left&apos;</span>
            </div>
          </SwipeableListItem>
          <SwipeableListItem
            swipeRight={{
              background: (
                <div className="background-left">
                  <span>Left background</span>
                </div>
              ),
              action: () =>
                triggerSimpleItemAction(
                  'Swipe right on "Item with both swipes"'
                )
            }}
            swipeLeft={{
              background: (
                <div className="background-right">
                  <span>Right background</span>
                </div>
              ),
              action: () =>
                triggerSimpleItemAction('Swipe left on "Item with both swipes"')
            }}
          >
            <div className="list-item">
              <span>Item with both swipes</span>
            </div>
          </SwipeableListItem>
          <SwipeableListItem>
            <div className="list-item">
              <span>Item without swipe actions</span>
            </div>
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <span className="action-info">{triggeredSimpleItemAction}</span>
      <h3>More complex items</h3>
      <div className="complex-list-container">
        <SwipeableList>
          <SwipeableListItem
            swipeLeft={{
              background: (
                <ComplexItemBackground
                  icon={<ReplyIcon />}
                  label="Reply"
                  color="green"
                  side="left"
                />
              ),
              action: () =>
                triggerComplexItemAction('Reply action triggered on first item')
            }}
            swipeRight={{
              background: (
                <ComplexItemBackground
                  icon={<DeleteIcon />}
                  label="Delete"
                  side="right"
                  color="red"
                />
              ),
              action: () =>
                triggerComplexItemAction(
                  'Delete action triggered on first item'
                )
            }}
          >
            <ListItem
              icon={<MailIcon />}
              name="first"
              description="first description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={{
              background: (
                <ComplexItemBackground
                  label="Reply"
                  side="left"
                  color="green"
                />
              ),
              action: () =>
                triggerComplexItemAction(
                  'Reply action triggered on second item'
                )
            }}
            swipeRight={{
              background: (
                <ComplexItemBackground
                  icon={<DeleteIcon />}
                  side="right"
                  color="red"
                />
              ),
              action: () =>
                triggerComplexItemAction(
                  'Delete action triggered on second item'
                )
            }}
          >
            <ListItem
              icon={<MailIcon />}
              name="second"
              description="second description"
            />
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <span className="action-info">{triggeredComplexItemAction}</span>
    </div>
  );
}

export default App;
