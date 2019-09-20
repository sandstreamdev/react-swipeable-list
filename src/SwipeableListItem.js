import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './SwipeableListItem.css';

const SwipeActionPropType = PropTypes.shape({
  action: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired
});

class SwipeableListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.contentLeft = null;
    this.contentRight = null;
    this.listElement = null;
    this.wrapper = null;

    this.dragged = false;
    this.dragStartX = 0;
    this.left = 0;

    this.fpsInterval = 1000 / 60;
    this.startTime = null;
  }

  componentDidMount() {
    this.wrapper.addEventListener('mousedown', this.handleDragStartMouse);
    this.wrapper.addEventListener('touchstart', this.handleDragStartTouch);
  }

  componentWillUnmount() {
    this.wrapper.removeEventListener('mousedown', this.handleDragStartMouse);
    this.wrapper.removeEventListener('touchstart', this.handleDragStartTouch);
  }

  handleDragStartMouse = event => {
    event.stopPropagation();

    window.addEventListener('mouseup', this.handleDragEndMouse);
    window.addEventListener('mousemove', this.handleMouseMove);

    this.wrapper.addEventListener('mouseup', this.handleDragEndMouse);
    this.wrapper.addEventListener('mousemove', this.handleMouseMove);

    this.handleDragStart(event);
  };

  handleDragStartTouch = event => {
    // do not stop propagation here as it can be handled by parent to start scrolling

    window.addEventListener('touchend', this.handleDragEndTouch);

    this.wrapper.addEventListener('touchend', this.handleDragEndTouch);
    this.wrapper.addEventListener('touchmove', this.handleTouchMove);

    const touch = event.targetTouches[0];
    this.handleDragStart(touch);
  };

  handleDragStart = ({ clientX }) => {
    this.dragged = true;
    this.dragStartX = clientX;
    this.listElement.className = styles.content;
    if (this.contentLeft) {
      this.contentLeft.className = styles.contentLeft;
    }
    if (this.contentRight) {
      this.contentRight.className = styles.contentRight;
    }
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  };

  handleDragEndMouse = () => {
    window.removeEventListener('mouseup', this.handleDragEndMouse);
    window.removeEventListener('mousemove', this.handleMouseMove);

    this.wrapper.removeEventListener('mouseup', this.handleDragEndMouse);
    this.wrapper.removeEventListener('mousemove', this.handleMouseMove);

    this.handleDragEnd();
  };

  handleDragEndTouch = () => {
    window.removeEventListener('touchend', this.handleDragEndTouch);

    this.wrapper.removeEventListener('touchend', this.handleDragEndTouch);
    this.wrapper.removeEventListener('touchmove', this.handleTouchMove);

    this.handleDragEnd();
  };

  handleDragEnd = () => {
    if (this.dragged && this.left !== 0) {
      const threshold = this.props.threshold || 0.5;

      if (this.left < this.listElement.offsetWidth * threshold * -1) {
        this.handleSwipedLeft();
      } else if (this.left > this.listElement.offsetWidth * threshold) {
        this.handleSwipedRight();
      }
    }

    this.left = 0;
    this.listElement.className = styles.contentReturn;
    this.listElement.style.transform = `translateX(${this.left}px)`;

    // hide backgrounds
    if (this.contentLeft) {
      this.contentLeft.style.opacity = 0;
      this.contentLeft.className = styles.contentLeftReturn;
    }

    if (this.contentRight) {
      this.contentRight.style.opacity = 0;
      this.contentRight.className = styles.contentRightReturn;
    }

    this.dragged = false;
  };

  shouldMoveItem = delta => {
    const {
      swipeLeft: { content: contentLeft } = {},
      swipeRight: { content: contentRight } = {},
      blockSwipe
    } = this.props;
    const swipingLeft = delta < 0;
    const swipingRight = delta > 0;

    return (
      !blockSwipe &&
      ((swipingLeft && contentLeft) || (swipingRight && contentRight))
    );
  };

  handleMouseMove = event => {
    if (this.dragged) {
      event.stopPropagation();
      const delta = event.clientX - this.dragStartX;

      if (this.shouldMoveItem(delta)) {
        this.left = delta;
      }
    }
  };

  handleTouchMove = event => {
    if (this.dragged) {
      event.stopPropagation();
      const touch = event.targetTouches[0];
      const delta = touch.clientX - this.dragStartX;

      if (this.shouldMoveItem(delta)) {
        this.left = delta;
      }
    }
  };

  updatePosition = () => {
    const { blockSwipe } = this.props;
    if (blockSwipe) {
      this.dragged = false;
    }

    if (this.dragged) {
      requestAnimationFrame(this.updatePosition);
    }

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
      let contentToShow = this.left < 0 ? this.contentLeft : this.contentRight;
      let contentToHide = this.left < 0 ? this.contentRight : this.contentLeft;

      if (!contentToShow) {
        return;
      }

      const opacity = (Math.abs(this.left) / 100).toFixed(2);

      this.listElement.style.transform = `translateX(${this.left}px)`;

      if (opacity < 1 && opacity.toString() !== contentToShow.style.opacity) {
        contentToShow.style.opacity = opacity.toString();

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
  threshold: PropTypes.number
};

export default SwipeableListItem;
