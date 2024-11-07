"use client";
// components/FirebaseFileList.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkFilesInDatabase } from "@/functions/imagecompare/checkFilesInDatabase";
import { deleteFirebaseFile } from "@/functions/imagecompare/deleteFirebaseFile";
import { fetchUserLevel } from "@/functions/fetchuserdata/fetchUserLevel";

export default function CompareFileList() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [fileStatus, setFileStatus] = useState([]);
    const [deleting, setDeleting] = useState('');
    const [isAdmin, setIsAdmin] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const getUserLevel = async () => {
        if (!session) return;
        const data = await fetchUserLevel(session.user.email);
        setIsAdmin(data.user_type === 'admin');
    };

    useEffect(() => {
        if (status === "authenticated") {
            getUserLevel();
        } else if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, session]);

    useEffect(() => {
        if (isAdmin) {
            async function fetchData() {
                const status = await checkFilesInDatabase();
                setFileStatus(status);
            }
            fetchData();
        } else if (isAdmin === false) {
            router.push('/login');
        }
    }, [isAdmin]);

    const handleDelete = async (filename) => {
        try {
            setDeleting(filename);
            await deleteFirebaseFile(filename);
            setFileStatus(fileStatus.filter(file => file.filename !== filename));
        } catch (error) {
            console.error("Error deleting file:", error);
            alert(`Failed to delete file: ${filename}`);
        } finally {
            setDeleting('');
        }
    };

    const handleSort = () => {
        const sortedFiles = [...fileStatus].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.inDatabase === "Yes" ? -1 : 1;
            } else {
                return a.inDatabase === "Yes" ? 1 : -1;
            }
        });
        setFileStatus(sortedFiles);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    if (isAdmin === null) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-4" style={{ color: "#E429A9" }}>
                Firebase File List
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-black border-opacity-50">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-black border-opacity-50 text-left text-sm font-medium" style={{ color: "#E429A9" }}>
                                Filename
                            </th>
                            <th
                                onClick={handleSort}
                                className="px-4 py-2 border-b border-black border-opacity-50 text-sm font-medium text-center cursor-pointer"
                                style={{ color: "#E429A9" }}
                            >
                                Used in Post? {sortOrder === "asc" ? "▲" : "▼"}
                            </th>
                            <th className="px-4 py-2 border-b border-black border-opacity-50 text-left text-sm font-medium" style={{ color: "#E429A9" }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileStatus.map((file) => (
                            <tr key={file.filename} className="border-b border-black border-opacity-50">
                                <td className="px-4 py-2 text-sm">{file.filename}</td>
                                <td className="px-4 py-2 text-sm text-center">{file.inDatabase}</td>
                                <td className="px-4 py-2 text-sm">
                                    {file.inDatabase === "No" && (
                                        <button
                                            onClick={() => handleDelete(file.filename)}
                                            className="px-3 py-1 text-white font-semibold rounded bg-pink-600 hover:bg-pink-700"
                                            style={{ backgroundColor: "#E429A9" }}
                                            disabled={deleting === file.filename}
                                        >
                                            {deleting === file.filename ? "Deleting..." : "Delete"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
