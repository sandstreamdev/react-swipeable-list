# react-swipeable-list

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
