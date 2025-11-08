import { Request, Response, NextFunction } from "express";
import { JWTUtils } from "../utils/jwt";
import { ApiResponse } from "../types";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Authentication middleware to verify JWT tokens
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      const response: ApiResponse = {
        success: false,
        message: "Access denied. No token provided.",
        error: "Unauthorized"
      };
      res.status(401).json(response);
      return;
    }

    const decoded = JWTUtils.verifyAccessToken(token);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Invalid token.",
      error: error instanceof Error ? error.message : "Unauthorized"
    };
    res.status(401).json(response);
  }
};

/**
 * Optional authentication middleware - continues even if no token provided
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = JWTUtils.verifyAccessToken(token);
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};
