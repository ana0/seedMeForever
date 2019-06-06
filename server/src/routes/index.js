const bodyParser = require('body-parser')
const cors = require('cors')
const login = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const animals = require('../controllers/animals')

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
}

