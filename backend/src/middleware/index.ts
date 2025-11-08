import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

// Error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  const status = (error as any).status || (error as any).statusCode || 500;
  const message = error.message || "Internal Server Error";

  const response: ApiResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: error.stack })
  };

  res.status(status).json(response);
};

// Request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

// 404 Not Found middleware
export const notFound = (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: "Not Found"
  };

  res.status(404).json(response);
};
