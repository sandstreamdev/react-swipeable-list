import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import ComplexListItem from '../list-items/ComplexListItem';
import ComplexSwipeContent from '../list-items/ComplexSwipeContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../../images/icons';

import './ComplexExample.css';

const ComplexExample = () => {
  const [triggeredItemAction, triggerItemAction] = useState('None');
  const [swipeProgress, handleSwipeProgress] = useState();
  const [swipeAction, handleSwipeAction] = useState('None');
  const [items] = useState([
    { id: 1, text: 'First', description: 'first description' },
    { id: 2, text: 'Second', description: 'second description' },
    { id: 3, text: 'Third', description: 'third description' },
    { id: 4, text: 'Fourth', description: 'fourth description' }
  ]);

  const swipeRightOptions = name => ({
    content: (
      <ComplexSwipeContent
        icon={<DeleteIcon />}
        label="Delete"
        position="left"
      />
    ),
    action: () => triggerItemAction(`Delete action triggered on "${name}" item`)
  });

  const swipeLeftOptions = name => ({
    content: (
      <ComplexSwipeContent
        icon={<ReplyIcon />}
        label="Reply"
        position="right"
      />
    ),
    action: () => triggerItemAction(`Reply action triggered on "${name}" item`)
  });

  const handleSwipeStart = () => {
    triggerItemAction('None');
    handleSwipeAction('Swipe started');
  };

  const handleSwipeEnd = () => {
    handleSwipeAction('Swipe ended');
    handleSwipeProgress();
  };

  const threshold = 0.25;

  return (
    <>
      <span className="page__action--title">
        List in smaller container (trigger threshold: {threshold})
      </span>
      <div className="complex-swipeable-list__container">
        <SwipeableList threshold={threshold}>
          {items.map(({ id, text, description }) => (
            <SwipeableListItem
              key={id}
              swipeLeft={swipeLeftOptions(text)}
              swipeRight={swipeRightOptions(text)}
              onSwipeEnd={handleSwipeEnd}
              onSwipeProgress={handleSwipeProgress}
              onSwipeStart={handleSwipeStart}
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
      <div className="page__summary">
        <span className="page__action--title">Triggered action:</span>
        <span className="page__action--value">{triggeredItemAction}</span>
        <span className="page__action--title">Callback swipe action:</span>
        <span className="page__action--value">{swipeAction}</span>
        <span className="page__action--title">Callback swipe progress:</span>
        <span className="page__action--value">{swipeProgress ?? '-'}%</span>
      </div>
    </>
  );
};

export default ComplexExample;
