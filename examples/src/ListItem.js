import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';

class ListItem extends PureComponent {
  render() {
    const { description, icon, name } = this.props;

    return (
      <div className="list-item-component">
        <div className="label">
          {icon && icon}
          <span className="name">{name}</span>
        </div>
        {description && <div className="description">{description}</div>}
      </div>
    );
  }
}

ListItem.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string
};

export default ListItem;
