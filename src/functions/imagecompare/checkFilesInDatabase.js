// utils/checkFilesInDatabase.js
import { fetchFirebaseFiles } from "./fetchFirebaseFiles";
import { fetchDatabaseFiles } from "./fetchDatabaseFiles"; // Assume this function fetches the list from your database

export async function checkFilesInDatabase() {
    const firebaseFiles = await fetchFirebaseFiles();
    const dbFiles = await fetchDatabaseFiles();

    // Extract the filename from each database URL
    const dbFileNames = dbFiles.map((url) => {
        const decodedUrl = decodeURIComponent(url); // Decode URL to get the exact filename
        console.log("db files - ", decodedUrl)
        return decodedUrl.split("/").pop().split("?")[0]; // Extract filename from URL
    });

    // Create a list showing whether each Firebase file exists in the database
    const fileStatus = firebaseFiles.map((file) => {
        return {
            filename: file,
            inDatabase: dbFileNames.includes(file) ? "Yes" : "No",
        };
    });

    return fileStatus;
}
