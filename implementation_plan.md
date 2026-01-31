# Implementation Plan: Local Test Case Generator

## 1. Project Initialization
- [ ] Initialize Vite + React project in root.
- [ ] Install Tailwind CSS + PostCSS + Autoprefixer.
- [ ] Install `lucide-react` for icons and `react-markdown` for rendering output.
- [ ] Clean up default Vite boilerplate.

## 2. Configuration & Architecture
- [ ] **Vite Proxy**: Configure `vite.config.js` to forward `/api` requests to `http://localhost:11434` (Ollama).
  - This bypasses CORS issues without requiring `OLLAMA_ORIGINS` setup.
- [ ] **Tailwind Config**: Add custom color palette (Slate/Violet) and "glass" utility classes.
- [ ] **Global Styles**: Add `Inter` font and dark mode background in `index.css`.

## 3. Core Logic (Hooks)
- [ ] `useOllama.js` hook:
  - Manages `loading`, `error`, `response` states.
  - Implements `fetch('/api/generate', ...)`
  - Handles streaming (optional) or waits for full response.

## 4. UI Components
- [ ] **App.jsx**:
  - Layout container with "Glass" effect.
  - Header: "AI Test Case Generator".
- [ ] **PromptInput.jsx**:
  - Large textarea with "Generate" button.
- [ ] **TestCaseDisplay.jsx**:
  - Markdown renderer for strict test case formatting.
  - "Copy to Clipboard" button.

## 5. System Prompt Strategy
- [ ] Define `CONST_SYSTEM_PROMPT` in `useOllama.js`.
- [ ] Default Prompt:
  > "You are an expert QA Engineer. Analyze the following requirement/code and generate a comprehensive set of test cases in Markdown format. Include: Test ID, Description, Pre-conditions, Steps, Expected Result."

## 6. Execution Steps
1. `npx create-vite@latest . -- --template react` (Interactive/Auto)
2. Install dependencies.
3. Configure Tailwind.
4. Implement Components.
5. Run & Verify.
