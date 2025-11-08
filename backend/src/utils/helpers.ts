// Utility functions for the CareMe application

// Format date to ISO string
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

// Generate random ID (simple implementation)
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Hash password (placeholder - would use bcrypt in real implementation)
export const hashPassword = async (password: string): Promise<string> => {
  // This is a placeholder - in real implementation, use bcrypt
  return `hashed_${password}`;
};

// Compare password (placeholder - would use bcrypt in real implementation)
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  // This is a placeholder - in real implementation, use bcrypt
  return `hashed_${password}` === hashedPassword;
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

// Generate JWT token (placeholder - would implement proper JWT logic)
export const generateToken = (payload: object): string => {
  // This is a placeholder - in real implementation, use jsonwebtoken
  return `token_${JSON.stringify(payload)}`;
};

// Async delay utility
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Convert string to slug
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};
