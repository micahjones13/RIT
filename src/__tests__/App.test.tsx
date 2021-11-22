import React from "react";
import {
  render,
  act,
  waitFor,
  getByLabelText,
  getByText,
  findByDisplayValue,
  waitForElementToBeRemoved,
  queryByAttribute,
} from "@testing-library/react";
import { ruxFireEvent as fireEvent } from "../utils";

import App from "../App";

// Also want error-text to show up in tests when applicable
describe("RuxInput", () => {
  test("Should change with fireEvent", async () => {
    const { getByTestId, findByDisplayValue } = render(<App />);
    const emailInput = getByTestId("email");

    fireEvent.change(emailInput, { target: { value: "foo@bar.com" } });
    await findByDisplayValue("foo@bar.com");
    //* Uncomment to see a failing test
    // await findByDisplayValue("foo@.com");
    expect(emailInput).toHaveValue("foo@bar.com");

    //! Will always pass
    // await act(async () => {
    //   fireEvent.change(emailInput, { target: { value: "foo@bar.com" } });
    // });
    // await waitFor(() => {
    //   findByDisplayValue("foo@barr.com");
    // });
  });
  test("Should render error-text", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("email");
    //? I have no clue why this doesn't work.
    expect(input).toHaveAttribute("error-text");
    fireEvent.change(input, { target: { value: "@" } });
    //? This prints '@' like it should.
    console.log((input as HTMLInputElement).value, "VAL");
    expect(input).not.toHaveAttribute("error-text");

    // expect(input).toHaveAttribute("error-text");
  });
});
describe("RuxButton", () => {
  test("Hears a fireEvent click", async () => {
    const { getByTestId, findByDisplayValue } = render(<App />);
    const btn = getByTestId("rux-btn");

    fireEvent.click(btn);
    await findByDisplayValue("Clicked!");
  });
});
