const imageFilter = function (req, file, cb) {
  // accept image only
  const lower = file.originalname.toLowerCase()
  if (!lower.match(/\.(jpg|jpeg|heic|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = { imageFilter }