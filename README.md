# Assignment 3 - Project Harrismus

Welcome to the repository for Project Harrismus. We are making a 'imgur-like' project,
which allows users to upload images as a post, view filtered feeds of user's posts,
and vote posts up or down within the feeds.

# Set-up
### Required programs
This project requires you to install:
- NodeJS
- A package manager like npm
- MongoDB (standalone or running in a docker container)

### Installing dependencies
1. Open a terminal in the project folder.

2. Install dependencies for client:
```
cd client
npm install
```

3. Install dependencies for server:
```
cd ..\server
npm install
```

## Development
### Starting the client
The client will automatically be **rebuilt** when changes are made to the source files.

```bash
# Terminal 1
cd client
npm run watch
```

### Starting the server
The commands below will start the mongo db and the server.
Do this in a separate terminal window.
The server will automatically restart when the source files are changed
```bash
# Terminal 2
cd server
# start mongo db container and detaches output
# alternatively you can run a mongodb on port 27017 (default)
docker-compose -d
npm start
```

# Structure
Project is split into client & server side.
Please refer to package.json in both client and server to see all packages used for the project. 

## Server side
The **server side** runs Node on Express and provides basic routes and a GraphQL API endpoint to query data and perform actions. 

#### DB access 
The app uses Mongoose to interact with the mongo DB instance. All database connection, change and update logic is held within `src/database/` files. `Mongo.js` opens the connection and populates the database with mock data using Casual.

#### GraphQL API
The app uses Facebook's Graphql-js library to define GraphQL types and schemas. The types are defined in `graphqlTypes.js` and the schema itself is held in `graphqlSchema.js`. Each GraphQL type corresponds to a data type in the database. The schema defines the path for the request and how it is resolved to return data.

#### Security
The app is secured by HTTPS and encrypts data using the private key and certificate file in ./SSL/. You will need to provide your own private key and certificate and put them in these files.

## Client side
The **client side** is a React app that uses Redux to maintain the app state, an Apollo client to use the server's GraphQL endpoint, and Axios to issue other HTTP requests to the server. 

### Routes
All main routes are held in the *index_reducer.js* file.

### Views
All main views are held in `public/views`

### Database access
Configured in `mongo.js`

# Coding conventions
1. CamelCase throughout code
    - Variables
    - Function names capitalized
    - When in doubt, camelcase it out
2. Filenames should be all lowercase, words separated by underscore
  e.g. `hot_page_post_list.jsx`
3. Use four spaces for indenting.
4. Have a comment on every function that describes it purpose.
5. Don't abbreviate local variables.
6. Embedded function comments in //.
7. Make use of error functions when given as function parameter.
8. Make use of TODO and FIXME annotation:
```
// TODO: this todo statement is written all uppercase followed by a colon.
// FIXME: so is this fixme statement.
```
9. Make use of semicolons on every line
10. Expand route callback functions:
```
function(route, callback(){
    // callback code here
});
```

11. Use newline for each method in method chaining **and** place dot in new line:
```
# good:

    call()
    .thenFuncA()
    .thenFuncB()
    .thenFuncC();

#bad:

    call().thenFuncA().thenFuncB().thenFuncC();
```
12. Don't put a comma after the last json key value pair.
13. Expand assignment when giving a json object its key value pairs.
```
#good:


    let human = {
        name: 'Kevin',
        age: 21
    };


#bad (unnecessary comma after last key value pair):

    let human = {
        name: "Kevin",
        age: 21,
    };


#bad (not expanded):

    let human = {name = "Kevin", age: 21};
```

14. Use single quotes instead of double quotes in strings
15. Function definitions with one space between function name and parenthesis:
```
#good
function myFunction () {
    // space between function-name, parenthesis and brackets
}

#bad
function myFunction(){
    // no space between function-name, parenthesis and brackets
}
```
