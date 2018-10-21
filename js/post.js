var urlParams = new URLSearchParams(window.location.search)
var postId = urlParams.get('id')
if (!postId) postId = 201810191651
var postUrl = '/blog/posts/' + postId + '/'
$.ajax({
    url: postUrl + 'post.md',
    success: data => {
        var converter = new showdown.Converter();
        var mdHtml = converter.makeHtml(data);
        mdHtml = mdHtml.replace('./', postUrl)
        $('#content_frame').append(mdHtml)
    },
    error: err => {
        alert('Error on load post : ID = ' + postId)
        window.location.href = '/blog/index.html'
    }
})

$.ajax({
    url: postUrl + 'info.json',
    success: data => {
        $('#label_title').html(data.title)
        var tagString = '<div id="label_tag">Tags : '
        data.tags.forEach(item => {
            tagString += '<a class="label_tag_item" href="/blog/tag.html?tag=' + item + '">' + item + '</a>'
        })
        tagString += '</div>'
        $('#tag_frame').append(tagString)
    }
})

setTimeout(() => {
    $('#main').css('opacity', '1')
    $('#main').css('margin', '0')
    $('#main').css('padding-top', '10%')
    $('#main').css('padding-left', '10%')
    $('#main').css('padding-right', '10%')
    $('#main').css('padding-bottom', '10%')
    $('#main').css('background-color', '#fafafa')
}, 500)
