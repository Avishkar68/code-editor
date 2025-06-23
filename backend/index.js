const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Replace with your RapidAPI Key
const RAPIDAPI_KEY = '92991459fcmshb327ca7ded63b4cp1b9677jsn580725603914'; // 👈 Replace this

app.post('/run', async (req, res) => {
  const { code, language_id, stdin } = req.body;

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'false', wait: 'true' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      source_code: code,
      language_id: language_id || 71, // Default to Python
      stdin: stdin || ''
    }
  };

  try {
    const response = await axios.request(options);
    res.json({
      stdout: response.data.stdout,
      stderr: response.data.stderr,
      time: response.data.time,
      memory: response.data.memory
    });
  } catch (error) {
    res.status(500).json({ error: 'Execution failed', details: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
