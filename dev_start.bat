#adding dependencies
Have to be bower, since yeoman builds the script/css section automatically based on what's in the bower.json file

#start mongo instance
cd startup
start mongo_start.bat

#run express server
start backend_start.bat

#run front end server
start frontend_start.bat