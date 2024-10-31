import envConfig from "@constants";
import axios from "axios";

async function deleteIndex(indexName: string): Promise<void> {
  try {
    const response = await axios.delete(
      `${envConfig.MEILISEARCH_HOST}/indexes/${indexName}`,
      {
        headers: {
          Authorization: `Bearer ${envConfig.API_KEY}`,
        },
      }
    );

    console.log(`Index "${indexName}" deleted successfully:`, response.data);
  } catch (error: any) {
    throw new Error(`Error deleting index "${indexName}":`);
  }
}

export default deleteIndex;
