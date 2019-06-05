const db = require('../connections/sqlite')

const readEdges = (req, res) => {
  console.log('read edges')
  //db.all(`SELECT edges.id, fromId, toId, n1.public AS fromPublic, n2.public AS toPublic FROM edges
    // JOIN nodes n1 ON n1.id = edges.fromId
    // JOIN nodes n2 ON n2.id = edges.toId;`, function(err, edges) {
  db.all(`SELECT id, fromId, toId FROM edges`, function(err, edges) {
    if (err) throw err;
    console.log(edges)
    return res.status(200).json({ edges })
  })
}

const createEdges = (req, res) => {
  console.log('create edges')
  let { private, edges } = req.body
  // must use old function notation
  db.get(`SELECT rowid AS id FROM nodes WHERE private == '${private}'`, function(err, auth) {
    if (err) return res.status(400).json({ err })
    if (!auth) return res.status(403).json({ error: 'Error with your food password' });
    db.all(`SELECT id, public FROM nodes WHERE public IN (${JSON.stringify(edges).slice(1, JSON.stringify(edges).length-1)})`, function(err, nodes) {
      if (err) return res.status(400).json({ err })
      edges = edges.map(e => { return { fromId: auth.id, toId: (nodes.find(n => n.public === e)).id } })
      const stmt = db.prepare("INSERT INTO edges(toId, fromId) VALUES (?, ?)");
      edges.map((a) => {
        return stmt.run([a.toId, a.fromId], (err, result) => {
          if (err && err.code === 'SQLITE_CONSTRAINT') {
            console.log(err)
          } else if (err) {
            res.status(400).json({ err })
          }
        })
      })
      stmt.finalize((err, result) => {
        if (err) return res.status(400).json({ err })
        return res.status(200).json(`Created your connections!`);
      });
    })
  })
}

const updateEdges = () => {
	
}

const deleteEdges = () => {
	
}

module.exports = {
  readEdges,
  createEdges,
  updateEdges,
  deleteEdges
}