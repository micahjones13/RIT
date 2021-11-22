import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { RuxInput } from "@astrouxds/react";

function App() {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");

  function handleSubmit() {
    alert(`
      Email: ${email}
    `);
  }

  return (
    <div className="App">
      <form
        style={{ width: "50%", padding: "5%" }}
        onSubmit={handleSubmit}
        data-testid="form"
      >
        <RuxInput
          data-testid="email"
          type="text"
          label="Email Address"
          value={email}
          onRuxinput={(e: CustomEvent<HTMLRuxInputElement>) => {
            console.log("RUX INPUT~~~");
            const target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
          name="email"
        />
        <label>Test</label>
        <input
          type="text"
          data-testid="reg"
          aria-label="reg"
          name="first"
          value={input}
          aria-labelledby="Test"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
