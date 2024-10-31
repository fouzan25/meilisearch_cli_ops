import { rl } from "@services";
import dotenv from "dotenv";
dotenv.config();

export const operations: string[] = [
  "Create indexes",
  "Add data to indexes",
  "Get indexes data ",
  "List indexes",
  "indexes status",
  "Delete indexes",
];

export function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value!;
}

export function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}
export function closeReadLine(): void {
  rl.close();
}
