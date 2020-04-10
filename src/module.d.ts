import * as React from 'react';

enum ActionAnimation {
  RETURN = 'RETURN',
  REMOVE = 'REMOVE',
  NONE = 'NONE'
}

export interface ISwipeableListProps {
  scrollStartThreshold?: number;
  swipeStartThreshold?: number;
  threshold?: number;
}

export class SwipeableList extends React.Component<ISwipeableListProps> {}

interface ISwipeActionProps {
  action: () => void;
  actionAnimation?: ActionAnimation;
  content: React.ReactNode;
}

interface ISwipeableListItemProps {
  blockSwipe?: boolean;
  swipeLeft?: ISwipeActionProps;
  swipeRight?: ISwipeActionProps;
  scrollStartThreshold?: number;
  swipeStartThreshold?: number;
  threshold?: number;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onSwipeProgress?: (progress: number) => void;
}

export class SwipeableListItem extends React.Component<
  ISwipeableListItemProps
> {}
