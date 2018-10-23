var fs = require('fs')
var path = require('path');
var util = require('util')

function logData(data) {
    console.log(util.inspect(data, {
        depth: null
    }))
}

function sortByKey(dict) {
    //    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function sortByValue(dict) {
    //    return Object.keys(o).sort((a, b) => dict[a] - dict[b]).reduce((r, k) => r[k] = o[k], r, {});
}

function asyncReadDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, list) => {
            if (err) reject(err)
            else resolve(list)
        })
    })
}

function asyncReadFile(dir) {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function asyncWriteFile(dir, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dir, data, (err) => {
            if (err) throw err
            else resolve()
        })
    })
}

function asyncReadJson(dir) {
    return asyncReadFile(dir).then(data => {
        data = JSON.parse(data)
        return data
    })
}

//Check if a post has error
function asyncCheckPost(fullPath) {
    return new Promise((resolve, reject) => { //Check if the post path is a directory
        fs.stat(fullPath, (err, stat) => {
            if (!stat.isDirectory()) throw Error('path is not a directory')
        })
        resolve()
    }).then(() => { //Check if the post has post.md and info.json
        fs.readdir(fullPath, (err, subs) => {
            if (!subs.includes('post.md') || !subs.includes('info.json')) {
                throw Error('there are no post.md or info.json')
            }
        })
    }).then(() => { //Load json
        var jsonDir = path.join(fullPath, 'info.json')
        return asyncReadJson(jsonDir)
    }).then(json => { //Check if the json has appropriate properties
        if (!json.title) throw Error('post has no title')
        if (!json.tags || !json.tags.length) throw Error('post has no tag')
    })
}

//Get the list.json from info.json of each post
function mainTask(dirRawPost) {
    return asyncReadDir(dirRawPost).then(posts => {

        var byTag = {} //Ids by tag
        var byID = {} //Title by ID

        //Parse json and add data to 'byTag'. so dependent on 'byTag'
        function parseInfo(id, json) {

            //Create path if it doesn't exist and add value
            function treeAdd(dict, path, value) {
                var current = dict;
                var path = path.split('.')

                //Create path if it doesn't exist
                path.forEach(dir => {
                    if (!current.subDir) current.subDir = {}
                    if (!current.subDir[dir]) current.subDir[dir] = {}
                    current = current.subDir[dir]
                })
                if (!current.posts) current.posts = []

                //Push value
                current.posts.push(value)
            }

            var title = json.title
            var tags = json.tags

            byID[id] = title

            tags.forEach((tag) => {
                treeAdd(byTag, tag, id)
            })
        }

        return Promise.all(posts.map(postDir => {
            return asyncReadJson(path.join(dirRawPost, postDir, 'info.json'))
                .then(infoJson => {

                    //============================================================

                    var id = postDir
                    parseInfo(id, infoJson)

                    //============================================================

                })
        })).then(() => { //called when every task ended without errors
            return {
                'byTag': byTag,
                'byID': byID
            }
        })
    })
}

mainTask('C:/Users/kjh3864/Desktop/GitHubPage/blog/posts')
    .then(r => {
        logData(JSON.parse(JSON.stringify(r)))
        return r
    })
    .then(r => {
        return asyncWriteFile('C:/Users/kjh3864/Desktop/GitHubPage/blog/info/list_tag.json', JSON.stringify(r.byTag)).then(() => {
            return r
        })
    }).then(r => {
        return asyncWriteFile('C:/Users/kjh3864/Desktop/GitHubPage/blog/info/list_id.json', JSON.stringify(r.byID))
    })
    .catch(console.trace)
    .then(() => console.log('All done'))

//asyncReadJson('./asdf.json').catch(e => console.log('Error log : ' + e))

//asyncCheckPost('C:/Users/kjh3864/Desktop/GitHubBlog/blog/posts_raw/201810191651')
//    .catch(e => console.log(e))

//  < For Condition Check >
//if(1)console.log('true')
//else console.log('false')
