import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen, within } from "testing-library__dom";

import App from "../App";

/**
 * Goals:
 *  - RuxInput's value changes when firEvent.change is used
 *  - Error text div is rendered and can be tested for
 *  - Input can be found by label text
 *  - fireEvent.click works with RuxButton
 */

describe("RuxInput", () => {
  test("Should change with fireEvent", async () => {
    const { getByTestId, findByDisplayValue } = render(<App />);
    const emailInput = getByTestId("email");

    fireEvent.change(emailInput, { target: { value: "foo@bar.com" } });
    await findByDisplayValue("foo@bar.com");
    //* Uncomment to see a failing test
    // await findByDisplayValue("foo@.com");
    expect(emailInput).toHaveValue("foo@bar.com");

    //! Will always pass - overlapping act calls warning
    // await act(async () => {
    //   fireEvent.change(emailInput, { target: { value: "foo@bar.com" } });
    // });
    // await waitFor(() => {
    //   findByDisplayValue("shouldfail@fail.com");
    // });
  });
  /**
   *  This simply finds the error text within the input.
   */
  test("Should render error-text", async () => {
    render(<App />);
    const input = screen.getByTestId("email");
    let errorText = await within(input).findAllByText(
      "Enter a valid email address."
    );
    expect(errorText).not.toBeNull();
  });

  test("Can get a RuxInput by labelText", async () => {
    render(<App />);
    //* using screnn from testing-library__dom allows the findByLabelText to get through the shadow DOM
    const input = await screen.findByLabelText("Email Address");
    const getInput = screen.getByTestId("email");
    //* This shows that it's possible to getByLabelText, but this approach requires you to already have the RuxInput found, so it's a bit redundant
    const shadowInput = within(getInput).getByLabelText("Email Address");
    console.log(shadowInput, "shadowInput from getByLabelText");
    console.log(input, "input from findByLabelText");
    expect(input).not.toBeNull();
    expect(shadowInput).not.toBeNull();
  });
});
describe("RuxButton", () => {
  test("Hears a fireEvent click", async () => {
    const { getByTestId, findByDisplayValue } = render(<App />);
    const btn = getByTestId("rux-btn");

    fireEvent.click(btn);
    //* Using a textarea to render the "Clicked!" message, since findByDispalyValue has strict element parameters: https://testing-library.com/docs/queries/bydisplayvalue
    await findByDisplayValue("Clicked!");
  });
});
