@echo off
chcp 65001 >nul
echo =====================================================================
echo    🌌《流浪地球 · 行星推进全局遥测终端与轨道空间枢纽》
echo    THE EARTH MIGRATION PROJECT // UEG PLANETARY COMMAND DOCK
echo =====================================================================
echo.
echo [1/3] 检查环境与依赖...
if not exist "node_modules" (
    echo [提示] 正在首次自动安装依赖 (请保持网络畅通)...
    call npm install
)

echo.
echo [2/3] 正在启动 550W 量子三维遥测仿真系统 (Vite Dev Server)...
echo.
echo [3/3] 服务启动后请在浏览器中访问：http://localhost:5173/
echo.
start http://localhost:5173/
call npm run dev
pause
