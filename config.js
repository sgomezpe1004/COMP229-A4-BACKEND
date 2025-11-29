// src/config.js or backend/config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3005,               // for local dev
  jwtSecret: process.env.JWT_SECRET,            // MUST set in Vercel env vars
  mongoUri: process.env.MONGODB_URI             // MUST set in Vercel env vars
};

// Optional: check for missing critical env vars in production
if (config.env === 'production') {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }
}

export default config;
