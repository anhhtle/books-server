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




#H eroku deployment
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


# endpoint
https://books-app-server-dev.herokuapp.com/api/v1/
most request requires: - header: Authorization - Token (get from login or create user)

## create new user
POST /users/
{
    user: {
        email,
        password
    }
}

## login user
POST /user/login
{
    user: {
        email,
        password
    }
}

## Get current user
GET /user/current

## Get a user's public profile
GET /user/:id

## Get current user's books
GET /books/

## Create new book and variant
POST /books/
{
	book: {
		google_id,
		title,
		authors: [],
        categories (optional): []
        description (optional),
        image (optional)
	}
}

## Get books available for share (excluding current user's)
GET /books/community

## Search books available for share by title or author (excluding current user's)
POST /books/community/search
{
    query: 'title or author'
}

## Update a variant
{
	variant_id,
	update (optional): {
		status,
		progress,
        user_rating,
        friend,
        book_condition,
        available_for_share,
        share_requested
	}
}

## Get all avatars
GET /avatars/

## Get current user's newsfeed
GET /newsfeeds/

## Get current user's book requests
GET /requests/

## Create new request for current user
POST /requests/
{
    variant_id
}

## Update a request
{
	request_id (string id),
	status (string),
	hide_request (boolean),
	thanked_owner (boolean)
}

## find user
POST /user/search
{ query }

## Get user's friend requests
GET /friend-requests/

## Create friend request
POST /friend-requests/
{ friend_id }

## Accept friend request
PUT /friend-requests/accept
{ request_id }

### NOTIFICATIONS
## Get user's notifications
GET /notifications