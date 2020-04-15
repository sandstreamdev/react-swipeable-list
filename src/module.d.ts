import { FunctionComponent, PureComponent, ReactNode } from 'react';

export enum ActionAnimations {
  /**
   * Item returns to start position.
   */
  RETURN,
  /**
   * Item moves out of the screen.
   */
  REMOVE,
  /**
   * Item stays in place it was dragged to.
   */
  NONE
}

interface ISwipeActionProps {
  /**
   * Callback function that should be run when swipe is done beyond threshold.
   */
  action: () => void;
  /**
   * default: `RETURN`
   *
   * Animation type to be played swipe is done beyond threshold.
   */
  actionAnimation?: ActionAnimations;
  /**
   * Content that is revealed when swiping.
   */
  content: ReactNode;
}

interface ISwipeableListItemProps {
  /**
   * default: `false`
   *
   * If set to `true` all defined swipe actions are blocked.
   */
  blockSwipe?: boolean;
  /**
   * Data for defining left swipe action and rendering content after item is swiped.
   */
  swipeLeft?: ISwipeActionProps;
  /**
   * Data for defining right swipe action and rendering content after item is swiped.
   */
  swipeRight?: ISwipeActionProps;
  /**
   * default: `10`
   *
   * How far in pixels scroll needs to be done to block swiping. After scrolling is started and goes beyond the threshold, swiping is blocked.
   *
   * It can be set for the whole list or for every item. See `scrollStartThreshold` for `SwipeableList`. Value from the `SwipeableListItem` takes precedence.
   */
  scrollStartThreshold?: number;
  /**
   * default: `10`
   *
   * How far in pixels swipe needs to be done to start swiping on list item. After a swipe is started and goes beyond the threshold, scrolling is blocked.
   *
   * It can be set for the whole list or for every item. See `swipeStartThreshold` for `SwipeableList`. Value from the `SwipeableListItem` takes precedence.
   */
  swipeStartThreshold?: number;
  /**
   * default: `0.5`
   *
   * How far swipe needs to be done to trigger attached action. `0.5` means that item needs to be swiped to half of its width, `0.25` - one-quarter of width.
   *
   * It can be set for the whole list or for every item. See `threshold` for `SwipeableList`. Value from the `SwipeableListItem` takes precedence.
   */
  threshold?: number;
  /**
   * Fired after swipe has started (after drag gesture passes the `swipeStartThreshold` distance in pixels).
   */
  onSwipeStart?: () => void;
  /**
   * Fired after swipe has ended.
   */
  onSwipeEnd?: () => void;
  /**
   * Fired every time swipe progress changes. The reported `progress` value is always an integer in range 0 to 100 inclusive.
   */
  onSwipeProgress?: (progress: number) => void;
}

interface IBaseSwipeableListProps {
  /**
   * default: `10`
   *
   * How far in pixels scroll needs to be done to block swiping. After scrolling is started and goes beyond the threshold, swiping is blocked.
   *
   * It can be set for the whole list or for every item. See `scrollStartThreshold` for `SwipeableListItem`. Value from the `SwipeableListItem` takes precedence.
   */
  scrollStartThreshold?: number;
  /**
   * default: `10`
   *
   * How far in pixels swipe needs to be done to start swiping on list item. After a swipe is started and goes beyond the threshold, scrolling is blocked.
   *
   * It can be set for the whole list or for every item. See `swipeStartThreshold` for `SwipeableListItem`. Value from the `SwipeableListItem` takes precedence.
   */
  swipeStartThreshold?: number;
  /**
   * default: `0.5`
   *
   * How far swipe needs to be done to trigger attached action. `0.5` means that item needs to be swiped to half of its width, `0.25` - one-quarter of width.
   *
   * It can be set for the whole list or for every item. See `threshold` for `SwipeableListItem`. Value from the `SwipeableListItem` takes precedence.
   */
  threshold?: number;
}

interface IStyledSwipeableListProps extends IBaseSwipeableListProps {
  className: string;
}

type SwipeableListChildren =
  | ReactNode
  | ((props: IStyledSwipeableListProps) => ReactNode);

interface ISwipeableListProps extends IBaseSwipeableListProps {
  /**
   * A function child can be used instead of a SwipeableListItem elements. This function is
   * called with the SwipeableList props (scrollStartThreshold, swipeStartThreshold, threshold),
   * which can be used to apply context specific props to a component.
   * ```jsx
   *   <SwipeableList threshold={0.5}>
   *     {props => (
   *        <SwipeableListItme {...props} />
   *     )}
   *   </SwipeableList>
   * ```
   */
  children?: SwipeableListChildren;
}

export class SwipeableListItem extends PureComponent<ISwipeableListItemProps> {}

/**
 * NOTE: A function child can be used instead of a SwipeableListItem elements.
 */
export const SwipeableList: FunctionComponent<ISwipeableListProps>;
