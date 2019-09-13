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
    this.wrapper.addEventListener('mouseup', this.onDragEndMouse);
    this.wrapper.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    this.wrapper.removeEventListener('mouseup', this.onDragEndMouse);
    this.wrapper.removeEventListener('touchend', this.onDragEndTouch);
  }

  onDragStartMouse = event => {
    this.onDragStart(event);
    this.wrapper.addEventListener('mousemove', this.onMouseMove);
  };

  onDragStartTouch = event => {
    const touch = event.targetTouches[0];
    this.onDragStart(touch);
    this.wrapper.addEventListener('touchmove', this.onTouchMove);
  };

  onDragStart = ({ clientX }) => {
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

  onDragEndMouse = () => {
    this.wrapper.removeEventListener('mousemove', this.onMouseMove);
    this.onDragEnd();
  };

  onDragEndTouch = () => {
    this.wrapper.removeEventListener('touchmove', this.onTouchMove);
    this.onDragEnd();
  };

  onDragEnd = () => {
    if (this.dragged && this.left !== 0) {
      this.dragged = false;

      const threshold = this.props.threshold || 0.5;

      if (this.left < this.listElement.offsetWidth * threshold * -1) {
        this.onSwipedLeft();
      } else if (this.left > this.listElement.offsetWidth * threshold) {
        this.onSwipedRight();
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
    }
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

  onMouseMove = ({ clientX }) => {
    const delta = clientX - this.dragStartX;

    if (this.shouldMoveItem(delta)) {
      this.left = delta;
    }
  };

  onTouchMove = event => {
    const touch = event.targetTouches[0];
    const delta = touch.clientX - this.dragStartX;

    if (this.shouldMoveItem(delta)) {
      this.left = delta;
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

  onSwipedLeft = () => {
    const { swipeLeft: { action } = {} } = this.props;

    if (action) {
      action();
    }
  };

  onSwipedRight = () => {
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
          <div ref={this.bindContentLeft} className={styles.contentLeft}>
            {swipeLeft.content}
          </div>
        )}
        {swipeRight && (
          <div ref={this.bindContentRight} className={styles.contentRight}>
            {swipeRight.content}
          </div>
        )}
        <div
          ref={this.bindListElement}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}
          className={styles.content}
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
