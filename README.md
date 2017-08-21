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
