function parseDate(date) {
    return date.substr(0, 4) + '/' + date.substr(0, 2) + '/' + date.substr(0, 2)
}

function timeStamp() {
    return (Date.now() / 1000 | 0) + ''
}
