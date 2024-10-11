"use client";
import {
  faDoorOpen,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div>
      {/* <form
      action={async () => {
        await LogOut();
      }}
    >
      <button>Logout</button>
    </form> */}

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-xl w-full"
      >
        <div className="flex gap-2">
          <FontAwesomeIcon className="pink-text" icon={faSignOut} />
          <span>Logout</span>
        </div>
      </button>
    </div>
  );
}
