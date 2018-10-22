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

//get files form event
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

function getDateTime() {
    var d = new Date();
    return d.getFullYear() +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        ("00" + d.getDate()).slice(-2) +
        ("00" + d.getHours()).slice(-2) +
        ("00" + d.getMinutes()).slice(-2)
}
