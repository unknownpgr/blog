//Get Tag Json
var tag_list = []

getTagList(tags => {

    var tagFrame = $('#tag_frame')

    for (var i in tags) {
        var tag = tags[i]
        var tagHtml = '<div class="tag_item" data-checked=0 data-fullpath="' + tag.fullPath + '">'
        for (var i = 1; i < tag.depth; i++) tagHtml += '.'
        tagHtml += tag.current
        tagHtml += '<div class="tag_item_sub">'
        tagHtml += '[' + tag.len + ']'
        tagHtml += '</div>'
        tagHtml += '</div>'
        tagFrame.append(tagHtml)
    }

    $('.tag_item').click(e => {
        if (e.target.dataset.checked == 0) {
            e.target.style.color = '#eee'
            e.target.dataset.checked = 1;
            tag_list.push(e.target.dataset.fullpath)
        } else {
            e.target.style.color = '#aaa'
            e.target.dataset.checked = 0;
            tag_list.pop(e.target.dataset.fullpath)
        }
    })

})

//Post rendring

var converter = new showdown.Converter();

$('#edit_button_render').click(() => {
    converted = converter.makeHtml($('#edit_input_contents').val())
    for (var i in imgNumList) {
        converted = converted.replaceAll('FILE_TEMP_' + i + '_', imgNumList[i])
    }
    $('#edit_show').html(converted)
})

$('#edit_frame').css('height', screen.height * 2 / 3 + $('#tag_frame').height() + 'px')

//Image upload

var imgList = []
var imgNumList = []

var inputTag = $('#edit_input_contents')

setDropEvent('#edit_input_contents', null, e => {
    getDroppedFile(e, onFileDrop)
})

function onFileDrop(file) {
    var imgStr = '  \n![](FILE_TEMP_' + imgNumList.length + '_)  \n'
    inputTag.val(inputTag.val() + imgStr)
    imgList.push(file)
    imgNumList.push(URL.createObjectURL(file))
}

//Submit process

$('#edit_button_submit').click(() => {

    var title = $('#edit_input_title').val()

    //Check if the values are valid
    if (title.length == 0) {
        alert('No title')
        return
    }

    if (tag_list.length == 0) {
        alert('No tags')
        return
    }

    var postID = getDateTime()
    var infoJson = JSON.stringify({
        title: title,
        tags: tag_list
    })

    var contents = $('#edit_input_contents').val()
    for (var i in imgList) contents = contents.replaceAll('FILE_TEMP_' + i + '_', './res/' + imgList[i].name)

    //Compress data

    var zip = new JSZip();
    zip.file('post.md', contents)
    zip.file('info.json', infoJson)

    var res = zip.folder('res')
    for (var i in imgList) {
        res.file(imgList[i].name, imgList[i])
    }

    //Download
    zip.generateAsync({
            type: "blob"
        })
        .then(function (content) {
            saveAs(content, postID + '.zip');
        });
})
