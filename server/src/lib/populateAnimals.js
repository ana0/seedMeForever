import { createReadStream } from 'fs';
const db = require('../connections/sqlite')

const fileData = createReadStream('../taxonomy.csv');
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

  // db.run("INSERT INTO users(username, password) VALUES (?, ?)", ['admin', pass], (err) => {
  //   if (err) throw err;
  //   console.log('saved admin')
  // });
  return process().then(() => {
    unlink('../taxonomy.csv');
  }).catch((e) => {
    console.log(e);
    unlink('../taxonomy.csv');
  });
}



module.exports = { createAnimals }