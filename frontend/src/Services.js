import axios from 'axios';

const RAPIDAPI_KEY = '7217efdd60mshf7069ea389ac3e8p1e3151jsn69e0ca5cd805'; // ⚠️ Replace with your working key

export const submitCode = async (code, language_id = 71, stdin = '') => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'false',
      wait: 'true',
    },
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      source_code: code,
      language_id,
      stdin,
    },
  };

  try {
    const response = await axios.request(options);

    return {
      success: true,
      output: response.data.stdout || response.data.stderr || response.data.compile_output || 'No output.',
    };
  } catch (error) {
    console.error("❌ Judge0 Error:", error?.response?.data || error.message);
    return {
      success: false,
      output: error?.response?.data?.message || 'Execution failed.',
    };
  }
};
