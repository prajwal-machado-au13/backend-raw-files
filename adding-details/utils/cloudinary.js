const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'prajmach',
  api_key: '196264344361614',
  api_secret: 'YPxiNuxVoTczOGR3or9-lbGPlXc'
});

module.exports = cloudinary;