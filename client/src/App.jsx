import React, { useState } from "react";
import axios from "axios";

const languageOptions = [
  { id: 63, name: "JavaScript" },
  { id: 71, name: "Python" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
];

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(71); // Default Python
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setOutput("Running...");
    try {
      const res = await axios.post("http://localhost:5000/run", {
        code,
        language_id: language,
      });
      if (res.data.stdout) {
        setOutput(res.data.stdout);
      } else if (res.data.stderr) {
        setOutput(res.data.stderr);
      } else {
        setOutput(res.data.compile_output);
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Online Code Compiler</h2>
      <select onChange={(e) => setLanguage(Number(e.target.value))}>
        {languageOptions.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
      <br />
      <textarea
        rows="15"
        cols="70"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        style={{ marginTop: 10 }}
      />
      <br />
      <button onClick={handleRun}>Run Code</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
