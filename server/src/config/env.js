const port = process.env.PORT || 8888
const adminPassword = process.env.ADMIN_PASS
const jwtSecret = process.env.JWT_SECRET
const uploadPath = process.env.UPLOAD_PATH || '../uploads';

module.exports = {
  port,
  adminPassword,
  jwtSecret,
  uploadPath
}