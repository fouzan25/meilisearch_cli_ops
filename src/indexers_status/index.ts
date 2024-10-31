import envConfig from "@constants";
import axios from "axios";

async function getIndexStats(indexName: string): Promise<void> {
  try {
    const response = await axios.get(
      `${envConfig.MEILISEARCH_HOST}/indexes/${indexName}/stats`,
      {
        headers: {
          Authorization: `Bearer ${envConfig.API_KEY}`,
        },
      }
    );

    console.log(`${indexName} stats fetched successfully:`, response.data);
  } catch (error: any) {
    throw new Error(`Error fetching ${indexName} stats:`);
  }
}

export default getIndexStats;
