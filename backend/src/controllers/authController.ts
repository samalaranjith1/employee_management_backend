import { Request, Response } from "express";
import { JWTUtils } from "../utils/jwt";
import { PasswordUtils } from "../utils/password";
import { ApiResponse, UserRole } from "../types";
import User from "../models/User";

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

      // Find user in database
      const user = await User.findOne({ 
        email: email.toLowerCase(),
        isActive: true 
      });

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

      // Find user in database
      const user = await User.findById(req.user.userId);
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
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
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

  /**
   * Create some initial test users
   */
  public static async seedUsers(): Promise<void> {
    try {
      // Check if users already exist
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        console.log('🌱 Users already exist, skipping seed');
        return;
      }

      // Create test users
      const hashedPassword = await PasswordUtils.hashPassword('password123');
      
      const testUsers = [
        {
          email: 'admin@careme.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: UserRole.ADMIN
        },
        {
          email: 'doctor@careme.com',
          password: hashedPassword,
          firstName: 'Dr. John',
          lastName: 'Doe',
          role: UserRole.DOCTOR
        },
        {
          email: 'patient@careme.com',
          password: hashedPassword,
          firstName: 'Jane',
          lastName: 'Smith',
          role: UserRole.PATIENT
        }
      ];

      await User.insertMany(testUsers);
      console.log('🌱 Test users created successfully');
      console.log('📧 Login credentials:');
      testUsers.forEach(user => {
        console.log(`   ${user.role}: ${user.email} / password123`);
      });
    } catch (error) {
      console.error('❌ Error seeding users:', error);
    }
  }
}
