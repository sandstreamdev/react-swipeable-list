import React, { PureComponent } from 'react';
import { enumerable } from '@sandstreamdev/std/object';

import BasicList from './basic/List';
import ComplexList from './complex/List';
import SizeToContentList from './size-to-content/List';
import AnimationsList from './animations/List';

import styles from './app.module.css';

const ExampleType = enumerable(
  'BASIC',
  'COMPLEX',
  'SIZE_TO_CONTENT',
  'ANIMATIONS'
);

const Examples = [
  { id: ExampleType.BASIC, text: 'Basic text items' },
  { id: ExampleType.COMPLEX, text: 'Complex items and scroll' },
  {
    id: ExampleType.SIZE_TO_CONTENT,
    text: 'List in size to content container'
  },
  { id: ExampleType.ANIMATIONS, text: 'Animations' }
];

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedExample: ExampleType.BASIC
    };
  }

  renderExample = () => {
    const { selectedExample } = this.state;

    switch (selectedExample) {
      case ExampleType.BASIC:
        return <BasicList />;
      case ExampleType.COMPLEX:
        return <ComplexList />;
      case ExampleType.SIZE_TO_CONTENT:
        return <SizeToContentList />;
      case ExampleType.ANIMATIONS:
        return <AnimationsList />;
    }

    return null;
  };

  handleSelectExample = event => {
    this.setState({ selectedExample: event.target.value });
  };

  render() {
    const { selectedExample } = this.state;

    return (
      <div className={styles.example}>
        <h1>react-swipeable-list example</h1>
        <h5>(try also mobile view in dev tools for touch events)</h5>
        <select value={selectedExample} onChange={this.handleSelectExample}>
          {Examples.map(item => (
            <option key={item.id} value={item.id}>
              {item.text}
            </option>
          ))}
        </select>
        {this.renderExample()}
      </div>
    );
  }
}

export default App;
