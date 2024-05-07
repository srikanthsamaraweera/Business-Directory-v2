"use client";

import { useState } from "react";
import LoaderAnimation from "./loader";
import "./register.css";
import CheckPasswordRequirment from "@/functions/checkpasswordrequirment";
import updatepassword from "@/functions/updatepassword";
import Link from "next/link";

export default function UpdatePass(props) {
  const [loading, setloading] = useState(false);
  const [updateresult, setupdateresult] = useState("");
  const [clearform, setclearform] = useState(false);

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = props.email;
    const password = formData.get("password");
    const confirmpass = formData.get("confirmpass");
    const updateresult = await updatepassword(email, password, confirmpass);
    try {
      setupdateresult(updateresult.message);
    } catch (error) {
      console.log("error updating password ", error);
    }

    //   await SendResetEmail(email);
    setloading(false);

    if (updateresult.message.includes("successfully")) {
      form.reset();
    }
    // form.reset();
    // authresult == "Invalid credentials."
    //   ? ""
    //   : router.push("/login/loginsuccess");
  };

  return (
    <div>
      <div className="md:w-6/12  m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper">
        <span className="font-khandbold text-2xl">Update password</span>
        <h1 className="font-khandmedium">
          Update the password for {props.email}
        </h1>
        <form
          onSubmit={handlesubmit}
          method="post"
          className="text-2xl font-khand font-light"
        >
          <div className="form-field form-field-narrow">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={() => {
                setupdateresult("");
              }}
            />
          </div>
          <div className="form-field form-field-narrow">
            <label htmlFor="confirmpass">Confirm Password:</label>
            <input
              type="password"
              id="confirmpass"
              name="confirmpass"
              required
            />
          </div>
          {updateresult.includes("Error") ? (
            <div role="alert" className="mb-2">
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{updateresult}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {updateresult.includes("successfully") ? (
            <div role="alert" className="mb-2">
              <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Success
              </div>
              <div class="border border-t-0 border-green-400 rounded-b bg-gren-100 px-4 py-3 text-green-700">
                <p>
                  {updateresult} <a href={"/signin"}>Login</a>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <LoaderAnimation />
          ) : (
            <button type="submit" className="pink-bg text-white p-2 rounded-md">
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
