import React from 'react';
import PropTypes from 'prop-types';

import './ComplexItemBackground.css';

const ComplexItemBackground = ({ icon, color, side, label }) => (
  <div className={`complex-list-item-background ${color} ${side}`}>
    <div className="content">
      {icon && icon}
      {label && <span>{label}</span>}
    </div>
  </div>
);

ComplexItemBackground.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
  side: PropTypes.string.isRequired
};

export default ComplexItemBackground;
