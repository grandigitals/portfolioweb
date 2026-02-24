@echo off
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           Fixing PowerShell Execution Policy                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will allow PowerShell to run npm commands.
echo.
echo Opening PowerShell as Administrator...
echo Please run this command in the new window:
echo.
echo Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
echo.
pause

powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit', '-Command', 'Write-Host \"Run this command:\" -ForegroundColor Yellow; Write-Host \"Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned\" -ForegroundColor Green; Write-Host \"\"; Write-Host \"Then type: exit\" -ForegroundColor Cyan'"
