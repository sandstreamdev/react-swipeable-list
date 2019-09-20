<h1 align="center">react-swipeable-list</h1>
<h4 align="center" >Swipeable list component for React.</h4>
<div align="center">
  <img src="docs/example.gif"></img>
</div>

<p align="center">
  <a href="https://sandstreamdev.github.io/react-swipeable-list/">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors-">Contributors</a> •
  <a href="#license">License</a>
</p>

<hr />

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

## React Swipeable List component

A control to render list with swipeable items. Items can have action on left and right swipe. Swipe action triggering can be configured.

## Installation

```bash
npm install sandstreamdev/react-swipeable-list
# or via yarn
yarn add sandstreamdev/react-swipeable-list
```

## Usage

```jsx
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

NOTE: `SwipeableListItem` can be used without `SwipeableList` but swipe blocking on scroll needs to be handled.

## SwipeableList Props

### threshold

Type: `number`

How far swipe needs to be done to trigger attached action. `0.5` means that item needs to be swiped to half of its width, `0.25` - one-quarter of width.

## SwipeableListItem Props

### blockSwipe

Type: `boolean` (default: `false`)

If set to `true` all defined swipe actions are blocked. This is done by `SwipeableList` during scroll to prevent mouse move events to cause accidental swiping acitions.

### swipeLeft

Type: `Object`

Data for defining left swipe action and rendering content after item is swiped. The object requires following structure:

```js
{
  action,  // required: swipe action (function)
  content, // required: HTML or React component
}
```

### swipeRight

Same as `swipeLeft` but to right. :wink:

Type: `Object`

### threshold

Type: `number` (default: `0.5`)

Can be set for whole list or for every item. See `threshold` for `SwipeableList`.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sandstreamdevelopment"><img src="https://avatars2.githubusercontent.com/u/44231396?v=4" width="100px;" alt="sandstreamdevelopment"/><br /><sub><b>sandstreamdevelopment</b></sub></a><br /><a href="#business-sandstreamdevelopment" title="Business development">💼</a> <a href="#financial-sandstreamdevelopment" title="Financial">💵</a> <a href="#ideas-sandstreamdevelopment" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/marekrozmus"><img src="https://avatars3.githubusercontent.com/u/26272040?v=4" width="100px;" alt="marekrozmus"/><br /><sub><b>marekrozmus</b></sub></a><br /><a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Code">💻</a> <a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Documentation">📖</a> <a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jakubbogacz"><img src="https://avatars3.githubusercontent.com/u/26272028?v=4" width="100px;" alt="jakubbogacz"/><br /><sub><b>jakubbogacz</b></sub></a><br /><a href="#review-jakubbogacz" title="Reviewed Pull Requests">👀</a> <a href="#ideas-jakubbogacz" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](LICENSE).
