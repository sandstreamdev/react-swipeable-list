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
    swipeRight={{
      background: <div>Left background</div>,
      action: () => console.info('swipe action triggered')
    }}
  >
    <div>Item name</div>
  </SwipeableListItem>
</SwipeableList>
```

## License

[MIT](LICENSE).
