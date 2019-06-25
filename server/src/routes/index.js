const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const login = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const animals = require('../controllers/animals')
const archive = require('../controllers/archive')
const uploadPath = require('../config/env').uploadPath
const imageFilter = require('../lib/images').imageFilter

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    cb(null, Date.now() + '.jpg') //Appending .jpg
  },
  limits: { fileSize: 10000000 }
})

const upload = multer({ storage, fileFilter: imageFilter })

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.status(200).json('Server listening'))

  app.post('/login', login)

  app.get('/animals', animals.randAnimal)
  app.get('/animals/:id', archive.readArchive)
  app.post('/animals/:id', upload.single('animal'), archive.createArchive)

  app.get('/archive', archive.randArchive)
  app.get('/archive/:id', archive.readFile)
}

