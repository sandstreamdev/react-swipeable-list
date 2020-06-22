import React from 'react';
import PropTypes from 'prop-types';

import './ComplexListItem.css';

const ComplexListItem = ({ description, icon, name }) => (
  <div className="complex-swipeable-list__item">
    <div className="complex-swipeable-list__item-label">
      <span className="complex-swipeable-list__item-icon">{icon}</span>
      <span className="complex-swipeable-list__item-name">{name}</span>
    </div>
    {description && (
      <div className="complex-swipeable-list__item-description">
        {description}
      </div>
    )}
  </div>
);

ComplexListItem.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string
};

export default ComplexListItem;
