@echo off
title Quranic Skills Website Preview
echo ==============================================
echo   Starting Local Website Server (HTTP)...
echo ==============================================
start http://localhost:8080
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview-server.ps1"
pause
