import { Router, Request, Response } from "express";

const router = Router();

// Health check endpoint
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "CareMe API Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Detailed health check with system info
router.get("/detailed", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Detailed health check",
    timestamp: new Date().toISOString(),
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development"
    },
    status: "operational"
  });
});

export default router;
