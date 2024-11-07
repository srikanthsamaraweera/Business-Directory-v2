"use client";
import { useState } from "react";
import "./profilemenubutton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./logoutbutton";

export default function ProfileMenuButton(props) {
  const [show, setshow] = useState(false);
  const stringvaluser = JSON.stringify(props.usermail);

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          {props.usermail ? (
            <div className="pinkbg p-3 text-white rounded-full cursor-pointer profileicon">
              <h1 className="font-bold text-2xl font-khandbold uppercase">
                {stringvaluser.substring(1, 2)}
              </h1>
            </div>
          ) : (
            <div className="bg-gray-300 p-3 text-white rounded-full cursor-pointer profileicon">
              <FontAwesomeIcon className="text-gray-600" icon={faUser} />
            </div>
          )}
        </DropdownTrigger>
        {props.usermail ? (
          <DropdownMenu
            aria-label="Static Actions"
            className="font-khand text-3xl"
          >
            <DropdownItem key="new">
              <p className="font-khand text-xl ">
                Hi {props.usermail != undefined ? props.usermail : ""}
              </p>
            </DropdownItem>
            <DropdownItem key="new">
              <Link href={"/useraccount"}>
                <span className="grid-cols-2 gap-2 flex">
                  <span className="text-xl">
                    <FontAwesomeIcon icon={faUser} className="pink-text" />
                  </span>
                  <span className="text-xl">{props.userlevel} Account</span>
                </span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <LogoutButton />
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu
            aria-label="Static Actions"
            className="font-khand text-3xl"
          >
            <DropdownItem key="new">
              <Link href={"/login"}>
                <span className="grid-cols-2 gap-2 flex">
                  <span className="text-xl">
                    <svg
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#e429a9"
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                      />
                    </svg>
                  </span>
                  <span className="text-xl">Login/register</span>
                </span>
              </Link>
            </DropdownItem>
            <DropdownItem key="copy">
              <Link href={"/register"}>
                <span className="grid-cols-2 gap-2 flex">
                  <span className="text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={20}
                      width={20}
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#e429a9"
                        d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
                      />
                    </svg>
                  </span>
                  <span className="text-xl">Register</span>
                </span>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
}
