import React, { PureComponent } from 'react';
import { enumerable } from '@sandstreamdev/std/object';

import BasicExample from './basic/BasicExample';
import ComplexExample from './complex/ComplexExample';
import SizeToContentExample from './size-to-content/SizeToContentExample';
import AnimationsExample from './animations/AnimationsExample';
import StyledExample from './styled/StyledExample';

const ExampleType = enumerable(
  'BASIC',
  'COMPLEX',
  'SIZE_TO_CONTENT',
  'ANIMATIONS',
  'STYLED'
);

const Examples = [
  { id: ExampleType.BASIC, text: 'Basic text items' },
  { id: ExampleType.COMPLEX, text: 'Complex items and scroll' },
  {
    id: ExampleType.SIZE_TO_CONTENT,
    text: 'List in size to content container'
  },
  { id: ExampleType.ANIMATIONS, text: 'Animations' },
  { id: ExampleType.STYLED, text: 'Custom container' }
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
        return <BasicExample />;
      case ExampleType.COMPLEX:
        return <ComplexExample />;
      case ExampleType.SIZE_TO_CONTENT:
        return <SizeToContentExample />;
      case ExampleType.ANIMATIONS:
        return <AnimationsExample />;
      case ExampleType.STYLED:
        return <StyledExample />;
    }

    return null;
  };

  handleSelectExample = event => {
    this.setState({ selectedExample: event.target.value });
  };

  render() {
    const { selectedExample } = this.state;

    return (
      <div className="page-content">
        <h1 className="page-content__title">react-swipeable-list example</h1>
        <h2 className="page-content__subtitle">
          (try also mobile view in dev tools for touch events)
        </h2>
        <select
          className="page__select"
          value={selectedExample}
          onChange={this.handleSelectExample}
        >
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
