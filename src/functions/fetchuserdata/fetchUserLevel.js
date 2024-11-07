// utils/fetchAds.js

export async function fetchUserLevel(userEmail) {
    try {
        const response = await fetch(`/api/getUserTypeByEmail?email=${userEmail}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ads:", error);
        return {

        };
    }
}
