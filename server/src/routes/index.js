const bodyParser = require('body-parser')
const cors = require('cors')
const login = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const nodes = require('../controllers/nodes')
const edges = require('../controllers/edges')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.status(200).json('Server listening'))

  app.post('/login', login)

  app.get('/admin/nodes', authMiddleware, (req, res) => nodes.readNodes(req, res, true))
  app.get('/admin/nodes/:id', authMiddleware, nodes.readNodes)
  app.post('/admin/nodes', authMiddleware, nodes.createNodes)
  app.put('/admin/nodes/:id', authMiddleware, nodes.updateNode)
  app.delete('/admin/nodes/:id', authMiddleware, nodes.deleteNode)

  app.get('/nodes', (req, res) => nodes.readNodes(req, res, false))
  app.get('/nodes/:key', nodes.search)

  app.get('/edges/', edges.readEdges)
  app.post('/edges', edges.createEdges)
  app.put('/edges', (req, res) => res.status(200).json('Edges endpoint'))
  app.delete('/edges', (req, res) => res.status(200).json('Edges endpoint'))
}

