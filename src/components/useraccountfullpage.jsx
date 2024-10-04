"use client";
import RegisterBusiness from "@/components/RegisterBusiness";
import UserSideBar from "@/components/usersidebar";
import { useState } from "react";

export default function UserAccountFullPage() {
  const [menuval, setmenuval] = useState("view");
  const [Saving, SetSaving] = useState("Register");

  const getmenuval = (val) => {
    if (val === "newreg") {
      SetSaving("Pending");
    }
    setmenuval(val);
  };

  function getmenu() {
    switch (menuval) {
      case "view":
        return "view";
      case "newreg":
        return <RegisterBusiness Saving={Saving} SetSaving={SetSaving} />;
      case "edit":
        return "edit";
      case "delete":
        return "delete";
      default:
        return "view";
    }
  }
  return (
    <div>
      <div className="grid sm:grid-cols-12 grid-cols-12  pt-3 ">
        <div className="sm:col-span-3 col-span-full  gap-3 border-r-medium border-gray-300 h-full">
          <UserSideBar getmenuval={getmenuval} />
        </div>
        <div className="sm:col-span-9 col-span-full  gap-3">{getmenu()}</div>
      </div>
    </div>
  );
}
