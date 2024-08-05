"use client";
import {
  faAd,
  faAdd,
  faDisplay,
  faEdit,
  faRecycle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserSideBar(props) {
  return (
    <div>
      <div className="ml-[20%] pt-5">
        <h1 className="font-khand underline block  text-3xl">My Ads</h1>

        <ul className="mt-1 text-2xl">
          <li className=" font-khand flex">
            <a
              href="#"
              className="flex"
              onClick={() => props.getmenuval("view")}
            >
              <FontAwesomeIcon
                className="pink-text w-7 pr-2"
                icon={faDisplay}
              />
              View
            </a>
          </li>
          <li className=" font-khand flex">
            <a
              href="#"
              className="flex"
              onClick={() => props.getmenuval("newreg")}
            >
              <FontAwesomeIcon className="pink-text w-7 pr-2" icon={faAdd} />
              New Registration
            </a>
          </li>
          <li className=" font-khand flex">
            <a
              href="#"
              className="flex"
              onClick={() => props.getmenuval("edit")}
            >
              <FontAwesomeIcon className="pink-text w-7 pr-2" icon={faEdit} />
              Edit
            </a>
          </li>
          <li className=" font-khand flex">
            <a
              href="#"
              className="flex"
              onClick={() => props.getmenuval("delete")}
            >
              <FontAwesomeIcon className="pink-text w-7 pr-2" icon={faTrash} />
              Delete
            </a>
          </li>
        </ul>
      </div>
      <div className="ml-[20%] pt-5 ">
        <h1 className="font-khand underline block  text-3xl">My Account</h1>

        <ul className="mt-1 text-2xl">
          <li className=" font-khand flex">
            <a
              href="#"
              className="flex"
              onClick={() => props.getmenuval("myaccount")}
            >
              <FontAwesomeIcon
                className="pink-text w-7 pr-2"
                icon={faDisplay}
              />{" "}
              Change Password
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
