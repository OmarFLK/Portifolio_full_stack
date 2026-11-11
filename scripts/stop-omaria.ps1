$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$statePath = Join-Path $projectRoot 'chatbot/.runtime/processes.json'
if (-not (Test-Path -LiteralPath $statePath)) { Write-Output 'No OmarIA-owned processes recorded.'; exit 0 }
foreach ($entry in @((Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json))) {
    $process = Get-Process -Id $entry.id -ErrorAction SilentlyContinue
    if ($process -and $process.StartTime.ToUniversalTime().ToString('o') -eq $entry.started) {
        $details = Get-CimInstance Win32_Process -Filter "ProcessId = $($entry.id)"
        if (($entry.name -eq 'api' -and $details.CommandLine -like '*uvicorn app.main:app*') -or ($entry.name -eq 'frontend' -and $details.CommandLine.Contains($projectRoot))) {
            Stop-Process -Id $entry.id
        }
    }
}
Remove-Item -LiteralPath $statePath
Write-Output 'Stopped services started by start-omaria.ps1. Existing services were preserved.'
