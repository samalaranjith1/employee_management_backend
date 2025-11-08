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
   * Create healthcare portal test users for hackathon
   */
  public static async seedUsers(): Promise<void> {
    try {
      // Check if users already exist
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        console.log("🌱 Users already exist, skipping seed");
        return;
      }

      // Create test password (simple for hackathon)
      const hashedPassword = await PasswordUtils.hashPassword("demo123");

      const testUsers = [
        // Admin User
        {
          email: "admin@careme.com",
          password: hashedPassword,
          firstName: "System",
          lastName: "Administrator",
          role: UserRole.ADMIN
        },

        // Healthcare Providers
        {
          email: "dr.smith@careme.com",
          password: hashedPassword,
          firstName: "Dr. Emily",
          lastName: "Smith",
          role: UserRole.HEALTHCARE_PROVIDER
        },
        {
          email: "dr.johnson@careme.com",
          password: hashedPassword,
          firstName: "Dr. Michael",
          lastName: "Johnson",
          role: UserRole.HEALTHCARE_PROVIDER
        },
        {
          email: "nurse.wilson@careme.com",
          password: hashedPassword,
          firstName: "Sarah",
          lastName: "Wilson",
          role: UserRole.HEALTHCARE_PROVIDER
        },

        // Patients
        {
          email: "john.doe@email.com",
          password: hashedPassword,
          firstName: "John",
          lastName: "Doe",
          role: UserRole.PATIENT
        },
        {
          email: "jane.smith@email.com",
          password: hashedPassword,
          firstName: "Jane",
          lastName: "Smith",
          role: UserRole.PATIENT
        },
        {
          email: "robert.brown@email.com",
          password: hashedPassword,
          firstName: "Robert",
          lastName: "Brown",
          role: UserRole.PATIENT
        },
        {
          email: "mary.davis@email.com",
          password: hashedPassword,
          firstName: "Mary",
          lastName: "Davis",
          role: UserRole.PATIENT
        },
        {
          email: "david.wilson@email.com",
          password: hashedPassword,
          firstName: "David",
          lastName: "Wilson",
          role: UserRole.PATIENT
        }
      ];

      await User.insertMany(testUsers);
      console.log("🌱 Healthcare portal users created successfully!");
      console.log("📧 Login credentials (Password: demo123):");
      console.log("\n👨‍💼 Admin:");
      console.log("   admin@careme.com");
      console.log("\n👩‍⚕️ Healthcare Providers:");
      console.log("   dr.smith@careme.com");
      console.log("   dr.johnson@careme.com");
      console.log("   nurse.wilson@careme.com");
      console.log("\n🏥 Patients:");
      console.log("   john.doe@email.com");
      console.log("   jane.smith@email.com");
      console.log("   robert.brown@email.com");
      console.log("   mary.davis@email.com");
      console.log("   david.wilson@email.com");
      console.log("\n🔑 All passwords: demo123");
    } catch (error) {
      console.error("❌ Error seeding users:", error);
    }
  }

  /**
   * Get users by role (for healthcare providers to see patients)
   */
  public static async getUsersByRole(
    req: Request,
    res: Response
  ): Promise<void> {
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

      // Only healthcare providers and admins can view user lists
      if (
        req.user.role !== UserRole.HEALTHCARE_PROVIDER &&
        req.user.role !== UserRole.ADMIN
      ) {
        const response: ApiResponse = {
          success: false,
          message: "Access denied. Insufficient permissions.",
          error: "Forbidden"
        };
        res.status(403).json(response);
        return;
      }

      const { role } = req.query;
      let users;

      if (role) {
        users = await User.find({ role, isActive: true }).select("-password");
      } else {
        // If no role specified, show patients for healthcare providers
        users = await User.find({
          role: UserRole.PATIENT,
          isActive: true
        }).select("-password");
      }

      const response: ApiResponse = {
        success: true,
        message: "Users retrieved successfully",
        data: {
          users,
          count: users.length
        }
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to get users",
        error: error instanceof Error ? error.message : "Unknown error"
      };
      res.status(500).json(response);
    }
  }
}
