# download sciter 4.4.8.14
curl -LO https://github.com/c-smile/sciter-js-sdk/archive/b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397.zip

# unzip binaries
unzip b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397.zip sciter-js-sdk-b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397/bin/macosx/* -d .

# move binaries
mv sciter-js-sdk-b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397/bin .

# delete old dir
rmdir sciter-js-sdk-b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397

# delete zip
rm b5c4d4efe4ed48fc96c7900c8e89e18c3c1c6397.zip

cd bin/macosx

# make binaries executable
chmod +x scapp inspector.app libsciter.dylib

cd ..

# sciter package manager 0.2.0
curl -LO https://github.com/8ctopus/sciter-package-manager/releases/download/0.2.0/spm.phar
