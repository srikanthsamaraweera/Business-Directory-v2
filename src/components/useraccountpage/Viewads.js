import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import EditBusiness from "./EditBusiness";
import Image from "next/image";

export default function Viewads() {
  const { data: session, status } = useSession();
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [titleval, setTitleVal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editAdData, setEditAdData] = useState(null);

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
  }, [currentPage, searchTerm, session]);

  const handleEditClick = (ad) => {
    setEditAdData(ad);
    console.log("ad ", JSON.stringify(ad))
  };

  const handleBackToList = () => {
    setEditAdData(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(titleval);
    setCurrentPage(1);
  };

  if (editAdData) {
    return (
      <EditBusiness
        title={editAdData?.title || ""}
        type={editAdData?.category || ""}
        map={editAdData?.map || ""}
        description={editAdData?.description || ""}
        contact_number={editAdData?.phone || ""}
        contact_email={editAdData?.email || ""}
        address={editAdData?.address || ""}
        addistrict={editAdData?.district || ""}
        adcity={editAdData?.city || ""}
        image1={editAdData?.image1 || ""}
        image2={editAdData?.image2 || ""}
        simplefilename1={editAdData?.filename1 || ""}
        simplefilename2={editAdData?.filename2 || ""}
        Saving="Save"
        SetSaving={() => { }}
        randno={Math.floor(Math.random() * 1000000)}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSearchSubmit} className="p-5 flex items-center">
        <input
          type="text"
          value={titleval}
          onChange={(e) => setTitleVal(e.target.value)}
          placeholder="Search by title"
          className="w-[60%] px-4 m-4 mr-0 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E429A9]"
        />
        <Button type="submit" className="w-[30%] px-4 m-4 ml-0 py-2 bg-[#E429A9] text-white rounded-l-none hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-[#E429A9]">
          Search
        </Button>
      </form>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {records.map((rec) => (
          <div className="bg-gray-100 p-4 font-khand" key={rec.id}>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-white">
              <div className="bg-blue-200-100 p-4 pb-0">
                <h1 className="font-khand font-medium text-[18pt]">{rec.id} - {rec.title}</h1>
              </div>
              <div className="bg-blue-200-100 p-4 pt-0 pb-0 h-[200px] overflow-hidden relative">
                <Image
                  src={rec.image1 ? rec.image1 : "/no_image.webp"}
                  alt="Description of the image"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="bg-blue-200-100 p-4 font-khand text-[14pt] italic">{new Date(rec.date).toISOString().split('T')[0]}</div>
                <div className="p-4">
                  <Button className="bg-[#09F2FF]" onClick={() => handleEditClick(rec)}>Edit</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
