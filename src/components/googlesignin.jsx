import Image from "next/image";
import "./register.css";
import { signIn } from "auth";

export default function GoogleSignIn() {
  return (
    <div className="w-full m-auto text-center">
      <form
        key={"google"}
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/",
          });
        }}
      >
        <button
          type="submit"
          className="md:w-5/12 m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper"
        >
          <div className="flex justify-center">
            <span className="self-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 488 512"
                fill="#E429A9"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </span>

            <span className="p-2 text-2xl font-khandbold">
              Signin with Google
            </span>
          </div>
          <span className="self-center italic font-khandmedium text-xl">
            No registration required
          </span>
        </button>
      </form>
    </div>
  );
}
