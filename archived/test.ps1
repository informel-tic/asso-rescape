$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$r1 = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/csrf" -SessionVariable session
$csrfToken = ($r1.Content | ConvertFrom-Json).csrfToken

$body = "email=admin@rescape.fr&password=Rescape2026!&csrfToken=$csrfToken&redirect=false"
$r2 = Invoke-WebRequest -Method Post -Uri "http://localhost:3000/api/auth/callback/credentials" -Body $body -ContentType "application/x-www-form-urlencoded" -WebSession $session
Write-Output "Login status: $($r2.StatusCode)"

$r3 = Invoke-WebRequest -Uri "http://localhost:3000/admin" -WebSession $session -MaximumRedirection 0 -ErrorAction SilentlyContinue
Write-Output "Admin fetch status: $($r3.StatusCode) Location: $($r3.Headers.Location)"
