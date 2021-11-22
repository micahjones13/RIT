import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { ruxFireEvent as fireEvent } from "../utils";

import App from "../App";

// const loginForm = await findByTestId("login-form");

describe("RuxInput", () => {
  test("Should be typed into", async () => {
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
});
describe("RegularInput", () => {
  test("Reg input works", async () => {
    const { getByTestId, findByDisplayValue } = render(<App />);
    const regInput = getByTestId("reg");

    // fireEvent.change(regInput, { target: { value: "Hello" } });
    // expect(regInput).toHaveValue("Hello");

    await act(async () => {
      fireEvent.change(regInput, { target: { value: "foo@bar.com" } });
    });
    //! Will always pass
    await waitFor(() => {
      findByDisplayValue("foo@barr.com");
    });
  });
});
