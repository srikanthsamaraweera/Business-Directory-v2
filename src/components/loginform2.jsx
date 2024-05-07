"use client";
import "./register.css";
import Link from "next/link";
import { useState } from "react";
import LoaderAnimation from "./loader";
import AuthSignIn from "@/functions/authsignin";

export default function LogForm2() {
  const [loading, setloading] = useState(false);
  const [authstat, setauthstat] = useState("");

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    setauthstat("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const plainpass = formData.get("password");
    const authresult = await AuthSignIn(email, plainpass);
    authresult ? setauthstat(authresult.error) : setauthstat("");
    console.log("authresult ", authresult);
    setloading(false);
    // authresult == "Invalid credentials."
    //   ? ""
    //   : router.push("/login/loginsuccess");
  };

  return (
    <div className="md:w-6/12 m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper">
      <h1 className="font-khand text-3xl text-center">Login</h1>

      <form
        onSubmit={handlesubmit}
        className="text-2xl font-khand font-light"
        method="post"
      >
        <div className="form-field form-field-narrow">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-field form-field-narrow">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-field form-field-narrow grid sm:grid-cols-12 ">
          <div className="sm:col-span-8 col-span-12 flex self-center justify-end">
            <p className="text-red-500">{authstat}</p>{" "}
          </div>
          <div className="sm:col-span-4 col-span-12 flex self-center justify-end">
            {loading ? (
              <LoaderAnimation />
            ) : (
              <>
                <input type="submit" value="Submit" />
              </>
            )}
          </div>
        </div>

        <div className="form-field form-field-narrow grid sm:grid-cols-12 ">
          <div className="sm:col-span-12 col-span-12  self-center text-md">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="../register">Register</Link>
            </p>
            <p>
              Forgot password? <a href="/resetpass">Reset</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
