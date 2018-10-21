var express = require('express')
var bodyParser = require('body-parser')
const multer = require('multer');

var app = express()

app.use(express.static('static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
}));
const upload = multer({
    dest: 'uploads/',
    //    limits: {
    //        fileSize: 5 * 1024 * 1024
    //    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/submit', upload.single('file_0'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    console.log(req.files)

    res.send('success!')
})

app.listen(1415, () => {
    console.log('server Opened')
})
