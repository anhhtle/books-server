# Install MongoDB on Mac
1) Update homebrew: "brew update"
2) "brew install mongodb"
3) You'll need to create the default database directory and give your user permission to access it. Run sudo mkdir -p /data/db, followed by sudo chown $USER /data/db.

# Local Development
1) Start local MongoDB with "mongod"
2) Start app with "nodemon server.js" then navigate to http://localhost:8080/

4) Optional - Connect to MongoDB with "mongo" on a different console
5) Optional - can test by running "show dbs" to see database list... "local" is there by default

# Development tool
1) Can use this GUI to view MongoDB: https://robomongo.org/
    - Connection to local... Address: localhost : 27017

# Seed
run in command line from root directory: 
    "mongoimport --db books-app --collection users --drop --file ./seeds/users.json"
    "mongoimport --db books-app --collection books --drop --file ./seeds/books.json"
    "mongoimport --db books-app --collection variants --drop --file ./seeds/variants.json"




#Heroku deployment
1) in terminal: heroku create
2) git push heroku master
3) heroku ps:scale web=1
4) In heroku dashboard, add DATABASE_URL env variable

# Production
1) Connect to mLab mongodb with command line: mongo ds121163.mlab.com:21163/books-app -u dbusername -p password
2) run seed command on another terminal
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c avatars --drop -u <user> -p <password> --file ./seeds/avatars.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c users --drop -u <user> -p <password> --file ./seeds/users.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c books --drop -u <user> -p <password> --file ./seeds/books.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c variants --drop -u <user> -p <password> --file ./seeds/variants.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c newsfeeds --drop -u <user> -p <password> --file ./seeds/newsfeeds.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c requests --drop -u <user> -p <password> --file ./seeds/requests.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c settings --drop -u <user> -p <password> --file ./seeds/settings.json"
    "mongoimport -h ds121163.mlab.com:21163 -d books-app -c friend-requests --drop -u <user> -p <password> --file ./seeds/friendRequests.json"
    careful with the "--drop" as it will drop the database first instead of inserting

# Production update - google cloud
https://console.cloud.google.com/home/dashboard?project=book-app-218116&pli=1

In cloud shell, run:
1) cd thebooksjourney-server
2) git pull
3) cd client && npm run build
4) gcloud app deploy

# endpoint
http://thebooksjourney.com/api/v1/
most request requires: - header: Authorization - Token (get from login or create user)