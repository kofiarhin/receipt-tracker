const fs = require('fs/promises');
const axios = require('axios');

const performOcr = async ({ filePath, endpoint, apiKey }) => {
  if (!endpoint || endpoint.includes('example.com')) {
    return fs.readFile(filePath, 'utf-8').catch(() => '');
  }

  const imageBase64 = (await fs.readFile(filePath)).toString('base64');
  const { data } = await axios.post(
    endpoint,
    { image: imageBase64 },
    { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 10000 },
  );
  return data.text || '';
};

module.exports = { performOcr };
