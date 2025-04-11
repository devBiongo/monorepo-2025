```bat
@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: Set the current directory as the Node version directory
set "NODE_VERSIONS_DIR=%~dp0"
set "NODE_VERSIONS_DIR=%NODE_VERSIONS_DIR:~0,-1%"

echo.
echo Available Node.js versions (%NODE_VERSIONS_DIR%):
echo ========================================================

set /a index=0

for /d %%D in ("%NODE_VERSIONS_DIR%\*") do (
    set /a index+=1
    set "ver[!index!]=%%~nxD"
    echo !index!. %%~nxD
)

echo ========================================================

:selectVersion

set /p sel=Please enter the version number to use :

set "selected=!ver[%sel%]!"

if "%selected%"=="" (
    echo Invalid selection, please try again.
    goto selectVersion
)

set "NEW_NODE_HOME=%NODE_VERSIONS_DIR%\%selected%"

reg query "HKCU\Environment" /v NODE_HOME >nul 2>&1
if %errorlevel%==0 (
    echo Overwriting existing NODE_HOME...
) else (
    echo Creating new NODE_HOME...
)

setx NODE_HOME "%NEW_NODE_HOME%" >nul

echo ✔ Switched to Node.js version "%selected%".
echo ✔ NODE_HOME = %NEW_NODE_HOME%
echo ✔ Please restart the terminal for the changes to take effect.

pause

```

