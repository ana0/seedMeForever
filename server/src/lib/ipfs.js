const ipfs = require('../connections/ipfs')
const fs = require('fs');

const pin = (animal) => {
  return new Promise((res, rej) => {
    fs.readFile(animal.path, (err, data) => {
      console.log(data)
      ipfs.add(data, { pin: true }, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return rej(err)
        }
        let url = `https://gateway.ipfs.io/ipfs/${result[0].hash}`
        res(url)
      })
    })
  })
}

module.exports = { pin }