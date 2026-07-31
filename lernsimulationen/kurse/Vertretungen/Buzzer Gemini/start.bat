@echo off
title Classroom Buzzer - Lokal-Server
echo =================================================
echo   Starte Classroom Buzzer...
echo =================================================
echo.

set "NODE_EXEC=node"

where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\OpenAI\Codex\bin\5b9024f90663758b\node.exe" (
        set "NODE_EXEC=%LOCALAPPDATA%\OpenAI\Codex\bin\5b9024f90663758b\node.exe"
    )
)

"%NODE_EXEC%" serve.js
if %errorlevel% neq 0 (
    echo.
    echo Server konnte nicht gestartet werden.
    pause
)
