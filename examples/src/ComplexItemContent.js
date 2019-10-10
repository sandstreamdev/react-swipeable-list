import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ComplexItemContent.module.css';

const ComplexItemConent = ({ icon, color, side, label }) => (
  <div
    className={classNames(styles.complexItemContent, {
      [styles.backgroundLeft]: side === 'left'
    })}
    style={{ background: color }}
  >
    <div className={styles.content}>
      {icon}
      {label && <span>{label}</span>}
    </div>
  </div>
);

ComplexItemConent.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right']).isRequired
};

export default ComplexItemConent;
