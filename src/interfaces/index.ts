import * as readline from "readline";
export interface EnvConfig {
  MEILISEARCH_HOST: string;
  API_KEY: string;
  BATCH_SIZE: number;
}

export interface Product {
  id?: string;
  [key: string]: any;
}
