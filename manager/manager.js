var fs = require('fs')

// 
function checkDir(dir) {
    dir = dir.replace('\\', '/')
    if (dir.slice(-1) != '/') {
        dir += '/'
    }
    return dir
}

//
function iterateDir(dir, cb, err) {

    var list = []

    dir = checkDir(dir)

    var list = fs.readdirSync(dir)
    for (var i in list) {
        var fullPath = dir + list[i]
        var stat = fs.stat(fullPath)
        if (stat.isFile()) {
            list.push(fullPath)
        } else {
            cb(fullPath)
        }
    }
}

