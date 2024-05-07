"use client";
import LoginCheck from "@/functions/logincheck";
import "./register.css";
import Link from "next/link";
import { useState } from "react";
import LoaderAnimation from "./loader";
import CustomDialog from "./customdialog";

export default function LogForm() {
  const [loading, setloading] = useState(false);

  async function setLoading(val) {
    setloading(val);
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const plainpass = formData.get("password");
    await setLoading(true);
    await LoginCheck(email, plainpass);
    await setLoading(false);
  };

  return (
    <div className="md:w-7/12 m-auto mt-10 mb-10 border-2 p-5 md:pr-20 md:pl-20 regist-form-wrapper">
      <h1 className="font-khand text-6xl text-center">Login</h1>

      <form
        onSubmit={handlesubmit}
        className="text-2xl font-khand font-light"
        method="post"
      >
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-field grid sm:grid-cols-12 ">
          <div className="sm:col-span-8 col-span-12  self-center">
            <p>
              Don &apos t have an account?{" "}
              <Link href="../register">Register</Link>
            </p>
            <p>
              Forgot password? <Link href="#">Reset</Link>
            </p>
          </div>
          <div className="sm:col-span-4 col-span-12 flex self-center justify-end">
            {loading ? (
              <LoaderAnimation />
            ) : (
              <input type="submit" value="Submit" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
