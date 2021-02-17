const multer= require('multer')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'Public/Audio')
    },
    filename: function (req, file, cb) {

        cb(null, 'chat-' + Date.now() + Math.random() * 1000 + '.' + file.originalname)
    }
})
var filefilter = (req, file, next) => {
    try {

        if (!(file.type.includes('audio/webm') )) throw 'wrong format image'
        

        next(null, true)
    } catch (error) {
        req.bebas = error
        next(null, false)
    }
}


const upload = multer({ storage: storage, filefilter: filefilter, limits: { fileSize:500000 } }).single("audio")

module.exports = upload