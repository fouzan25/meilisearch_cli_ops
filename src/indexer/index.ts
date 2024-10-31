import { Product } from "@interfaces";
import axios from "axios";
import fs from "fs";
import path from "path";
import envConfig from "@constants";

const batchSize: number = envConfig.BATCH_SIZE;

const sendBatches = async (
  data: Product[],
  batchSize: number,
  index: string
): Promise<void> => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    try {
      const response = await axios.post(
        `${envConfig.MEILISEARCH_HOST}/indexes/${index}/documents`,
        batch,
        {
          headers: {
            Authorization: `Bearer ${envConfig.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Batch ${Math.floor(i / batchSize) + 1} indexed successfully:`,
        response.data
      );
    } catch (error: any) {
      throw new Error(`Error indexing batch ${Math.floor(i / batchSize) + 1}:`);
    }
  }
};

const processJsonFiles = async (
  dirPath: string,
  indexName: string
): Promise<void> => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        fs.readFile(filePath, "utf8", async (err, data) => {
          if (err) {
            throw new Error(`Error reading file ${file}:`);
            return;
          }

          try {
            const jsonData: Product[] = JSON.parse(data);
            console.log(`Processing file: ${file}`);
            await sendBatches(jsonData, batchSize, indexName);
          } catch (parseError) {
            throw new Error(`Error parsing JSON in file ${file}:`);
          }
        });
      }
    });
  });
};

export default processJsonFiles;
