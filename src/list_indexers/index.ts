import envConfig from "@constants";
import axios from "axios";

async function getIndexes(): Promise<void> {
  try {
    const response = await axios.get(`${envConfig.MEILISEARCH_HOST}/indexes`, {
      headers: {
        Authorization: `Bearer ${envConfig.API_KEY}`,
      },
    });

    console.log("Indexes fetched successfully:", response.data);
  } catch (error: any) {
    throw new Error("Error fetching indexes:");
  }
}

export default getIndexes;
