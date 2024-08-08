"use server"
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebaseconfig";
import { PrismaClient } from "@prisma/client";

export default async function deleteimages(filePath) {
    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);
    const db = new PrismaClient();

    try {
        // Delete the file
        await deleteObject(fileRef);
        console.log("File deleted successfully: ", filePath);

    } catch (error) {
        console.error("Error deleting file:", error);
    }
};




