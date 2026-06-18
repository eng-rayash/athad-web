@echo off
:: Set code page to UTF-8 to support Arabic characters in the terminal
chcp 65001 > nul

echo =====================================================================
echo    تنظيف مجلد مشروع موقع اتحاد البناء
echo =====================================================================
echo.

echo [1/4] إزالة المجلدات القديمة...
if exist "%~dp0backend" (
    echo جاري حذف مجلد backend...
    rmdir /s /q "%~dp0backend"
)
if exist "%~dp0frontend" (
    echo جاري حذف مجلد frontend...
    rmdir /s /q "%~dp0frontend"
)
echo.

echo [2/4] إزالة الملفات غير المستخدمة...
if exist "%~dp0move-files.js" (
    echo جاري حذف move-files.js...
    del /f /q "%~dp0move-files.js"
)
if exist "%~dp0pnpm-workspace.yaml" (
    echo جاري حذف pnpm-workspace.yaml...
    del /f /q "%~dp0pnpm-workspace.yaml"
)
echo.

echo [3/4] تنظيف ملفات التخزين المؤقتة إن وجدت...
if exist "%~dp0package-lock.json" (
    echo جاري تنظيف package-lock.json لإعادة بنائها بملف مدمج...
    del /f /q "%~dp0package-lock.json"
)
echo.

echo [4/4] إزالة سكربت التنظيف ذاتياً...
echo تم تنظيف المجلد بالكامل!
echo.
echo =====================================================================
echo  ✨ تم تنظيف مجلد المشروع بنجاح!
echo =====================================================================
echo.

pause

:: Self-deletion command
(goto) 2>nul & del "%~f0"
