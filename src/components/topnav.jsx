import Image from "next/image";
import "./topnav.css";
import ProfileMenuButton from "./profilemenubutton";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function TopNavigation() {
  const session = await getServerSession(authOptions);

  return (
    <div className="nav-box-shadow">
      {/* <SigninBar /> */}

      <div className="grid sm:grid-cols-12 grid-cols-12  pb-2">
        <div className="  sm:col-span-2 col-span-12 ">
          <Image
            className="md:w-full md:h-auto sm:w-full sm:h-auto w-3/6 h-auto m-auto p-3"
            src={"/logo.jpg"}
            width={500}
            height={200}
            alt="logo"
          />
        </div>
        <div className="sm:col-span-6 col-span-full  ">
          <nav className="flex justify-center items-center h-full font-libre">
            <ul className="md:grid grid-cols-4 gap-3   w-11/12 text-center font-khandmedium lg:text-xl">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>About</li>
              <li>Categories</li>
              <li>Contact US</li>
            </ul>
          </nav>
        </div>
        <div className="sm:col-span-3 col-span-12 pr-3  ">
          <form className="flex items-center max-w-sm mx-auto h-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className=" border border-black  text-sm rounded-lg  block w-full ps-10 p-2.5 h-10   "
                placeholder="Search"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border searchbutton"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="sm:col-span-1 col-span-12   justify-center items-center flex">
          <ProfileMenuButton usermail={session ? session.user.email : ""} />
        </div>
      </div>
    </div>
  );
}
