@echo off
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║          🏆 SPORTSDASH PRO - INSTALLATION SCRIPT 🏆          ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo.

echo [1/4] Checking Node.js installation...
echo.
node --version
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js is installed!
echo.
echo.

echo [2/4] Installing dependencies (this may take 2-3 minutes)...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ❌ ERROR: Failed to install dependencies!
    echo.
    pause
    exit /b 1
)
echo.
echo ✅ Dependencies installed successfully!
echo.
echo.

echo [3/4] Starting development server...
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║                    🚀 SERVER STARTING... 🚀                  ║
echo ║                                                              ║
echo ║           Your website will open automatically at:           ║
echo ║                                                              ║
echo ║                  http://localhost:3000                       ║
echo ║                                                              ║
echo ║                Press Ctrl+C to stop the server               ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo.

echo [4/4] Opening browser...
timeout /t 3 >nul
start http://localhost:3000
echo.
echo ✅ Browser opened!
echo.
echo The server is now running. You should see your website in the browser.
echo.
echo.

call npm run dev
