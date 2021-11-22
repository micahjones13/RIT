import { fireEvent as fireEvent } from "@testing-library/react";

function ruxChange(element: Document | Element | Window, value: string) {
  fireEvent(
    element,
    new CustomEvent("ruxChange", {
      detail: {
        value,
      },
    })
  );
}

function ruxInput(element: Document | Element | Window, value: string) {
  fireEvent(element, new CustomEvent("ruxinput"));
}

export const ruxFireEvent = Object.assign(fireEvent, {
  ruxChange,
  ruxInput,
});
