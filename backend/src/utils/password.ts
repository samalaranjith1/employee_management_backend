import bcrypt from "bcryptjs";

export class PasswordUtils {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash a password using bcrypt
   */
  public static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(
        `Failed to hash password: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Compare a plain text password with a hashed password
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(
        `Failed to compare passwords: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Validate password strength
   */
  public static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check minimum length
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    // Check maximum length
    if (password.length > 128) {
      errors.push("Password must not exceed 128 characters");
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    // Check for number
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    // Check for common patterns
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /admin/i,
      /test/i
    ];

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        errors.push("Password contains common patterns and is not secure");
        break;
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate a random password
   */
  public static generateRandomPassword(length: number = 12): string {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allChars = uppercase + lowercase + numbers + symbols;

    let password = "";

    // Ensure at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest with random characters
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  /**
   * Check if password has been compromised (basic implementation)
   * In a real application, you might want to check against known breach databases
   */
  public static isPasswordCompromised(password: string): boolean {
    const commonPasswords = [
      "password",
      "123456",
      "123456789",
      "qwerty",
      "abc123",
      "password123",
      "admin",
      "letmein",
      "welcome",
      "monkey",
      "dragon",
      "master",
      "hello",
      "freedom",
      "whatever",
      "jesus",
      "ninja",
      "mustang",
      "password1",
      "batman"
    ];

    return commonPasswords.includes(password.toLowerCase());
  }

  /**
   * Calculate password strength score (0-100)
   */
  public static calculatePasswordStrength(password: string): number {
    let score = 0;

    // Length bonus
    score += Math.min(password.length * 4, 25);

    // Character variety bonus
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    // Unique characters bonus
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 20);

    // Pattern penalties
    if (/(.)\1{2,}/.test(password)) score -= 10; // Repeating characters
    if (/123|abc|qwe/i.test(password)) score -= 15; // Sequential patterns

    // Common password penalty
    if (this.isPasswordCompromised(password)) score -= 25;

    return Math.max(0, Math.min(100, score));
  }
}
