# Assignment 3 - Project Harrismus

Welcome to the repository for Project Harrismus. We are making a 'imgur-like' project, 
which allows users to upload images as a post, view filtered feeds of user's posts, 
and vote posts up or down within the feeds. 

# Set-up
This project needs NodeJS including a package manager like npm and MongoDB installed 

1. Install the dependencies:
```
# use the corresponding install command of your package manager
$ npm install
```
3. Start an instance of MongoDB
    - Run instance `localhost` on the default port (`27017`)
    - *Note: You can modify the settings for this in `mongo.js`*
4. Generate .js files from the react source files:
```
$ ./node_modules/.bin/webpack -d
```
5. Start the server:
```
$ npm start
```
    
**Note:** Starting the server with
```
# do not start your server like this:
$ node index.js

```
will fail due to the use of ES6 in this project. BabelJS is used in this project as a
ES6 to ES5 transpiler, which allows us to make use of new functions not yet available on
ES5. In order to start the project correctly use:
```
# correct way of starting your server
$ npm start
```
or the correpsonding start command of your package manager.

# Structure

### Routes
All main routes are held in the *index.js* file. 

### Views
All main views are held in `public/views`

### Database access
Configured in `mongo.js`

# Coding conventions
1. Variables in CamelCase.
2. Filenames should be all lowercase.
3. Use two spaces for indenting.
4. Have a comment on every function that describes it purpose.
5. Don't abbreviate local variables.
6. Embedded function comments in //.
7. Make use of error functions when given as function parameter.
8. Make use of TODO and FIXME annotation.
9. Use the TODO/FIXME annotation like this:
```
// TODO: this todo statement is written all uppercase followed by a colon.
// FIXME: so is this fixme statement.
```
10. Make use of semicolons.
11. Expand route callback functions: 
```
function(route, callback(){
    // callback code here    
});
```

12. Use newline for each method in method chaining **and** place dot in new line:
```
# good:
    
    call()
    .thenFuncA()
    .thenFuncB()
    .thenFuncC();
    
#bad:
    
    call().thenFuncA().thenFuncB().thenFuncC();
```
13. Don't put a comma after the last json key value pair.
14. Expand assignment when giving a json object its key value pairs.
```
#good:
    

    let human = {
        name: "Kevin",
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