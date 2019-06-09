const { createReadStream } = require('fs')
const csv = require('csv')
const db = require('../connections/sqlite')

const fileData = createReadStream(__dirname + "/taxonomy.csv");
const parser = csv.parse({
  skip_empty_lines: true,
  relax_column_count: true,
  trim: true,
  columns: true
});

const transform = (line, cb) => {
  return console.log(line)
    .then(() => cb(null))
    .catch(e => cb(e));
};

const transformer = csv.transform(transform, { parallel: 1 });

const process = () => {
  console.log('processing')
  return new Promise((resolve, reject) => {
    fileData.pipe(parser).pipe(transformer);
    transformer.on('error', (e) => { reject(e); });
    parser.on('error', (e) => { reject(e); });
    transformer.on('finish', () => {
      return resolve(`Created animals`);
    });
  });
};

const createAnimals = async () => {
  console.log('called create animals')
  // db.run("INSERT INTO users(username, password) VALUES (?, ?)", ['admin', pass], (err) => {
  //   if (err) throw err;
  //   console.log('saved admin')
  // });
  return process().then(() => {
    console.log('done')
    unlink('taxonomy.csv');
  }).catch((e) => {
    console.log(e);
    unlink('taxonomy.csv');
  });
}



module.exports = { createAnimals }