import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";

export default function RegistrationSuccessform() {
  return (
    <div className="md:w-6/12 w-11/12 m-auto mt-20 mb-10 border-2 p-10 lg:pr-20 pr-10-10 lg:pl-20 pr-10 regist-form-wrapper">
      <p className="font-khand md:text-5xl sm:text-3xl text-3xl">
        Congratulations!
      </p>
      <div className="grid grid-cols-10">
        <div className="col-span-1 self-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#0c9000"
              d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
        <div className="col-span-9 self-center p-5 text-xl">
          <p>
            Registered successfully. Please check your email to confirm
            registration
          </p>
        </div>
      </div>
    </div>
  );
}
