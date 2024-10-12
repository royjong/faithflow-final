import { PrismaClient } from '@prisma/client';

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
}

// Declare a global variable for the Prisma Client instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Hardcode environment to 'production' by default
const isProduction = true; // Set this to false for development

// Use the existing global instance if it exists, otherwise create a new one
const prisma =
  isProduction
    ? prismaClientSingleton() // Create a new instance for production
    : globalThis.prismaGlobal ?? (globalThis.prismaGlobal = prismaClientSingleton()); // Use existing instance or create a new one in development

export default prisma;