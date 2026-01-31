
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/tags',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Ollama Connection Successful!');
      console.log('Available Models:', parsed.models.map(m => m.name).join(', '));
    } catch (e) {
      console.error('Error parsing response:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  console.error('Ensure Ollama is running (try: ollama serve)');
});

req.end();
