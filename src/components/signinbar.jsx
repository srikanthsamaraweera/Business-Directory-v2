import { auth, signIn, signOut } from "auth";
import "./topnav.css";

export default async function SigninBar() {
  const session = await auth();
  return (
    <div>
      <div>
        {session && session.user ? (
          <div className="grid sm:grid-cols-12 grid-cols-12  pt-3 ">
            <div className="sm:col-span-6 col-span-full  gap-3"></div>
            <div className="sm:col-span-6 col-span-full gap-3  flex justify-end pr-4">
              <p>{session.user.email}</p>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs">
                  Signout
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-12 grid-cols-12  pt-3 ">
            <div className="sm:col-span-12 col-span-full  gap-3  flex justify-end pr-4">
              <form
                action={async () => {
                  "use server";
                  await signIn();
                }}
              >
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Log in
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
