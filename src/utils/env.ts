import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  ADMIN_PASSWORD_HASH: z.string().min(10, "ADMIN_PASSWORD_HASH is required"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const validateEnv = () => {
  const result = envSchema.safeParse({
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const env = process.env.NODE_ENV === "test" ? ({} as any) : validateEnv();
