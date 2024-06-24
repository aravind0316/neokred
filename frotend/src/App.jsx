import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MarkdownEditor from "./components/Editor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Markdown Editor</h1>
        </header>
        <MarkdownEditor />
      </div>
    </div>
  );
}

export default App;
