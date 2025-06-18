# Production Deployment Guide

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# MongoDB Connection String (Use MongoDB Atlas for production)
MONGO_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/wanderLust?retryWrites=true&w=majority

# Cloudinary Configuration (Get from Cloudinary Dashboard)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Session Secret (Generate a strong random string)
SECRET=your_super_secret_session_key_here_make_it_long_and_random

# Environment
NODE_ENV=production

# Port (Will be set by deployment platform)
PORT=8080
```

## Deployment Platforms

### 1. Heroku Deployment

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGO_URL="your_mongodb_atlas_url"
   heroku config:set CLOUD_NAME="your_cloudinary_cloud_name"
   heroku config:set CLOUD_API_KEY="your_cloudinary_api_key"
   heroku config:set CLOUD_API_SECRET="your_cloudinary_api_secret"
   heroku config:set SECRET="your_session_secret"
   heroku config:set NODE_ENV="production"
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Production ready"
   git push heroku main
   ```

### 2. Railway Deployment

1. **Connect your GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

### 3. Render Deployment

1. **Connect your GitHub repository** to Render
2. **Set environment variables** in Render dashboard
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`

## Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas account**
2. **Create a new cluster**
3. **Get connection string** and replace in MONGO_URL
4. **Whitelist your IP** or use `0.0.0.0/0` for all IPs

## Cloudinary Setup

1. **Create Cloudinary account**
2. **Get credentials** from dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. **Set environment variables** with these values

## Security Considerations

1. **Session Secret**: Use a strong, random string
2. **Environment Variables**: Never commit .env file
3. **HTTPS**: Enable in production
4. **CORS**: Configure if needed
5. **Rate Limiting**: Consider adding for production

## Testing Production

1. **Test all features** after deployment
2. **Check image uploads** work with Cloudinary
3. **Verify user authentication** works
4. **Test database operations**

## Monitoring

1. **Set up logging** for production errors
2. **Monitor application performance**
3. **Set up alerts** for downtime
4. **Regular backups** of database

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**:
   - Check connection string
   - Verify IP whitelist
   - Check credentials

2. **Image Upload Fails**:
   - Verify Cloudinary credentials
   - Check environment variables

3. **Session Issues**:
   - Verify SECRET environment variable
   - Check cookie settings

4. **Port Issues**:
   - Ensure PORT environment variable is set
   - Check if port is available

## Performance Optimization

1. **Enable compression**:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add caching headers**:
   ```javascript
   app.use(express.static(path.join(__dirname, "/public"), {
     maxAge: '1d'
   }));
   ```

3. **Database indexing** for better performance
4. **Image optimization** with Cloudinary 