import { fireEvent } from '@testing-library/react';

export const swipeLeftMouse = container => {
  fireEvent.mouseDown(container, { clientX: 250, clientY: 20 });
  fireEvent.mouseMove(container, { clientX: 100, clientY: 20 });
  fireEvent.mouseUp(container, { clientX: 100, clientY: 20 });
};

export const swipeRightMouse = container => {
  fireEvent.mouseDown(container, { clientX: 250, clientY: 20 });
  fireEvent.mouseMove(container, { clientX: 350, clientY: 20 });
  fireEvent.mouseUp(container, { clientX: 350, clientY: 20 });
};

export const swipeLeftTouch = container => {
  fireEvent.touchStart(container, {
    targetTouches: [{ clientX: 250, clientY: 20 }]
  });
  fireEvent.touchMove(container, {
    targetTouches: [{ clientX: 100, clientY: 20 }]
  });
  fireEvent.touchEnd(container, {
    targetTouches: [{ clientX: 100, clientY: 20 }]
  });
};

export const swipeRightTouch = container => {
  fireEvent.touchStart(container, {
    targetTouches: [{ clientX: 250, clientY: 20 }]
  });
  fireEvent.touchMove(container, {
    targetTouches: [{ clientX: 350, clientY: 20 }]
  });
  fireEvent.touchEnd(container, {
    targetTouches: [{ clientX: 350, clientY: 20 }]
  });
};
