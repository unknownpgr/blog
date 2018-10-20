$.ajax({
    url: '/blog/info/list_tag.json',
    success: data => {
        console.log(data)

        function addList(json, parant, current, depth) {
            //For hierarchy purpose
            if (current.length) {
                var list_html = '<div class="list_item"><a href="/blog/tag.html?tag=' + (parant + '.' + current).substr(2) + '">'
                for (var i = 1; i < depth; i++) list_html += ". "
                list_html += current
                list_html += '</a>'
                var len = 0;
                if (json.posts) len = json.posts.length
                list_html += '<div class="list_item_sub">[ ' + len + ' ]</div>'
                list_html += '</div>'
                $('#list_tags').append(list_html)
            }
            if (json.subDir) {
                for (var i in json.subDir) addList(json.subDir[i], parant + '.' + current, i, depth + 1) //recursive call
            }
        }

        addList(data, '', '', 0)

        setTimeout(() => {
            $('.list_item').css('opacity', 1)
        }, 500)

    }
})
