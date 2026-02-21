@echo off
cd /d "C:\Users\Joao\Documents\projetos\app\burguer-night"

echo === Git Status ===
git status

echo.
echo === Creating branch: styling/modern-design ===
git checkout -b styling/modern-design 2>nul || git checkout styling/modern-design

echo.
echo === Staging all changes ===
git add .

echo.
echo === Committing changes ===
git commit -m "feat: modern ui design and production config" -m "- Added modern CSS styling with design system" -m "- Updated frontend components with improved UX" -m "- Configured environment-aware API and Socket.IO URLs" -m "- Added database abstraction layer for SQLite/PostgreSQL" -m "- Improved CORS configuration for dev and production" -m "" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo === Pushing to origin ===
git push -u origin styling/modern-design

echo.
echo ✓ Done! Open https://github.com/your-username/burguer-night/compare/main...styling/modern-design to create a PR
pause
