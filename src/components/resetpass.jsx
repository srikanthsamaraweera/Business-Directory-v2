"use client";
import { useState } from "react";
import "./register.css";
import SendResetEmail from "@/functions/sendresetmail";
import LoaderAnimation from "./loader";

export default function ResetPass() {
  const [loading, setloading] = useState(false);
  const [mailsent, setmailsent] = useState("");

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const mailsend = await SendResetEmail(email);

    try {
      setmailsent(mailsend.message);
    } catch (error) {
      setmailsent("Error sending email");
    }

    setloading(false);
    form.reset();

    // authresult == "Invalid credentials."
    //   ? ""
    //   : router.push("/login/loginsuccess");
  };

  return (
    <div>
      <div className="md:w-6/12  m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper">
        <span className="font-khandbold text-2xl">Reset password</span>
        <form
          onSubmit={handlesubmit}
          method="post"
          className="text-2xl font-khand font-light"
        >
          <div className="form-field form-field-narrow">
            <label htmlFor="email">
              Email Address:{" "}
              <span className="pl-1 text-green-500 font-khand text-lg">
                {mailsent}
              </span>
            </label>
            <input type="email" id="email" name="email" required />
          </div>
          {loading ? (
            <LoaderAnimation />
          ) : (
            <button type="submit" className="pink-bg text-white p-2 rounded-md">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
