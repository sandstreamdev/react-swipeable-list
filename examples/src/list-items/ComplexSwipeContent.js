import React from 'react';
import PropTypes from 'prop-types';

import './ComplexSwipeContent.css';

const ComplexSwipeConent = ({ direction, icon, label }) => (
  <div className={`complex-swipeable-list__item-content-${direction}`}>
    <div className="complex-swipeable-list__content">
      <span className="complex-swipeable-list__svg">{icon}</span>
      {label && <span>{label}</span>}
    </div>
  </div>
);

ComplexSwipeConent.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  icon: PropTypes.node,
  label: PropTypes.string
};

export default ComplexSwipeConent;
