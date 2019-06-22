const ipfs = require('../connections/ipfs')
const fs = require('fs');

const pin = (animal) => {
  return new Promise((res, rej) => {
    fs.readFile(animal.path, (err, data) => {
      //const buf = Buffer.from(data) // Convert data into buffer
      console.log(data)
      ipfs.add(data, { pin: true }, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          rej(err)
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        res(url)
      })
    })
  })
}

module.exports = { pin }