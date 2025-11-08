import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import database and routes
import Database from "./config/database";
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middleware/auth";
import { AuthController } from "./controllers/authController";

class Server {
  public app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "8000", 10);

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const db = Database.getInstance();
      await db.connect();

      // Seed initial users
      await AuthController.seedUsers();
    } catch (error) {
      console.error("❌ Failed to initialize database:", error);
      process.exit(1);
    }
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200
      })
    );

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    this.app.use(
      morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
    );

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  }

  private initializeRoutes(): void {
    // Health check route
    // this.app.use("/api/health", healthRoutes);

    // Authentication routes
    this.app.use("/api/auth", authRoutes);

    // Protected route example
    this.app.get(
      "/api/protected",
      authenticateToken,
      (req: Request, res: Response) => {
        res.json({
          success: true,
          message: "This is a protected route",
          user: req.user
        });
      }
    );

    // API routes will be added here
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "CareMe API Server is running!",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
      });
    });

    // 404 handler
    this.app.use("*", (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        error: "Not Found"
      });
    });
  }

  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Error:", error);

        const status =
          (error as any).status || (error as any).statusCode || 500;
        const message = error.message || "Internal Server Error";

        res.status(status).json({
          success: false,
          message,
          ...(process.env.NODE_ENV === "development" && { stack: error.stack })
        });
      }
    );
  }

  public async start(): Promise<void> {
    try {
      await this.initializeDatabase();

      this.app.listen(this.port, () => {
        console.log(`🚀 CareMe API Server running on port ${this.port}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`🌐 Access URL: http://localhost:${this.port}`);
        console.log("✅ Server started successfully");
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }
}

// Create and start server
const server = new Server();
server.start();

export default server.app;
