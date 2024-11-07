// utils/deleteFirebaseFile.js
import { storage, ref, deleteObject } from "../../../firebaseconfig"; // Adjust path to your config

export async function deleteFirebaseFile(filename) {
    const fileRef = ref(storage, `BDImages/${filename}`);

    try {
        await deleteObject(fileRef);
        console.log(`File ${filename} deleted from Firebase.`);
    } catch (error) {
        console.error("Error deleting file from Firebase:", error);
        throw error;
    }
}
