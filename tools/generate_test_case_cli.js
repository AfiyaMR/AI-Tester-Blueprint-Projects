import fs from 'fs';
import path from 'path';
import http from 'http';

// Tool Configuration
const CONFIG = {
    inputFile: '.tmp/input.txt',
    outputFile: '.tmp/output.md',
    model: 'llama3.2',
    host: 'localhost',
    port: 11434,
};

// Ensure .tmp exists
if (!fs.existsSync('.tmp')) fs.mkdirSync('.tmp');

// SYSTEM PROMPT (In real app, can be imported. Here, duplicated for atomic tool isolation as per Layer 3)
const SYSTEM_PROMPT = `
You are an expert QA Engineer. 
Your task is to generate comprehensive test cases based on the provided user requirements or code snippets. 
Output the test cases in a clear Markdown format. 

For each test case, include the following:
- **Test Case ID**
- **Description**
- **Pre-conditions**
- **Steps**
- **Expected Result**

Ensure you cover:
1. Happy Paths (Standard usage)
2. Edge Cases (Boundary values, empty inputs)
3. Error Handling (Invalid inputs)

Output ONLY the markdown content.
`;

async function main() {
    console.log('🔹 Tool Started: Generate Test Cases');

    // 1. Read Input
    const inputPath = path.resolve(CONFIG.inputFile);
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ ERR_EMPTY_INPUT: Input file not found at ${CONFIG.inputFile}`);
        process.exit(1);
    }

    const inputContent = fs.readFileSync(inputPath, 'utf-8').trim();
    if (inputContent.length === 0) {
        console.error(`❌ ERR_EMPTY_INPUT: Input file is empty.`);
        process.exit(1);
    }
    console.log(`✅ Input read (${inputContent.length} chars)`);

    // 2. Construct Payload
    const payload = JSON.stringify({
        model: CONFIG.model,
        prompt: `${SYSTEM_PROMPT}\n\nUSER INPUT:\n${inputContent}`,
        stream: false,
    });

    // 3. Call API
    const options = {
        hostname: CONFIG.host,
        port: CONFIG.port,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
        },
    };

    console.log(`⏳ Calling Ollama (${CONFIG.model})...`);

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error(`❌ API Error: ${res.statusCode} - ${data}`);
                process.exit(1);
            }

            try {
                const json = JSON.parse(data);
                const result = json.response;

                // 4. Write Output
                fs.writeFileSync(CONFIG.outputFile, result);
                console.log(`✅ Success! Output written to ${CONFIG.outputFile}`);
            } catch (e) {
                console.error(`❌ JSON Parse Error: ${e.message}`);
                process.exit(1);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ ERR_OLLAMA_CONNECT: ${e.message}`);
        process.exit(1);
    });

    req.write(payload);
    req.end();
}

main();
