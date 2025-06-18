// Production Configuration
module.exports = {
    // Database Configuration
    mongoURL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderLust",
    
    // Cloudinary Configuration
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    },
    
    // Session Configuration
    sessionSecret: process.env.SECRET || "fallback-secret-key-for-development",
    
    // Server Configuration
    port: process.env.PORT || 8080,
    
    // Environment
    nodeEnv: process.env.NODE_ENV || 'development'
}; 