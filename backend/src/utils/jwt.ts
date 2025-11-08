import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types";

export class JWTUtils {
  private static readonly ACCESS_TOKEN_SECRET = process.env
    .JWT_SECRET as string;
  private static readonly ACCESS_TOKEN_EXPIRES_IN =
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || ("1h" as string);
  private static readonly REFRESH_TOKEN_EXPIRES_IN =
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || ("7d" as string);

  /**
   * Generate access token
   */
  public static generateAccessToken(
    payload: Omit<JwtPayload, "iat" | "exp">
  ): string {
    if (!this.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const signOptions: SignOptions = {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN as string,
      issuer: "careme-api",
      audience: "careme-app"
    };

    return jwt.sign(payload as object, this.ACCESS_TOKEN_SECRET, signOptions);
  }

  /**
   * Generate refresh token
   */
  public static generateRefreshToken(
    payload: Omit<JwtPayload, "iat" | "exp">
  ): string {
    if (!this.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const signOptions: SignOptions = {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN as string,
      issuer: "careme-api",
      audience: "careme-app"
    };

    return jwt.sign(payload as object, this.ACCESS_TOKEN_SECRET, signOptions);
  }

  /**
   * Generate both access and refresh tokens
   */
  public static generateTokens(payload: Omit<JwtPayload, "iat" | "exp">): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  /**
   * Verify access token
   */
  public static verifyAccessToken(token: string): JwtPayload {
    if (!this.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    try {
      const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET, {
        issuer: "careme-api",
        audience: "careme-app"
      }) as JwtPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Access token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid access token");
      }
      throw error;
    }
  }

  /**
   * Verify refresh token
   */
  public static verifyRefreshToken(token: string): JwtPayload {
    if (!this.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    try {
      const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET, {
        issuer: "careme-api",
        audience: "careme-app"
      }) as JwtPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Refresh token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid refresh token");
      }
      throw error;
    }
  }

  /**
   * Extract token from Authorization header
   */
  public static extractTokenFromHeader(
    authHeader: string | undefined
  ): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  /**
   * Decode token without verification (for debugging)
   */
  public static decodeToken(token: string): any {
    return jwt.decode(token);
  }

  /**
   * Check if token is expired
   */
  public static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded || !decoded.exp) {
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
}
