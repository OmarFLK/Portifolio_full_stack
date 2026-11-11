$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot 'chatbot'
$pythonPath = Join-Path $backendPath '.venv/Scripts/python.exe'
Push-Location $projectRoot
try {
    if (-not (Test-Path -LiteralPath $pythonPath)) {
        python -m venv (Join-Path $backendPath '.venv')
        if ($LASTEXITCODE -ne 0) { throw 'Could not create the Python environment.' }
    }
    & $pythonPath -m pip install -r (Join-Path $backendPath 'requirements-dev.txt')
    if ($LASTEXITCODE -ne 0) { throw 'Could not install backend requirements.' }
    $envPath = Join-Path $backendPath '.env'
    if (-not (Test-Path -LiteralPath $envPath)) {
        Copy-Item -LiteralPath (Join-Path $backendPath '.env.example') -Destination $envPath
        Write-Output 'Created chatbot/.env. Add BARO_API_KEY there before using the AI.'
    }
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules'))) {
        npm ci
        if ($LASTEXITCODE -ne 0) { throw 'Could not install frontend requirements.' }
    }
    node --experimental-strip-types scripts/export-chat-knowledge.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Could not export the portfolio knowledge.' }
    Write-Output 'OmarIA setup complete. Existing environment files were preserved.'
} finally { Pop-Location }
