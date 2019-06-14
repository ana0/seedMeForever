const imageFilter = function (req, file, cb) {
  // accept image only
  console.log(req)
  console.log(file)
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = { imageFilter }