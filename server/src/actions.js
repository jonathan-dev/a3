/**
 * Contains database actions that require extra business logic
 * that can't be handled with a single db call in mongo.js
 */
import mongo from './database/mongo'

/**
 * Creates a post with a given user
 * @param {string} user - Userid of the post creator
 * @param {Post} post - The full Post object to create
 */
export function createPost(user, post) {
    return new Promise((resolve, reject) => {
        post.owner = user
        let querytags = post.tags;
        post.tags = [];
        let promiseArray = []

        //Get each tag by id and add to post
        //If tag doesn't exist in db, creates it
        querytags.forEach(reqtag => {
            promiseArray.push(
                new Promise((resolve, reject) => {
                    //Gets the current tag from db
                    mongo.getTagByName(reqtag)
                        .then(tag => {
                            //Tag exists already, add to post
                            if (tag) {
                                post.tags.push(tag._id);
                                resolve();
                            } else {
                                mongo.createTag(reqtag)
                                    .then(tag => {
                                        post.tags.push(tag._id)
                                        resolve()
                                    })
                                    .catch(e => reject(e))
                            }
                        })
                        .catch(e => reject(e))
                })
            )
        });

        //Execute tag operations and create post
        Promise.all(promiseArray)
            .then(e => {
                mongo.createPost(post)
                    .then(x => resolve(x))
                    .catch(e => reject(e))
            })
            .catch(e => reject(e))
    })
}
