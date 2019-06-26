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
    var ext = file.mimetype.split('/')[1];
    return cb(null, Date.now() + "." + ext);
  },
  // limits: { fileSize: 10000000 }
})

const upload = multer({ storage, fileFilter: imageFilter })

const corsOptions = {
  origin: [
    'https://remembering.network',
    'https://www.remembering.network'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = (app) => {
  app.use(cors(corsOptions));

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.status(200).json('Server listening'))

  app.post('/login', login)

  app.get('/animals', animals.randAnimal)
  app.get('/animals/:id', archive.readArchive)
  app.post('/animals/:id', upload.single('animal'), archive.createArchive)

  app.get('/archive', archive.randArchive)
  app.get('/archive/max', archive.maxArchive)
  app.get('/archive/:id', archive.readFile)
}

