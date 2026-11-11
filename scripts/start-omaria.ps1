param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot 'chatbot'
$pythonPath = Join-Path $backendPath '.venv/Scripts/python.exe'
$runtimePath = Join-Path $backendPath '.runtime'
$statePath = Join-Path $runtimePath 'processes.json'
if (-not (Test-Path -LiteralPath $pythonPath)) { throw 'Run scripts/setup-omaria.ps1 first.' }
New-Item -ItemType Directory -Path $runtimePath -Force | Out-Null
$ownedProcesses = @()
if (Test-Path -LiteralPath $statePath) { $ownedProcesses = @((Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json)) }
function Test-Endpoint($url) {
    try { return (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200 }
    catch { return $false }
}
function Start-Owned($executable, $arguments, $workingDirectory, $name) {
    $process = Start-Process -FilePath $executable -ArgumentList $arguments -WorkingDirectory $workingDirectory -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $runtimePath "$name.stdout.log") -RedirectStandardError (Join-Path $runtimePath "$name.stderr.log")
    return @{ id = $process.Id; started = $process.StartTime.ToUniversalTime().ToString('o'); name = $name }
}
if (-not (Test-Endpoint 'http://127.0.0.1:8001/api/assistant/health')) {
    $ownedProcesses += Start-Owned $pythonPath @('-m','uvicorn','app.main:app','--host','127.0.0.1','--port','8001','--no-access-log') $backendPath 'api'
}
if (-not (Test-Endpoint 'http://127.0.0.1:5173')) {
    $vitePath = Join-Path $projectRoot 'node_modules/vite/bin/vite.js'
    $nodePath = (Get-Command node -ErrorAction Stop).Source
    $ownedProcesses += Start-Owned $nodePath @(('"' + $vitePath + '"'),'--host','127.0.0.1','--port','5173','--strictPort') $projectRoot 'frontend'
}
ConvertTo-Json -InputObject @($ownedProcesses) | Set-Content -LiteralPath $statePath -Encoding UTF8
$ready = $false
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    if ((Test-Endpoint 'http://127.0.0.1:8001/api/assistant/health') -and (Test-Endpoint 'http://127.0.0.1:5173')) { $ready = $true; break }
    Start-Sleep -Milliseconds 500
}
if (-not $ready) { throw "Services did not start. Check logs in $runtimePath" }
Write-Output 'Portfolio: http://127.0.0.1:5173/'
Write-Output 'OmarIA:    http://127.0.0.1:5173/omaria'
Write-Output 'Backend:   http://127.0.0.1:8001/api/assistant/health'
if (-not $NoBrowser) { Start-Process 'http://127.0.0.1:5173/omaria' }
