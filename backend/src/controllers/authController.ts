import { Request, Response } from "express";
import { JWTUtils } from "../utils/jwt";
import { PasswordUtils } from "../utils/password";
import { ApiResponse, UserRole } from "../types";

// Simple in-memory user store for demo (in real app, use database)
const users = [
  {
    id: "1",
    email: "admin@careme.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiYlU.4xDdlW", // password123
    firstName: "Admin",
    lastName: "User",
    role: UserRole.ADMIN
  },
  {
    id: "2",
    email: "doctor@careme.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiYlU.4xDdlW", // password123
    firstName: "Dr. John",
    lastName: "Doe",
    role: UserRole.DOCTOR
  },
  {
    id: "3",
    email: "patient@careme.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiYlU.4xDdlW", // password123
    firstName: "Jane",
    lastName: "Smith",
    role: UserRole.PATIENT
  }
];

export class AuthController {
  /**
   * Login user and return JWT token
   */
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        const response: ApiResponse = {
          success: false,
          message: "Email and password are required",
          error: "Validation Error"
        };
        res.status(400).json(response);
        return;
      }

      // Find user
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!user) {
        const response: ApiResponse = {
          success: false,
          message: "Invalid email or password",
          error: "Authentication Failed"
        };
        res.status(401).json(response);
        return;
      }

      // Verify password
      const isValidPassword = await PasswordUtils.comparePassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        const response: ApiResponse = {
          success: false,
          message: "Invalid email or password",
          error: "Authentication Failed"
        };
        res.status(401).json(response);
        return;
      }

      // Generate JWT token
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const { accessToken } = JWTUtils.generateTokens(tokenPayload);

      // Return success response
      const response: ApiResponse = {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          },
          accessToken,
          tokenType: "Bearer"
        }
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error"
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get current user profile (protected route)
   */
  public static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: "User not authenticated",
          error: "Unauthorized"
        };
        res.status(401).json(response);
        return;
      }

      // Find user details
      const user = users.find((u) => u.id === req.user?.userId);
      if (!user) {
        const response: ApiResponse = {
          success: false,
          message: "User not found",
          error: "Not Found"
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: "Profile retrieved successfully",
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to get profile",
        error: error instanceof Error ? error.message : "Unknown error"
      };
      res.status(500).json(response);
    }
  }
}
