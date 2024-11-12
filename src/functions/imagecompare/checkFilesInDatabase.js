// utils/checkFilesInDatabase.js
import { fetchFirebaseFiles } from "./fetchFirebaseFiles";
import { fetchDatabaseFiles } from "./fetchDatabaseFiles";

export async function checkFilesInDatabase() {
    const firebaseFiles = await fetchFirebaseFiles();
    const dbFiles = await fetchDatabaseFiles();

    const dbFileNames = dbFiles.flat().map((url) => {
        const decodedUrl = decodeURIComponent(url);
        return decodedUrl.split("/").pop().split("?")[0];
    });

    // Filter to include only files missing from the database
    const missingFiles = firebaseFiles.filter(file => !dbFileNames.includes(file));

    return missingFiles.map(file => ({
        filename: file,
        inDatabase: "No"  // Mark as not present in the database
    }));
}
