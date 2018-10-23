getTagList(tags => {

    console.log(tags)

    for (var i in tags) {
        var tag = tags[i]
        var list_html = '<div class="list_item">'
        list_html += '<a href="/blog/tag.html?tag=' + tag.fullPath + '">'
        for (var i = 1; i < tag.depth; i++) list_html += ". "
        list_html += tag.current
        list_html += '</a>'
        list_html += '<div class="list_item_sub">[ ' + tag.len + ' ]</div>'
        list_html += '</div>'
        $('#list_tags').append(list_html)
        setTimeout(() => {
            $('.list_item').css('opacity', 1)
        }, 500)
    }
})
