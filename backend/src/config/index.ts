// Configuration settings for the CareMe application

export const config = {
  // Server configuration
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173"
  },

  // Database configuration (placeholder)
  database: {
    url: process.env.DATABASE_URL || "mongodb://localhost:27017/careme",
    name: process.env.DATABASE_NAME || "careme"
  },

  // JWT configuration (placeholder)
  jwt: {
    secret:
      process.env.JWT_SECRET || "your_super_secret_key_change_in_production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10)
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || [
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    credentials: true
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || "info"
  }
};

// Validate configuration
export const validateConfig = (): void => {
  const requiredEnvVars = [];

  if (config.server.nodeEnv === "production") {
    requiredEnvVars.push("JWT_SECRET");
  }

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};
