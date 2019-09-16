import React from 'react';
import PropTypes from 'prop-types';

import styles from './ComplexListItem.css';

const ComplexListItem = ({ description, icon, name }) => (
  <div className={styles.listItemComponent}>
    <div className={styles.label}>
      {icon}
      <span className={styles.name}>{name}</span>
    </div>
    {description && <div className={styles.desciption}>{description}</div>}
  </div>
);

ComplexListItem.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string
};

export default ComplexListItem;
