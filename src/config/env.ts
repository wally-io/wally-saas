export type Environment = "production" | "staging" | "development" | "test"

export const __PROD__ = process.env.NODE_ENV === "production"
export const __STAGING__ = process.env.NODE_ENV === "staging"
export const __DEV__ = process.env.NODE_ENV === "development"
export const __TEST__ = process.env.NODE_ENV === "test"
export const __ENV__ = process.env.NODE_ENV as Environment
