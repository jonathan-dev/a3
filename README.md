# Assignment 3 - Project Harrismus

Welcome to the repo for Project Harrismus. We are making a 'imgur-like' project, which allows users to upload images as a post, view filtered feeds of user's posts, and vote posts up or down within the feeds. 

# Set-up
You will need NPM, Node and MongoDB installed and configured already.

1. Clone the repo
2. Open terminal and do `npm install` to install all dependencies
3. Start an instance of MongoDB
    - Run instance `localhost` on the default port (`27017`)
    - *Note: You can modify the settings for this in `mongo.js`*
4. Run with `npm start`

*Note: node execution does not work due to the use of ES6 code e.g. imports*

# Structure

### Routes
All main routes are held in the *index.js* file. 

### Views
All main views are held in `public/views`

### Database access
Configured in `mongo.js`

# Coding conventions
1. Variables in CamelCase
2. Filenames should be all lowercase
3. Use two spaces for indenting
4. Have a comment on every function that describes it purpose
5. Don't abbreviate local variables
6. Embedded function commnts in //
7. make use of error functions when given as function parameter
8. make use of TODO and FIXME annotation
9. write todo/fixme statements like this: TODO: "task" / FIXME: "task" 
10. Use semicolons?

11. Expand route callback functions: 
function(route, callback() {

});

12. Use newline for each method in method chaining and place dot in new line.
Example:
    call()
    .then()
    .then()
13. no comma after last json key value pair
14. Use single quotes instead of double quotes in strings
15. function definitions with one space between function name and parenthesis

Example:
    function myFunction () {

    }
