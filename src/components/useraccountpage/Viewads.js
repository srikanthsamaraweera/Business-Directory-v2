// app/components/useraccountpage/Viewads.js
import { useEffect, useState } from "react";

export default function ViewAds() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  const [totalPages, setTotalPages] = useState(1); // To track the total number of pages

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/viewaduser?page=${currentPage}&limit=4`);
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

    fetchData();
  }, [currentPage]); // Refetch data when currentPage changes

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

  return (
    <div>
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id} - {rec.title}</li> // Adjust fields based on your model
        ))}
      </ul>

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
