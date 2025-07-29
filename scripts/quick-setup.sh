#!/bin/bash
cd "$(dirname "$0")/.."
echo "[INFO] Starting Quick Setup..."
echo "[INFO] Running npm install..."
npm install || { echo "[ERROR] npm install failed!"; exit 1; }
echo "[INFO] Installing Playwright browsers..."
npx playwright install || { echo "[ERROR] Playwright browser install failed!"; exit 1; }
echo "[INFO] Executing tests in parallel mode (2 workers)..."
npx playwright test || { echo "[ERROR] Tests failed! See playwright-report/ for details."; }
echo "[INFO] Opening Playwright HTML report..."
npx playwright show-report || { echo "[ERROR] Could not open HTML report!"; }
echo "[SUCCESS] Quick Setup completed."
