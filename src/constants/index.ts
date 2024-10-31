import { getEnvVar } from "@helpers/utils";
import { EnvConfig } from "@interfaces";

const envConfig: EnvConfig = {
  MEILISEARCH_HOST: getEnvVar("MEILISEARCH_HOST"),
  API_KEY: getEnvVar("API_KEY"),
  BATCH_SIZE: parseInt(getEnvVar("BATCH_SIZE", false) || "1000"),
};

export default envConfig;
