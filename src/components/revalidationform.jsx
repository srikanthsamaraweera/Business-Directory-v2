"use client";
import Revalidate from "@/functions/revalidate";
import "./register.css";
import { useState } from "react";

export default function RevalidationForm() {
  const [noreg, setnoreg] = useState("");
  const [viewform, setviewform] = useState("");
  const handlesubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const results = await Revalidate(formData);

    try {
      if (results.error == "no") {
        setnoreg(
          <span className="text-red-500">
            This email is not registered. Please register
          </span>
        );
        setviewform("1");
      }

      if (results.error == "ok") {
        setnoreg(
          <span className="text-green-400">
            Validation email sent. Please check email.
          </span>
        );
        setviewform("0");
      }
    } catch (error) {}
  };

  return (
    <div className="md:w-7/12 m-auto mt-10 mb-10 border-2 p-5 md:pr-20 md:pl-20 regist-form-wrapper">
      {viewform == "0" ? (
        <span className="text-green-400 text-2xl">
          New validation email sent. Please check email.
        </span>
      ) : (
        <div>
          <h1 className="font-khand text-2xl text-center text-red-950">
            Validation Failed. Please revalidate.
          </h1>
          <form
            onSubmit={handlesubmit}
            className="text-2xl font-khand font-light"
          >
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-field grid sm:grid-cols-12 ">
              <div className="sm:col-span-12 col-span-12  flex justify-end">
                <input type="submit" value="Submit" />
              </div>
            </div>
            <p>{noreg}</p>
          </form>
        </div>
      )}
    </div>
  );
}
