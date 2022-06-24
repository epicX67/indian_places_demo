import { useState } from "react";
import "./App.scss";
import Pin from "./pages/Pin";
import WithoutPin from "./pages/WithoutPin";
function App() {
  const [mode, setMode] = useState(true);

  return (
    <div className="app">
      {mode && <Pin />}
      {!mode && <WithoutPin />}

      <div className="type_cont">
        <div
          onClick={() => setMode(!mode)}
          className={`demo ${mode && "enabled"}`}
        >
          By Pincode
        </div>
        <div
          onClick={() => setMode(!mode)}
          className={`demo ${!mode && "enabled"}`}
        >
          Select from dropdown
        </div>
      </div>
    </div>
  );
}

export default App;
