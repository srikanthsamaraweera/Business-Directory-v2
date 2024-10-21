"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import "./register.css";
import LoaderAnimation from "./loader";

export default function LogForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlesubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    setUsername(email);
    setPassword(password);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result.ok) {
      router.push("/"); // Redirect to the dashboard or a protected page
    } else {
      console.error(JSON.stringify(result));
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="md:w-7/12 m-auto mt-10 mb-10 border-2 p-5 md:pr-20 md:pl-20 regist-form-wrapper">
      <h1 className="font-khand text-4xl text-center">Login</h1>

      <form
        onSubmit={handlesubmit}
        className="text-xl font-khand font-light"
        method="post"
      >
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-field grid sm:grid-cols-12 ">
          <div className="sm:col-span-8 col-span-12 self-center">
            <p>
              Don&apos;t have an account?{" "}
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
