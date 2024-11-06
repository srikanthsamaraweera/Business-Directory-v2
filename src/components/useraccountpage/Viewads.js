import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import EditBusiness from "./EditBusiness";
import Image from "next/image";
import TrafficLight from "../trafficlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faDumpster, faEdit, faRecycle, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import Paginator from "../pagination/paginator";
import { fetchAds } from "@/functions/adfetch/fetchAds";


export default function Viewads() {
  const { data: session, status } = useSession();
  const [records, setRecords] = useState([]);
  const [titleval, setTitleVal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editAdData, setEditAdData] = useState(null);

  const [loading, setLoading] = useState('')

  //pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const fetchData = async () => {
    if (!session) return; // Ensure session is available
    setLoading("Loading...")

    const data = await fetchAds(currentPage, 6, session.user.email, searchTerm);
    setLoading('');
    setRecords(data.records);

    setTotalPages(data.totalPages);

  };



  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [currentPage, searchTerm, session]);

  const handleEditClick = (ad) => {
    setEditAdData(ad);
    console.log("ad ", JSON.stringify(ad));
  };

  const handleBackToList = () => {
    setEditAdData(null);
    fetchData();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(titleval);
    setCurrentPage(1);
  };

  // Refresh function to reload ads
  const handleRefresh = () => {
    setCurrentPage(1); // Reset to the first page
    setSearchTerm(''); // Optional: clear search term
    setTitleVal(''); // Clear search input
    setRecords([]); // Clear records to force reload
    fetchData(); // Fetch new data
  };

  if (editAdData) {
    return (
      <EditBusiness
        id={editAdData?.id || ""}
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
        randno={Math.floor(Math.random() * 1000000)}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="p-5">
      <div className=" w-[95%] grid gap-2 grid-cols-[5%,95%] m-auto">
        <div className="flex items-center text-center">
          <FontAwesomeIcon
            title="Refresh"
            className="cursor-pointer  size-5 hover:opacity-50"
            icon={faArrowRotateRight}
            onClick={() => {
              handleRefresh()
            }}
          ></FontAwesomeIcon>
        </div>
        <div >
          <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
            <div className="grid w-full grid-cols-[90%,10%]">
              <div className="pr-2">
                <input
                  type="text"
                  value={titleval}
                  onChange={(e) => setTitleVal(e.target.value)}
                  placeholder="Search by title"
                  className="w-full h-full border border-black border-opacity-50 rounded-md p-1 italic rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E429A9]"
                />
              </div>
              <div className="text-center">
                <Button type="submit" className="  bg-[#E429A9] text-white  hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-[#E429A9]">
                  Search
                </Button>
              </div>
            </div>


          </form>
        </div>

      </div>

      <div>
        {/* Paginator Component */}
        <div className="mb-10 mt-10">
          <Paginator

            currentPage={currentPage}

            totalPages={totalPages}

            onPageChange={handlePageChange}

          />
        </div>

      </div>
      <div className="w-full italic font-khandbold text-large text-center">{loading}</div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {
          loading === '' ? records.map((rec) => (
            <div className="border-black border-opacity-50 border-1 rounded-xl font-khand m-2" key={rec.id}>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-white rounded-xl">

                <div className="bg-blue-200-100 p-4 pt-0 pb-0 h-[200px] overflow-hidden relative">
                  <Image
                    src={rec.image1 ? rec.image1 : "/no_image.webp"}
                    alt="Description of the image"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full rounded-t-xl rounded-tr-xl"
                  />
                </div>
                <div className="bg-blue-200-100 p-4 pt-0 pb-0">
                  <h1 className="font-khand font-semibold text-[18pt] text-center ">{rec.id} - {rec.title}</h1>
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <div className="pl-2 text-center">
                    <p>Approved: {rec.enabled}</p>
                    <p>{new Date(rec.date).toISOString().split('T')[0]}</p>
                  </div>
                  <div className="flex justify-end pr-5 items-start">
                    <TrafficLight status={rec.enabled} />
                  </div>
                </div>
                <div className="grid gap-2 grid-cols-2 pr-5 pl-5 pb-5">
                  <div className=" text-left">
                    <FontAwesomeIcon
                      title='Edit'
                      className="cursor-pointer  size-5 hover:opacity-50"
                      icon={faTrash}
                      onClick={() => {
                        handleEditClick(rec)
                      }}
                    ></FontAwesomeIcon>

                  </div>
                  <div className=" text-right">
                    <FontAwesomeIcon
                      title='Edit'
                      className="cursor-pointer  size-5 hover:opacity-50"
                      icon={faEdit}
                      onClick={() => {
                        handleEditClick(rec)
                      }}
                    ></FontAwesomeIcon>

                  </div>
                </div>
              </div>
            </div>
          )) : ''}
      </div>

      {/* Paginator Component */}
      <div className="mt-10">
        <Paginator

          currentPage={currentPage}

          totalPages={totalPages}

          onPageChange={handlePageChange}

        />
      </div>

    </div>
  );
}
