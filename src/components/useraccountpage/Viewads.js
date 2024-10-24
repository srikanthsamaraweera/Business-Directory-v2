// app/components/useraccountpage/Viewads.js
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Grid, Card, Text, Button } from "@nextui-org/react";
import "./viewads.css";
import Image from "next/image";

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
        const response = await fetch(`/api/viewaduser?page=${currentPage}&limit=6&user_email=${session.user.email}&titleval=${searchTerm}`);

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
    <div className="p-5">
      {/* Search Box */}
      <form onSubmit={handleSearchSubmit} className="p-5 flex items-center ">
        <input
          type="text"
          value={titleval}
          onChange={(e) => setTitleVal(e.target.value)}
          placeholder="Search by title"
          className="w-[60%] px-4 m-4 mr-0 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E429A9]"
        />
        <Button type="submit" className="w-[30%] px-4 m-4 ml-0 py-2 bg-[#E429A9] text-white rounded-l-none hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-[#E429A9]">Search</Button>
      </form>

      {/* Display Records */}
      {/* <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id} - {rec.title}</li> // Adjust fields based on your model
        ))}
      </ul> */}



      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {/* Display Records */}

        {records.map((rec) => (
          <div className="bg-gray-100 p-4 font-khand" key={rec.id}>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-white">
              <div className="bg-blue-200-100 p-4 pb-0 "><h1 className="font-khand font-medium text-[18pt]">{rec.id} - {rec.title}</h1></div>
              <div className="bg-blue-200-100 p-4 pt-0 pb-0 h-[200px] overflow-hidden relative">

                <Image
                  src={rec.image1 ? rec.image1 : "/no_image.webp"}
                  alt="Description of the image"

                  layout="fill" // Makes the image fill the container
                  objectFit="cover" // Ensures the image covers the container area
                  className="w-full h-full"
                />

              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="bg-blue-200-100 p-4 font-khand text-[14pt] italic">{new Date(rec.date).toISOString().split('T')[0]}</div>
                <div className="p-4 ">
                  <Button className="bg-[#09F2FF]">Edit </Button>
                </div>
              </div>
            </div>

          </div>
        ))}



        {/* <div className="bg-gray-100 p-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-white">
            <div className="bg-blue-200-100 p-4">image</div>
            <div className="bg-blue-200-100 p-4">desc</div>
          </div>

        </div> */}


        {/* <div className="bg-gray-100 p-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-white">
            <div className="bg-blue-200-100 p-4">image</div>
            <div className="bg-blue-200-100 p-4">desc</div>
          </div>

        </div> */}
      </div>

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
