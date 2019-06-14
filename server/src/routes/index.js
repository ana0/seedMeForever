const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const login = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const animals = require('../controllers/animals')
const uploadPath = require('../config/env').uploadPath

const upload = multer({ dest: uploadPath, limits: { fileSize: 10000000 }, fileFilter: imageFilter });

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.status(200).json('Server listening'))

  app.post('/login', login)

  // app.get('/admin/nodes', authMiddleware, (req, res) => nodes.readNodes(req, res, true))
  // app.get('/admin/nodes/:id', authMiddleware, nodes.readNodes)
  // app.post('/admin/nodes', authMiddleware, nodes.createNodes)
  // app.put('/admin/nodes/:id', authMiddleware, nodes.updateNode)
  // app.delete('/admin/nodes/:id', authMiddleware, nodes.deleteNode)

  app.get('/animals', (req, res) => animals.readAnimals(req, res, false))
  app.get('/animals/:id', (req, res) => res.status(200).json('Requested an individual animal'))
  app.post('/animals/:id', upload.single('animal'), (req, res) => res.status(200).json('Requested an individual animal'))
}

