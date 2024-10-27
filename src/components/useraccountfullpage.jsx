"use client";

import UserSideBar from "@/components/usersidebar";
import { useState } from "react";
import RegisterBusiness from "./useraccountpage/RegisterBusiness";
import Viewads from "./useraccountpage/Viewads";
import RandNum from "@/functions/generaterand";
import EditBusiness from "./useraccountpage/EditBusiness";

export default function UserAccountFullPage() {
  const [menuval, setmenuval] = useState("view");
  const [Saving, SetSaving] = useState("Register");
  const [editAdData, setEditAdData] = useState(null);
  // const [randomno, setrandomno] = useState("1000");

  const getmenuval = (val) => {
    if (val === "newreg") {
      SetSaving("Save");
    }
    setmenuval(val);
  };

  // const generateRand = async () => {
  //   setrandomno(RandNum(1, 1000000));
  // };

  function getmenu() {
    switch (menuval) {
      case "view":
        // return "<Viewads />";
        return <Viewads />;
      case "newreg":
        return (
          <RegisterBusiness
            Saving={Saving}
            SetSaving={SetSaving}
            randno={RandNum(1, 1000000)}
          />
          //"Register business"
        );
      case "edit":
        return "edit";
      case "delete":
        return "delete";
      default:
        return <Viewads />;
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
