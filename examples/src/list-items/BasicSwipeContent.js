import React from 'react';
import PropTypes from 'prop-types';

import './BasicSwipeContent.css';

const BasicSwipeContent = ({ direction, label }) => (
  <div className={`basic-swipeable-list__item-content-${direction}`}>
    <span>{label}</span>
  </div>
);

BasicSwipeContent.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  label: PropTypes.string
};

export default BasicSwipeContent;
