#Install MongoDB on Mac
1) Update homebrew: "brew update"
2) "brew install mongodb"
3) You'll need to create the default database directory and give your user permission to access it. Run sudo mkdir -p /data/db, followed by sudo chown $USER /data/db.

#Local Development
1) Start local MongoDB with "mongod"
2) Start app with "nodemon server.js" then navigate to http://localhost:8080/

4) Optional - Connect to MongoDB with "mongo" on a different console
5) Optional - can test by running "show dbs" to see database list... "local" is there by default

#Development tool
1) Can use this GUI to view MongoDB: https://robomongo.org/
    - Connection to local... Address: localhost : 27017

#seed
run in command line from root directory: 
    "mongoimport --db books-app --collection users --drop --file ./seeds/users.json"
    "mongoimport --db books-app --collection booksMaster --drop --file ./seeds/bookMaster.json"
    "mongoimport --db books-app --collection booksVariant --drop --file ./seeds/bookVariant.json"

#endpoint
https://books-app-server.herokuapp.com/api/v1/

get all user
/users/

get specific user
/users/:userId

get all book variants
/books/

get all book variants belonging to a user
/books/users/:userId



#Production
1) Connect to mLab mongodb with command line: mongo ds121163.mlab.com:21163/books-app -u dbusername -p password
2) run seed command on another terminal
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c books --drop -u <user> -p <password> --file <input file>"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c bookVariants --drop -u <user> -p <password> --file <input file>"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c users --drop -u <user> -p <password> --file <input file>"
    careful with the "--drop" as it will drop the database first instead of inserting
