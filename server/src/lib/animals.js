const { createReadStream, unlink } = require('fs')
const csv = require('csv')
const db = require('../connections/sqlite')

const fileData = createReadStream(__dirname + "/taxonomy.csv");
const parser = csv.parse({
  skip_empty_lines: true,
  relax_column_count: true,
  trim: true,
  columns: true
});

const animalTransform = (line, cb) => {
  db.run("INSERT INTO animals(name) VALUES (?)", line.scientificName, (err) => {
    console.log(line.scientificName)
    if (err) cb(e);
    cb(null)
  });
};

const transformer = csv.transform(animalTransform, { parallel: 1 });

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

  return process().then(() => {
    console.log('done')
    //unlink(__dirname + "/taxonomy.csv", () => {});
  }).catch((e) => {
    console.log(e);
    //unlink(__dirname + "/taxonomy.csv", () => {});
  });
}



module.exports = { createAnimals }