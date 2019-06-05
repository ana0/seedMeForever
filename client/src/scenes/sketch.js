const countConnections= (nodes, edges) => {
  return nodes.map(n => {
    n.count = edges.reduce((count, e) => {
      if (e.toId === n.id || e.fromId === n.id) {
        count += 1
      }
      return count
    }, 0)
    return n
  })
}

const maxConnections = (nodes) => {
  let max;
  const list = [3, 2, 1]
  list.map(l => {
    max = nodes.reduce((m, n) => {
      if (n.count >= max) return m;
      if (n.count > m) return n.count;
      return m;
    }, 0)
    nodes = nodes.map(n => {
      if (n.count === max) { n.max = l }
      else if (n.count < max) { n.max = 0 }
      return n;
    })
    return l
  })
  return nodes
}

export default function (p) {
  let edges = [];
  let dragging = false;
  let nodes = [];
  let draggedNode = {};

  const setFill = (max) => { 
    if (max === 3) { return{ r: 249, g: 42, b: 97 } }
    else if (max === 2) { return { r: 255, g: 187, b: 0 } }
    else if (max === 1) { return { r: 42, g: 249, b: 108 } }
    else { return { r: 255, g: 0, b: 255 } }
  }

  const drawConcentric = (x, y, colour) => {
    p.fill(colour.r, colour.g, colour.b, 255)
    p.circle(x, y, 20)
    p.fill(colour.r, colour.g, colour.b, 105)
    p.circle(x, y, 30)
    p.fill(colour.r, colour.g, colour.b, 50)
    p.circle(x, y, 40)
    p.fill(colour.r, colour.g, colour.b, 20)
    p.circle(x, y, 60)
    p.fill(colour.r, colour.g, colour.b, 255)
  }

  p.mousePressed = () => {
    nodes.map((n, index) => {
      if (p.mouseX > (n.x - 10) && p.mouseX < (n.x + 10) && p.mouseY > (n.y - 10) && p.mouseY < (n.y + 20)) {
        dragging = true;
        draggedNode = index;
      }
      return n
    })
  }

  p.mouseDragged = () => {
    if (!nodes[draggedNode]) return;
    nodes[draggedNode].x = p.mouseX
    nodes[draggedNode].y = p.mouseY
  }

  p.mouseReleased = () => {
    draggedNode = {}
    dragging = false;
  }

  p.setup = () => {
    console.log(p.props)
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(255)
  }

  p.draw = () => {
  	if (p.props.links.length !== edges.length) {
  	  console.log(p.props.links)
      nodes = countConnections(p.props.nodes, p.props.links)
      nodes = maxConnections(nodes)
      edges = p.props.links.map(e => {
        p.stroke(0)
        p.line(e.source.x, e.source.y, e.target.x, e.target.y)
        return e
      })
      nodes = nodes.map((n) => {
        p.noStroke();
        const colour = setFill(n.max)
        if (n.count === 0) return n
        drawConcentric(n.x, n.y, colour)
        p.fill(0)
        p.text(`${n.public} ${n.count}`, n.x, n.y);
        return n
      })
  	}

    if (dragging) {
      p.background(255)
      nodes = countConnections(p.props.nodes, p.props.links)
      nodes = maxConnections(nodes)
      edges = p.props.links.map(e => {
        p.stroke(0)
        p.line(e.source.x, e.source.y, e.target.x, e.target.y)
        return e
      })
      nodes = nodes.map((n) => {
        p.noStroke();
        const colour = setFill(n.max)
        if (n.count === 0) return n
        drawConcentric(n.x, n.y, colour)
        p.fill(0)
        p.text(`${n.public} ${n.count}`, n.x, n.y);
        return n
      })
    }
  }
}