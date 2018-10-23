var urlParams = new URLSearchParams(window.location.search)
var tag = urlParams.get('tag')
var tag_splitted = tag.split('.')

$('#tag_label').html('Posts by tag ' + tag)

$.ajax({
    url: '/blog/info/list_tag.json?v=' + timeStamp(),
    success: data => {
        var current = data
        for (var i in tag_splitted) current = current.subDir[tag_splitted[i]]
        var posts = current.posts
        posts.forEach(i => {
            $.ajax({
                url: '/blog/posts/' + i + '/info.json?v=' + timeStamp(),
                success: data => {
                    var id = i + ''
                    var list_html = '<div class="list_item">'
                    list_html += '<a href="/blog/post.html?id=' + id + '">' + data.title + '</a>'
                    list_html += '<div class="list_item_sub">' + parseDate(id) + '</div>'
                    list_html += '</div>'
                    $('#tag_post_list').append(list_html)

                    setInterval(() => {
                        $('.list_item').css('opacity', 1)
                    }, 500)
                },
                error: console.error
            })
        })
    }
})
