mkdir bin\win-x32

cd bin\win-x32

REM sciter 4.4.8.8 bis
curl -LO https://github.com/c-smile/sciter-js-sdk/raw/49394612203563e3618a58429f3e50e742f2f3ce/bin/windows/x32/scapp.exe
curl -LO https://github.com/c-smile/sciter-js-sdk/raw/49394612203563e3618a58429f3e50e742f2f3ce/bin/windows/x32/inspector.exe
curl -LO https://github.com/c-smile/sciter-js-sdk/raw/49394612203563e3618a58429f3e50e742f2f3ce/bin/windows/x32/sciter.dll

cd ..

REM sciter package manager 0.1.5
curl -LO https://github.com/8ctopus/sciter-package-manager/releases/download/0.1.5/spm.phar

pause
