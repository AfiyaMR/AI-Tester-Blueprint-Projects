# SOP 01: Generate Test Cases via Ollama

**Version**: 1.0
**Last and Only Validated Date**: 2026-01-30

## 1. Goal
Generate a comprehensive set of test cases in Markdown format based on a given text input (requirements or code) using a local Ollama instance.

## 2. Inputs
- **Source**: File content from `.tmp/input.txt` (or passed string).
- **Format**: Plain text / Code.

## 3. Tool Logic
1. **Read Input**: Load content from target source.
2. **Validate**: Ensure input is not empty (length > 0).
3. **Construct Prompt**:
   - System Message: [Defined in `gemini.md` or Codebase Constant]
   - User Message: The input text.
4. **Call API**: 
   - Endpoint: `http://localhost:11434/api/generate`
   - Model: `llama3.2` (Configurable via env)
   - Parameters: `stream: false`
5. **Receive Response**: Capture JSON payload.
6. **Output**: Write raw `response` string to `.tmp/output.md`.

## 4. Edge Cases
- **Ollama Offline**: If API call fails, return specific error `ERR_OLLAMA_CONNECT`.
- **Empty Input**: If input file is empty, return `ERR_EMPTY_INPUT`.
- **Model Missing**: If 404 on model, log warning `WARN_MODEL_MISSING`.

## 5. Golden Rule
If the Prompt Engineering strategy changes (e.g., adding few-shot examples), this SOP **must** be updated before modifying the code.
