import { Request, Response } from "express";
import { ApiResponse } from "../types";

// Sample controller for user operations
export class UserController {
  // Get all users
  public static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      // This would typically fetch from database
      const users = [
        {
          id: "1",
          email: "doctor@careme.com",
          firstName: "Dr. John",
          lastName: "Doe",
          role: "doctor"
        }
      ];

      const response: ApiResponse = {
        success: true,
        message: "Users fetched successfully",
        data: users
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to fetch users",
        error: error instanceof Error ? error.message : "Unknown error"
      };

      res.status(500).json(response);
    }
  }

  // Get user by ID
  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // This would typically fetch from database
      const user = {
        id,
        email: "patient@careme.com",
        firstName: "Jane",
        lastName: "Smith",
        role: "patient"
      };

      const response: ApiResponse = {
        success: true,
        message: "User fetched successfully",
        data: user
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to fetch user",
        error: error instanceof Error ? error.message : "Unknown error"
      };

      res.status(500).json(response);
    }
  }

  // Create new user
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;

      // This would typically save to database
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date()
      };

      const response: ApiResponse = {
        success: true,
        message: "User created successfully",
        data: newUser
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to create user",
        error: error instanceof Error ? error.message : "Unknown error"
      };

      res.status(500).json(response);
    }
  }
}
