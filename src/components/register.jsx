"use client";
import SaveUser from "@/functions/saveuser";
import "./register.css";
import { useRef, useState } from "react";
import Link from "next/link";

import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/functions/validaterecaptcha";

export default function RegForm() {
  const [emailerror, setemailerror] = useState("");
  const [confirmerror, setconfirmerror] = useState("");
  const [passreqerror, setpassreqerror] = useState("");
  const [loading, setloading] = useState("");

  //code for recaptcha
  const [isverified, setisverified] = useState("");
  const [captchamessage, setcaptchamessage] = useState("");
  const recaptchaRef = useRef(null);

  async function handleCaptchaSubmission(token) {
    setcaptchamessage("");
    // Server function to verify captcha
    console.log("verifying captcha...");
    const captchares = await verifyCaptcha(token);
    console.log("captcha res - ", captchares);
    setisverified(captchares);

    // await verifyCaptcha(token)
    //   .then(() => setisverified(true))
    //   .catch(() => setisverified(false));
  }

  //code for recaptcha ends

  async function Loadset(status) {
    setloading(status);
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    await Loadset(true);
    if (isverified == "success!") {
      setcaptchamessage("");
      const result = await SaveUser(formData);
      try {
        setemailerror(result.emailerror);
        setconfirmerror(result.confirmerror);
        setpassreqerror(result.passreqerror);
      } catch (e) {}
      await Loadset(false);
    } else {
      setcaptchamessage("captcha not verified");
      await Loadset(false);
    }
  };

  function seterrors() {
    setemailerror("");
  }

  return (
    <div className="md:w-7/12 m-auto mt-10 mb-10 border-2 p-5 md:pr-20 md:pl-20 regist-form-wrapper">
      <h1 className="font-khand text-4xl text-center">Register</h1>
      <form onSubmit={handlesubmit} className="text-xl font-khand font-light">
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={seterrors}
          />
          <p className="text-red-700">{emailerror}</p>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <span className="text-yellow-600 text-lg pl-1">
            Atleast one number and one special character. 6 to 16 characters
          </span>
          <p className="text-red-700">{passreqerror}</p>
        </div>
        <div className="form-field">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
          />
          <p className="text-red-700">{confirmerror}</p>
        </div>
        <div className="form-field grid sm:grid-cols-12 ">
          <div className="sm:col-span-12 col-span-12 flex self-center">
            <p className="text-red-700">{captchamessage}</p>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
          </div>
          <div className="sm:col-span-12 col-span-12 justify-end flex">
            {loading ? (
              <div>
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-2xl text-yellow-600">Saving....</p>
              </div>
            ) : (
              <input type="submit" value="Submit" className="reg-submit" />
            )}
          </div>
          <div className="sm:col-span-12 col-span-12 flex self-center mt-2">
            <p>
              Already have an account? <Link href="../login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
