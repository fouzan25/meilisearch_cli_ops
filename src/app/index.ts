import createIndex from "@create_index";
import deleteIndex from "@delete_index";
import getDocuments from "@get_index_data";
import { askQuestion, closeReadLine, operations } from "@helpers/utils";
import processJsonFiles from "@indexer";
import getIndexStats from "@indexers_status";
import getIndexes from "@list_indexers";

export async function startApplication(): Promise<void> {
  try {
    console.log("Choose the operation number to run:\n");
    operations.forEach((operation, index) =>
      console.log(`${index + 1}: ${operation}\n`)
    );
    const selected: number = parseInt(await askQuestion("Run: "));
    if (isNaN(selected) || selected <= 0 || selected > operations.length) {
      throw new Error("Invalid operation selected");
    }
    await processOperation(selected);
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    closeReadLine();
  }
}

async function processOperation(selected: number): Promise<void> {
  switch (selected) {
    case 1:
      await createIndexesOperation();
      break;
    case 2:
      await addDataToIndexOperation();
      break;
    case 3:
      await getIndexesDataOperation();
      break;
    case 4:
      await listIndexesOperation();
      break;
    case 5:
      await indexesStatusOperation();
      break;
    case 6:
      await deleteIndexesOperation();
      break;
    default:
      console.log("Invalid operation selected");
  }
}

async function createIndexesOperation(): Promise<void> {
  try {
    const indexName: string = await askQuestion("Enter index name: ");
    await createIndex(indexName);
    console.log(`Index '${indexName}' created successfully.`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function addDataToIndexOperation(): Promise<void> {
  try {
    const indexName = await askQuestion("Enter index name: ");
    const filePath = await askQuestion("Enter file path: ");
    await processJsonFiles(filePath, indexName);
    console.log(`Data added to index '${indexName}' from file '${filePath}'.`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function getIndexesDataOperation(): Promise<void> {
  try {
    const indexName = await askQuestion("Enter index name: ");
    await getDocuments(indexName);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function listIndexesOperation(): Promise<void> {
  try {
    await getIndexes();
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function indexesStatusOperation(): Promise<void> {
  try {
    const indexName = await askQuestion("Enter index name: ");
    await getIndexStats(indexName);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function deleteIndexesOperation(): Promise<void> {
  try {
    const indexName = await askQuestion("Enter index name: ");
    await deleteIndex(indexName);
    console.log(`Index '${indexName}' deleted successfully.`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}
