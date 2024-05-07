import LogOut from "@/functions/logout";
import {
  faDoorOpen,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutButton() {
  return (
    <div>
      {/* <form
      action={async () => {
        await LogOut();
      }}
    >
      <button>Logout</button>
    </form> */}

      <button
        onClick={() => {
          //   alert("Button clicked");
          console.log("Before async function");
          (async () => {
            //  alert("Button clicked inside async function");
            await LogOut();
          })();
        }}
        className="text-xl w-full"
      >
        <div className="flex gap-2">
          <FontAwesomeIcon className="pink-text" icon={faSignOut} />
          <span>Logout</span>
        </div>
      </button>
    </div>
  );
}
