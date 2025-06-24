const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const API_HEADERS = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "92991459fcmshb327ca7ded63b4cp1b9677jsn580725603914", // Replace with your actual key
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

app.post("/run", async (req, res) => {
  const { code, language_id } = req.body;

  try {
    // Step 1: Submit code
    const { data } = await axios.post(
      API_URL,
      { source_code: code, language_id },
      { headers: API_HEADERS }
    );

    const token = data.token;

    // Step 2: Poll for result
    setTimeout(async () => {
      const result = await axios.get(`${API_URL}/${token}`, {
        headers: API_HEADERS,
      });
      res.json(result.data);
    }, 3000); // 3-second wait to ensure it's processed

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
