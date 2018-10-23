$.ajax({
    url: '/blog/info/list_id.json?v=' + timeStamp(),
    success: data => {

        Object.keys(data).sort().reverse().forEach(id => {
            var list_html = ''
            list_html += '<div class="list_item"><a href="/blog/post.html?id=' + id + '">' + data[id] + '</a>'
            list_html += '<div class="list_item_sub">' + parseDate(id) + '</div>'
            list_html += '</div>'
            $('#list_posts').append(list_html)
        })

        setTimeout(() => {
            $('.list_item').css('opacity', 1)
        }, 500)
    }
})
