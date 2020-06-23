import React from 'react';
import PropTypes from 'prop-types';

import './BasicListItem.css';

const BasicListItem = ({ label }) => (
  <div className="basic-swipeable-list__item">
    <span>{label}</span>
  </div>
);

BasicListItem.propTypes = {
  label: PropTypes.string
};

export default BasicListItem;
