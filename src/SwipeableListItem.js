import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableListItem.css';

const SwipeActionPropType = PropTypes.shape({
  action: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired
});

const DragDirection = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  UNKNOWN: 5
};

const FPS_INTERVAL = 1000 / 60;

class SwipeableListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.contentLeft = null;
    this.contentRight = null;
    this.listElement = null;
    this.requestedAnimationFrame = null;
    this.wrapper = null;

    this.startTime = null;

    this.previousSwipeDistancePercent = 0;

    this.resetState();
  }

  resetState = () => {
    this.dragStartPoint = { x: -1, y: -1 };
    this.dragDirection = DragDirection.UNKNOWN;
    this.left = 0;
    this.previousSwipeDistancePercent = 0;
  };

  get dragHorizontalDirectionThreshold() {
    return this.props.swipeStartThreshold || 10;
  }

  get dragVerticalDirectionThreshold() {
    return this.props.scrollStartThreshold || 10;
  }

  componentDidMount() {
    this.wrapper.addEventListener('mousedown', this.handleDragStartMouse);

    this.wrapper.addEventListener('touchstart', this.handleDragStartTouch);
    this.wrapper.addEventListener('touchend', this.handleDragEndTouch);
    this.wrapper.addEventListener('touchmove', this.handleTouchMove, {
      capture: true,
      passive: false
    });
  }

  componentWillUnmount() {
    if (this.requestedAnimationFrame) {
      cancelAnimationFrame(this.requestedAnimationFrame);

      this.requestedAnimationFrame = null;
    }

    this.wrapper.removeEventListener('mousedown', this.handleDragStartMouse);

    this.wrapper.removeEventListener('touchstart', this.handleDragStartTouch);
    this.wrapper.removeEventListener('touchend', this.handleDragEndTouch);
    this.wrapper.removeEventListener('touchmove', this.handleTouchMove, {
      capture: true,
      passive: false
    });
  }

  handleDragStartMouse = event => {
    window.addEventListener('mouseup', this.handleDragEndMouse);
    window.addEventListener('mousemove', this.handleMouseMove);

    this.wrapper.addEventListener('mouseup', this.handleDragEndMouse);
    this.wrapper.addEventListener('mousemove', this.handleMouseMove);

    this.handleDragStart(event);
  };

  handleDragStartTouch = event => {
    window.addEventListener('touchend', this.handleDragEndTouch);

    const touch = event.targetTouches[0];
    this.handleDragStart(touch);
  };

  handleDragStart = ({ clientX, clientY }) => {
    this.resetState();
    this.dragStartPoint = { x: clientX, y: clientY };

    this.listElement.className = styles.content;
    if (this.contentLeft !== null) {
      this.contentLeft.className = styles.contentLeft;
    }

    if (this.contentRight !== null) {
      this.contentRight.className = styles.contentRight;
    }

    this.startTime = Date.now();
    this.scheduleUpdatePosition();
  };

  handleMouseMove = event => {
    if (this.dragStartedWithinItem()) {
      const { clientX, clientY } = event;

      this.setDragDirection(clientX, clientY);

      if (this.isSwiping()) {
        event.stopPropagation();
        event.preventDefault();

        this.left = clientX - this.dragStartPoint.x;
        this.scheduleUpdatePosition();
      }
    }
  };

  handleTouchMove = event => {
    if (this.dragStartedWithinItem()) {
      const { clientX, clientY } = event.targetTouches[0];

      this.setDragDirection(clientX, clientY);

      if (!event.cancelable) {
        return;
      }

      if (this.isSwiping()) {
        event.stopPropagation();
        event.preventDefault();

        this.left = clientX - this.dragStartPoint.x;
        this.scheduleUpdatePosition();
      }
    }
  };

  handleDragEndMouse = () => {
    window.removeEventListener('mouseup', this.handleDragEndMouse);
    window.removeEventListener('mousemove', this.handleMouseMove);

    if (this.wrapper) {
      this.wrapper.removeEventListener('mouseup', this.handleDragEndMouse);
      this.wrapper.removeEventListener('mousemove', this.handleMouseMove);
    }

    this.handleDragEnd();
  };

  handleDragEndTouch = () => {
    window.removeEventListener('touchend', this.handleDragEndTouch);

    this.handleDragEnd();
  };

  handleDragEnd = () => {
    if (this.isSwiping()) {
      const threshold = this.props.threshold || 0.5;

      if (this.listElement) {
        if (this.left < this.listElement.offsetWidth * threshold * -1) {
          this.handleSwipedLeft();
        } else if (this.left > this.listElement.offsetWidth * threshold) {
          this.handleSwipedRight();
        }
      }

      if (this.props.onSwipeEnd) {
        this.props.onSwipeEnd();
      }
    }

    this.resetState();

    if (this.listElement) {
      this.listElement.className = styles.contentReturn;
      this.listElement.style.transform = `translateX(${this.left}px)`;
    }

    // hide backgrounds
    if (this.contentLeft !== null) {
      this.contentLeft.style.opacity = 0;
      this.contentLeft.className = styles.contentLeftReturn;
    }

    if (this.contentRight !== null) {
      this.contentRight.style.opacity = 0;
      this.contentRight.className = styles.contentRightReturn;
    }
  };

  dragStartedWithinItem = () => {
    const { x, y } = this.dragStartPoint;

    return x !== -1 && y !== -1;
  };

  setDragDirection = (x, y) => {
    if (this.dragDirection === DragDirection.UNKNOWN) {
      const { x: startX, y: startY } = this.dragStartPoint;
      const horizontalDistance = Math.abs(x - startX);
      const verticalDistance = Math.abs(y - startY);

      if (
        horizontalDistance <= this.dragHorizontalDirectionThreshold &&
        verticalDistance <= this.dragVerticalDirectionThreshold
      ) {
        return;
      }

      const angle = Math.atan2(y - startY, x - startX);
      const octant = Math.round((8 * angle) / (2 * Math.PI) + 8) % 8;

      switch (octant) {
        case 0:
          if (
            this.contentRight !== null &&
            horizontalDistance > this.dragHorizontalDirectionThreshold
          ) {
            this.dragDirection = DragDirection.RIGHT;
          }
          break;
        case 1:
        case 2:
        case 3:
          if (verticalDistance > this.dragVerticalDirectionThreshold) {
            this.dragDirection = DragDirection.DOWN;
          }
          break;
        case 4:
          if (
            this.contentLeft !== null &&
            horizontalDistance > this.dragHorizontalDirectionThreshold
          ) {
            this.dragDirection = DragDirection.LEFT;
          }
          break;
        case 5:
        case 6:
        case 7:
          if (verticalDistance > this.dragVerticalDirectionThreshold) {
            this.dragDirection = DragDirection.UP;
          }
          break;
      }

      if (this.props.onSwipeStart && this.isSwiping()) {
        this.props.onSwipeStart();
      }
    }
  };

  isSwiping = () => {
    const { blockSwipe } = this.props;
    const horizontalDrag =
      this.dragDirection === DragDirection.LEFT ||
      this.dragDirection === DragDirection.RIGHT;

    return !blockSwipe && this.dragStartedWithinItem() && horizontalDrag;
  };

  scheduleUpdatePosition = () => {
    if (this.requestedAnimationFrame) {
      return;
    }

    this.requestedAnimationFrame = requestAnimationFrame(() => {
      this.requestedAnimationFrame = null;

      this.updatePosition();
    });
  };

  get onlyLeftContent() {
    return this.contentLeft !== null && this.contentRight === null;
  }

  get onlyRightContent() {
    return this.contentLeft === null && this.contentRight !== null;
  }

  updatePosition = () => {
    const now = Date.now();
    const elapsed = now - this.startTime;

    if (elapsed > FPS_INTERVAL && this.isSwiping()) {
      let contentToShow = this.left < 0 ? this.contentLeft : this.contentRight;

      if (this.onlyLeftContent && this.left > 0) {
        this.left = 0;
        contentToShow = this.contentLeft;
      }

      if (this.onlyRightContent && this.left < 0) {
        this.left = 0;
        contentToShow = this.contentRight;
      }

      if (!contentToShow) {
        return;
      }

      if (this.listElement) {
        this.listElement.style.transform = `translateX(${this.left}px)`;
      }

      const opacity = (Math.abs(this.left) / 100).toFixed(2);

      if (this.props.onSwipeProgress && this.listElement) {
        const listElementWidth = this.listElement.offsetWidth;
        let swipeDistancePercent = this.previousSwipeDistancePercent;

        if (listElementWidth !== 0) {
          const swipeDistance = Math.max(
            0,
            listElementWidth - Math.abs(this.left)
          );

          swipeDistancePercent =
            100 - Math.round((100 * swipeDistance) / listElementWidth);
        }

        if (this.previousSwipeDistancePercent !== swipeDistancePercent) {
          this.props.onSwipeProgress(swipeDistancePercent);
          this.previousSwipeDistancePercent = swipeDistancePercent;
        }
      }

      if (opacity < 1 && opacity.toString() !== contentToShow.style.opacity) {
        contentToShow.style.opacity = opacity.toString();

        let contentToHide =
          this.left < 0 ? this.contentRight : this.contentLeft;

        if (contentToHide) {
          contentToHide.style.opacity = '0';
        }
      }

      if (opacity >= 1) {
        contentToShow.style.opacity = '1';
      }

      this.startTime = Date.now();
    }
  };

  handleSwipedLeft = () => {
    const { swipeLeft: { action } = {} } = this.props;

    if (action) {
      action();
    }
  };

  handleSwipedRight = () => {
    const { swipeRight: { action } = {} } = this.props;

    if (action) {
      action();
    }
  };

  bindContentLeft = ref => (this.contentLeft = ref);
  bindContentRight = ref => (this.contentRight = ref);
  bindListElement = ref => (this.listElement = ref);
  bindWrapper = ref => (this.wrapper = ref);

  render() {
    const { children, swipeLeft, swipeRight } = this.props;

    return (
      <div className={styles.swipeableListItem} ref={this.bindWrapper}>
        {swipeLeft && (
          <div
            ref={this.bindContentLeft}
            className={styles.contentLeft}
            data-testid="swipe-left-content"
          >
            {swipeLeft.content}
          </div>
        )}
        {swipeRight && (
          <div
            ref={this.bindContentRight}
            className={styles.contentRight}
            data-testid="swipe-right-content"
          >
            {swipeRight.content}
          </div>
        )}
        <div
          ref={this.bindListElement}
          className={styles.content}
          data-testid="content"
        >
          {children}
        </div>
      </div>
    );
  }
}

SwipeableListItem.propTypes = {
  blockSwipe: PropTypes.bool,
  children: PropTypes.node.isRequired,
  swipeLeft: SwipeActionPropType,
  swipeRight: SwipeActionPropType,
  scrollStartThreshold: PropTypes.number,
  swipeStartThreshold: PropTypes.number,
  threshold: PropTypes.number,

  onSwipeEnd: PropTypes.func,
  onSwipeProgress: PropTypes.func,
  onSwipeStart: PropTypes.func
};

export default SwipeableListItem;
