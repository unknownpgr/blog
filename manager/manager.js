var fs = require('fs')
var path = require('path');

function sortByKey(dict) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function sortByValue(dict) {
    return Object.keys(o).sort((a, b) => dict[a] - dict[b]).reduce((r, k) => r[k] = o[k], r, {});
}

function asyncReadDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, list) => {
            if (err) {
                reject(err)
            } else {
                resolve(list)
            }
        })
    })
}

function asyncReadFile(dir) {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function asyncReadJson(dir) {
    return asyncReadFile(dir).then(data => {
        data = JSON.parse(data)
        return data
    })
}

//Iterate posts and check if post structure is complete.
//Todo:
function asyncCheckPost(dir) {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            var stat = fs.statSync(fullPath)
            if (!stat.isDirectory()) {
                throw Error('path is not a directory')
            }
        })
    }).then(() => {
        var subDir = fs.readdirSync(fullPath)
        if (!subDir.includes('post.md') || !subDir.includes('info.json')) {
            throw Error('there are no post.md or info.json')
        }
        return subDir;
    }).then(subDir => {
        var json = path.join(subDir, 'info.json')

    })
}

//Main task.
function mainTask(dirRawPost) {
    return asyncReadDir(dirRawPost).then(posts => {

        var byTag = {} //Ids by tag
        var byID = {} //Title by ID

        return Promise.all(posts.map(postDir => {
            return asyncReadJson(path.join(dirRawPost, postDir, 'info.json'))
                .then(infoJson => {

                    //============================================================

                    var title = infoJson['title']
                    var tags = infoJson['tags']
                    var id = postDir

                    byID[id] = title

                    tags.forEach((tag) => {
                        if (byTag[tag] == undefined) {
                            byTag[tag] = {
                                'posts': [id]
                            }
                        } else {
                            byTag[tag]['posts'].push(id)
                        }
                    })

                    //============================================================

                })
        })).then(() => {
            return {
                'byTag': byTag,
                'byID': byID
            }
        })
    })
}

//mainTask('C:/Users/kjh3864/Desktop/GitHubBlog/blog/posts_raw')
//    .then(r => console.log(r))
//    .catch(e => console.log("e" + e))

//asyncReadJson('./asdf.json').catch(e => console.log('Error log : ' + e))
