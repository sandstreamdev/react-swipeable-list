import * as React from 'react';

interface ISwipeableListProps {
  scrollStartThreshold?: number;
  swipeStartThreshold?: number;
  threshold?: number;
}

export class SwipeableList extends React.Component<ISwipeableListProps> {}

interface ISwipeActionProps {
  action: () => void;
  content: React.ReactNode;
}

interface ISwipeableListItemProps {
  blockSwipe?: boolean;
  swipeLeft?: ISwipeActionProps;
  swipeRight?: ISwipeActionProps;
  scrollStartThreshold?: number;
  swipeStartThreshold?: number;
  threshold?: number;
}

export class SwipeableListItem extends React.Component<
  ISwipeableListItemProps
> {}
