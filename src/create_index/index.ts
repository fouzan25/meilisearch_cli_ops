import envConfig from "@constants";
import axios from "axios";

async function createIndex(indexName: string): Promise<void> {
  try {
    const response = await axios.post(
      `${envConfig.MEILISEARCH_HOST}/indexes`,
      { uid: indexName },
      {
        headers: {
          Authorization: `Bearer ${envConfig.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Index "${indexName}" created successfully:`, response.data);
  } catch (error: any) {
    throw new Error(`Error creating index "${indexName}":`);
  }
}

export default createIndex;
