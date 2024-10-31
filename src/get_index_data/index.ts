import envConfig from "@constants";
import axios from "axios";

async function getDocuments(indexName: string): Promise<void> {
  try {
    const response = await axios.get(
      `${envConfig.MEILISEARCH_HOST}/indexes/${indexName}/documents`,
      {
        headers: {
          Authorization: `Bearer ${envConfig.API_KEY}`,
        },
      }
    );

    console.log(`${indexName} documents fetched successfully:`, response.data);
  } catch (error: any) {
    throw new Error(`Error fetching documents from ${indexName}:`);
  }
}

export default getDocuments;
