# react-swipeable-list

<h3 align="center">
  Swipeable list component for React.
</h3>

<p align="center">
  <strong>
    <a href="https://sandstreamdev.github.io/react-swipeable-list/">Demo</a>
  </strong>
</p>

## Installation

```bash
npm install sandstreamdev/react-swipeable-list
# or via yarn
yarn add sandstreamdev/react-swipeable-list
```

## Usage

```javascript jsx
<SwipeableList>
  <SwipeableListItem
    swipeLeft={{
      content: <div>Revealed content during swipe</div>,
      action: () => console.info('swipe action triggered')
    }}
    swipeRight={{
      content: <div>Revealed content during swipe</div>,
      action: () => console.info('swipe action triggered')
    }}
  >
    <div>Item name</div>
  </SwipeableListItem>
</SwipeableList>
```

## License

[MIT](LICENSE).
