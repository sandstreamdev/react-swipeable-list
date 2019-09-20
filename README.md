# react-swipeable-list
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/marekrozmus"><img src="https://avatars3.githubusercontent.com/u/26272040?v=4" width="100px;" alt="marekrozmus"/><br /><sub><b>marekrozmus</b></sub></a><br /><a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Code">💻</a> <a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Documentation">📖</a> <a href="https://github.com/sandstreamdev/react-swipeable-list/commits?author=marekrozmus" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jakubbogacz"><img src="https://avatars3.githubusercontent.com/u/26272028?v=4" width="100px;" alt="jakubbogacz"/><br /><sub><b>jakubbogacz</b></sub></a><br /><a href="#review-jakubbogacz" title="Reviewed Pull Requests">👀</a> <a href="#ideas-jakubbogacz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/sandstreamdevelopment"><img src="https://avatars2.githubusercontent.com/u/44231396?v=4" width="100px;" alt="sandstreamdevelopment"/><br /><sub><b>sandstreamdevelopment</b></sub></a><br /><a href="#business-sandstreamdevelopment" title="Business development">💼</a> <a href="#financial-sandstreamdevelopment" title="Financial">💵</a> <a href="#ideas-sandstreamdevelopment" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!