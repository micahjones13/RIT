import React, { useState, useEffect } from "react";
import "./App.css";
import { RuxButton, RuxInput } from "@astrouxds/react";

function App() {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleSubmit() {
    alert(`
      Email: ${email}
    `);
  }
  useEffect(() => {
    if (email && email.includes("@")) {
      setValid(true);
    } else setValid(false);
  }, [email]);

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
            const target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
          name="email"
          error-text={valid ? undefined : "Enter a valid email address."}
        />

        <button type="submit" data-testid="btn">
          Submit
        </button>
      </form>
      <RuxButton
        data-testid="rux-btn"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        Rux Button
      </RuxButton>

      {clicked && <textarea data-testid="text-area">Clicked!</textarea>}
    </div>
  );
}

export default App;
