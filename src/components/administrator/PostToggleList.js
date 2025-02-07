"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PostToggleList() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [togglingId, setTogglingId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const postsPerPage = 20;

    useEffect(() => {
        if (status === "authenticated") {
            checkUserRole();
        } else if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, session]);

    const checkUserRole = async () => {
        try {
            const res = await fetch(`/api/getUserTypeByEmail?email=${session.user.email}`);
            if (!res.ok) throw new Error("Failed to fetch user type");

            const data = await res.json();
            if (data.user_type === "admin") {
                setIsAdmin(true);
                fetchPosts(currentPage, searchQuery, sortConfig);
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Error checking user role:", error);
        }
    };

    const fetchPosts = async (page, query, sortConfig) => {
        try {
            setLoading(true);
            const sortParam = sortConfig.key ? `&sortKey=${sortConfig.key}&sortDirection=${sortConfig.direction}` : "";
            const res = await fetch(`/api/getPosts?page=${page}&limit=${postsPerPage}&search=${encodeURIComponent(query)}${sortParam}`);
            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleEnabledStatus = async (postId, currentStatus) => {
        setTogglingId(postId);
        try {
            const res = await fetch("/api/toggleEnabled", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, currentStatus })
            });
            const result = await res.json();

            if (result.success) {
                setPosts(posts.map(post => post.id === postId ? { ...post, enabled: result.newStatus } : post));
            } else {
                alert("Failed to toggle status");
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        } finally {
            setTogglingId(null);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchPosts(1, searchQuery, sortConfig);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        fetchPosts(currentPage, searchQuery, { key, direction });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchPosts(nextPage, searchQuery, sortConfig);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
            fetchPosts(previousPage, searchQuery, sortConfig);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    const handleImageError = (event) => {
        event.target.src = "/no_image.webp";
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-4" style={{ color: "#E429A9" }}>
                Admin Post Toggle List
            </h2>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700"
                >
                    Search
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-black border-opacity-50 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 border-b border-gray-300 text-left w-1/6">Title & Images</th>
                            <th className="px-4 py-3 border-b border-gray-300 text-left">
                                <button onClick={() => handleSort('date')} className="font-semibold">
                                    Details (Date)
                                </button>
                            </th>
                            <th className="px-4 py-3 border-b border-gray-300 text-center w-1/12">
                                <button onClick={() => handleSort('enabled')} className="font-semibold">
                                    Enabled
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex space-x-2 mt-2">
                                                <img
                                                    src={post.image1 || "/no_image.webp"}
                                                    onError={handleImageError}
                                                    alt="Image 1"
                                                    className="w-16 h-16 object-cover border rounded"
                                                />
                                                <img
                                                    src={post.image2 || "/no_image.webp"}
                                                    onError={handleImageError}
                                                    alt="Image 2"
                                                    className="w-16 h-16 object-cover border rounded"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="gap-3 flex flex-col">
                                            <div>
                                                <h2 className="font-bold underline">{post.title}</h2>
                                                <p>{post.description}</p>
                                            </div>
                                            <div className="w-full h-px bg-gray-300"></div>
                                            <p>User Email: {post.user_email}</p>
                                            <p>Contact Email: {post.email}</p>
                                            <p>Phone: {post.phone}</p>
                                            <p>Ad Category: {post.category}</p>
                                            <p>Map: {post.map}</p>
                                            <p className="italic">Date: {new Date(post.date).toLocaleDateString()}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center font-semibold">
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => toggleEnabledStatus(post.id, post.enabled)}
                                                className="px-3 py-1 text-white font-semibold rounded bg-pink-600 hover:bg-pink-700"
                                            >
                                                {togglingId === post.id ? "Changing..." : "Toggle"}
                                            </button>
                                            <p>{post.enabled}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-3 text-center" colSpan="3">No posts available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    className="px-3 py-1 font-semibold text-white bg-gray-600 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="flex items-center">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage}
                    className="px-3 py-1 font-semibold text-white bg-gray-600 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
