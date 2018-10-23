String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

//Parse datetiem = postid to readable string : ex) 201810231917 => 2018/10/23
function parseDate(date) {
    return date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2)
}

//Timestamp for chache refresh
function timeStamp() {
    return (Date.now() / 1000 | 0) + ''
}

//Clear drag data
function removeDragData(ev) {
    if (ev.dataTransfer.items) ev.dataTransfer.items.clear()
    else ev.dataTransfer.clearData();
}

//Set drop event on selected element
function setDropEvent(selector, dragOver, drop) {
    var element = $(selector)

    element.on('dragover', e => {
        e.preventDefault()
        if (dragOver) dragOver(e.originalEvent)
    })
    element.on('drop', e => {
        e.preventDefault()
        if (drop) drop(e.originalEvent)
        removeDragData(e.originalEvent)
    })
}

//Get files form event
function getDroppedFile(e, callback) {
    if (e.dataTransfer.items) {
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === 'file') onFileDrop(e.dataTransfer.items[i].getAsFile());
        }
    } else {
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            callback(e.dataTransfer.files[i]);
        }
    }
}

//Get datetime = postid
function getDateTime() {
    var d = new Date();
    return d.getFullYear() +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        ("00" + d.getDate()).slice(-2) +
        ("00" + d.getHours()).slice(-2) +
        ("00" + d.getMinutes()).slice(-2)
}

//Get tag list
function getTagList(callback) {

    $.ajax({
        url: '/blog/info/list_tag.json?v=' + timeStamp(),
        success: data => {
            console.log(data)

            var tags = []

            function addList(json, parant, current, depth) {
                //For hierarchy purpose
                if (current.length) {
                    var tagStr = (parant + '.' + current).substr(2)
                    var len = 0
                    if (json.posts) len = json.posts.length
                    tags.push({
                        fullPath: tagStr,
                        current: current,
                        len: len,
                        depth: depth
                    })
                }
                if (json.subDir) {
                    for (var i in json.subDir) addList(json.subDir[i], parant + '.' + current, i, depth + 1) //recursive call
                }
            }

            addList(data, '', '', 0)

            callback(tags)
        }
    })
}

//Promisefied ajax
var ajaxPromise = url => new Promise((resolve, reject) => {
    $.ajax({
        url: url,
        success: resolve,
        error: reject
    })
})

//Chain promises, preserving order
var chainPromise = promiseArray => promiseArray.reduce((sum, current) => sum.then(() => current), Promise.resolve())

//Map promisetask on array and chain it.
var promiseForEach = (array, promiseTask) => chainPromise(array.map(promiseTask))
