import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SwipeableListItem.css';

class SwipeableListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.backgroundLeft = null;
    this.backgroundRight = null;
    this.listElement = null;
    this.wrapper = null;

    this.dragged = false;
    this.dragStartX = 0;
    this.left = 0;

    this.fpsInterval = 1000 / 60;
    this.startTime = null;
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  onDragStartMouse = evt => {
    this.onDragStart(evt);
    window.addEventListener('mousemove', this.onMouseMove);
  };

  onDragStartTouch = evt => {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch);
    window.addEventListener('touchmove', this.onTouchMove);
  };

  onDragStart = ({ clientX }) => {
    this.dragged = true;
    this.dragStartX = clientX;
    this.listElement.className = 'content';
    if (this.backgroundLeft) {
      this.backgroundLeft.className = 'background';
    }
    if (this.backgroundRight) {
      this.backgroundRight.className = 'background right';
    }
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  };

  onDragEndMouse = () => {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.onDragEnd();
  };

  onDragEndTouch = () => {
    window.removeEventListener('touchmove', this.onTouchMove);
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
      this.listElement.className = 'content return';
      this.listElement.style.transform = `translateX(${this.left}px)`;

      // hide backgrounds
      if (this.backgroundLeft) {
        this.backgroundLeft.style.opacity = 0;
        this.backgroundLeft.className = `${this.backgroundLeft.className} return`;
      }

      if (this.backgroundRight) {
        this.backgroundRight.style.opacity = 0;
        this.backgroundRight.className = `${this.backgroundRight.className} return`;
      }
    }
  };

  shouldMoveItem = delta => {
    const {
      swipeLeft: { background: backgroundLeft } = {},
      swipeRight: { background: backgroundRight } = {},
      blockSwipe
    } = this.props;
    const swipingLeft = delta < 0;
    const swipingRight = delta > 0;

    return (
      !blockSwipe &&
      ((swipingLeft && backgroundLeft) || (swipingRight && backgroundRight))
    );
  };

  onMouseMove = ({ clientX }) => {
    const delta = clientX - this.dragStartX;

    if (this.shouldMoveItem(delta)) {
      this.left = delta;
    }
  };

  onTouchMove = evt => {
    const touch = evt.targetTouches[0];
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
      let backgroundToShow =
        this.left < 0 ? this.backgroundLeft : this.backgroundRight;
      let backgroundToHide =
        this.left < 0 ? this.backgroundRight : this.backgroundLeft;

      if (!backgroundToShow) {
        return;
      }

      const opacity = (Math.abs(this.left) / 100).toFixed(2);

      this.listElement.style.transform = `translateX(${this.left}px)`;

      if (
        opacity < 1 &&
        opacity.toString() !== backgroundToShow.style.opacity
      ) {
        backgroundToShow.style.opacity = opacity.toString();

        if (backgroundToHide) {
          backgroundToHide.style.opacity = '0';
        }
      }

      if (opacity >= 1) {
        backgroundToShow.style.opacity = '1';
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

  render() {
    const { children, swipeLeft, swipeRight } = this.props;

    return (
      <div className="swipeable-list-item" ref={div => (this.wrapper = div)}>
        {swipeLeft && (
          <div ref={div => (this.backgroundLeft = div)} className="background">
            {swipeLeft.background}
          </div>
        )}
        {swipeRight && (
          <div
            ref={div => (this.backgroundRight = div)}
            className="background right"
          >
            {swipeRight.background}
          </div>
        )}
        <div
          ref={div => (this.listElement = div)}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}
          className="content"
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
  swipeLeft: PropTypes.shape({
    action: PropTypes.func.isRequired,
    background: PropTypes.node.isRequired
  }),
  swipeRight: PropTypes.shape({
    action: PropTypes.func.isRequired,
    background: PropTypes.node.isRequired
  }),
  threshold: PropTypes.number
};

export default SwipeableListItem;
