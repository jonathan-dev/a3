import mongo from './database/mongo'

export function createPost(user, post) {
    return new Promise((resolve, reject) => {
        post.owner = user
        let querytags = post.tags;
        post.tags = [];
        let promiseArray = []

        querytags.forEach(reqtag => {
            promiseArray.push(
                new Promise((resolve, reject) => {
                    mongo.getTagByName(reqtag)
                        .then(tag => {
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

        Promise.all(promiseArray)
            .then(e => {
                mongo.createPost(post)
                    .then(x => resolve(x))
                    .catch(e => reject(e))
            })
            .catch(e => reject(e))
    })
}
