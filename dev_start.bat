#start mongo instance
c:/mongodb/bin/mongod.exe --dbpath="c:\mongodata\db"

#run express server
cd \
cd web development
cd WealthManager
cd wealth-mgr-api
npm install
# run the app on Windows
SET PORT=4000
npm start