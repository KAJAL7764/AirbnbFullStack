const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('./config.js');

// Cloudinary Configuration with error handling
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

// Verify cloudinary configuration
if (!config.cloudinary.cloud_name || !config.cloudinary.api_key || !config.cloudinary.api_secret) {
    console.warn('Warning: Cloudinary credentials not properly configured. Image uploads may fail.');
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png", "jpg", "jpeg"] // supports promises as well
    },
});

module.exports = {
    cloudinary,
    storage,
};