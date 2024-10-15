// app/components/useraccountpage/Viewads.js
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function ViewAds() {
  const { data: session, status } = useSession();
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  const [totalPages, setTotalPages] = useState(1); // To track the total number of pages
  const [titleval, setTitleVal] = useState(''); // To store the search input value
  const [searchTerm, setSearchTerm] = useState(''); // To track the current search term used for API request

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/viewaduser?page=${currentPage}&limit=4&user_email=${session.user.email}&titleval=${searchTerm}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data.records);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    if (session) {
      fetchData();
    }
  }, [currentPage, searchTerm, session]); // Refetch when currentPage or searchTerm changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setSearchTerm(titleval); // Update searchTerm state which will trigger a fetch
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  return (
    <div>
      {/* Search Box */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={titleval}
          onChange={(e) => setTitleVal(e.target.value)}
          placeholder="Search by title"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display Records */}
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id} - {rec.title}</li> // Adjust fields based on your model
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
