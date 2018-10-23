var urlParams = new URLSearchParams(window.location.search)
var tag = urlParams.get('tag')
var tag_splitted = tag.split('.')

$('#tag_label').html('Posts by tag ' + tag)

ajaxPromise('/blog/info/list_tag.json?v=' + timeStamp())
    .then(data => {
        var current = data
        for (var i in tag_splitted) current = current.subDir[tag_splitted[i]]
        return posts = current.posts.reverse()
    })
    .then(posts => {
        return promiseForEach(posts, id => {
            return ajaxPromise('/blog/posts/' + id + '/info.json?v=' + timeStamp()).then(data => {
                id += ''
                var list_html = '<div class="list_item">'
                list_html += '<a href="/blog/post.html?id=' + id + '">' + data.title + '</a>'
                list_html += '<div class="list_item_sub">' + parseDate(id) + '</div>'
                list_html += '</div>'
                $('#tag_post_list').append(list_html)
            }).then(() => setInterval(() => $('.list_item').css('opacity', 1), 500))
        })
    })
