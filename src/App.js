import React, { useState } from "react";
import Login from "./Login";
import Projects from "./Projects";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      {loggedIn ? <Projects /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
};

export default App;
