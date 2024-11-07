// utils/fetchFirebaseFiles.js
import { storage, ref, listAll } from "../../../firebaseconfig";


export async function fetchFirebaseFiles() {
    const listRef = ref(storage, 'BDImages');
    const fileList = [];

    try {
        const res = await listAll(listRef);
        res.items.forEach((itemRef) => {
            // Extract the filename from the item's full path
            const fileName = itemRef.name;
            fileList.push(fileName);
        });
        return fileList;
    } catch (error) {
        console.error("Error fetching Firebase files:", error);
        return [];
    }
}
