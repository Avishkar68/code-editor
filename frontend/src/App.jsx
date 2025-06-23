import React, { useState } from 'react';
import { submitCode } from './Services';
import './App.css';

function App() {
  const [code, setCode] = useState("print('Hello, world!')");
  const [languageId, setLanguageId] = useState(71); // Default: Python
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const languageOptions = [
    { id: 71, name: 'Python 3' },
    { id: 63, name: 'JavaScript (Node.js)' },
    { id: 54, name: 'C++ (GCC)' },
    { id: 62, name: 'Java' },
    { id: 50, name: 'C' },
  ];

  const runCode = async () => {
    setLoading(true);
    setOutput('');

    const result = await submitCode(code, languageId);

    setOutput(result.output);
    setLoading(false);
  };

  return (
    <div className="App">
      <h2>🧠 Online Code Runner (Judge0)</h2>

      <select
        onChange={(e) => setLanguageId(Number(e.target.value))}
        value={languageId}
      >
        {languageOptions.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>

      <br />
      <textarea
        rows={12}
        cols={70}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
      />

      <br />
      <button onClick={runCode} disabled={loading}>
        {loading ? 'Running...' : 'Run Code'}
      </button>

      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
