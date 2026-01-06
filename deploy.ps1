Write-Host "Cleaning previous builds..." -ForegroundColor Green
Remove-Item -Recurse -Force build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

Write-Host "Building React app..." -ForegroundColor Green
npm run build

Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npx gh-pages -d build

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Check: https://chalinikk.github.io/estate-agent-app" -ForegroundColor Cyan