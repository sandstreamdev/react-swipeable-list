import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SwipeableList.css';

class SwipeableList extends PureComponent {
  constructor(props) {
    super(props);

    this.dragging = false;

    // on list scrolling we block items swipe functionality
    this.state = { blockSwipe: false };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  onDragStartMouse = () => this.onDragStart();

  onDragStartTouch = () => this.onDragStart();

  onDragEndMouse = () => this.onDragEnd();

  onDragEndTouch = () => this.onDragEnd();

  onScroll = () => {
    const { blockSwipe } = this.state;

    if (this.dragging && !blockSwipe) {
      this.setState({ blockSwipe: true });
    }
  };

  onDragStart = () => {
    this.dragging = true;
    this.setState({ blockSwipe: false });
  };

  onDragEnd = () => {
    this.dragging = false;
    this.setState({ blockSwipe: false });
  };

  render() {
    const { children } = this.props;
    const { blockSwipe } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { blockSwipe })
    );

    return (
      <div
        className="swipeable-list"
        onMouseDown={this.onDragStartMouse}
        onTouchStart={this.onDragStartTouch}
        onScroll={this.onScroll}
      >
        {childrenWithProps}
      </div>
    );
  }
}

SwipeableList.propTypes = {
  children: PropTypes.node.isRequired
};

export default SwipeableList;
