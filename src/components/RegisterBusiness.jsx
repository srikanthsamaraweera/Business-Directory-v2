import { useState, useRef } from "react";
import "./register.css";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseconfig";
import RandNum from "@/functions/generaterand";
import Resizer from "react-image-file-resizer";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/functions/validaterecaptcha";

const RegisterBusiness = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadurl, setuploadurl] = useState("");
  const [uploadurl2, setuploadurl2] = useState("");
  const [randomkey, setrandomkey] = useState("1");
  const [Saving, SetSaving] = useState("Register");

  const random = RandNum(1, 100000);
  const date = new Date();

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

  const RandomKeyset = () => {
    setrandomkey(RandNum(1, 10000));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFileChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600, // max width
        600, // max height
        "JPEG", // format
        70, // quality
        0, // rotation
        (uri) => {
          resolve(uri);
        },
        "blob" // output type
      );
    });

  const handleupload = async () => {
    if (!file) return;
    setUploading(true);
    const storageref = ref(storage, `BDImages/${date}${random}${file.name}`);

    try {
      const resizedfile = await resizeFile(file);
      await uploadBytes(storageref, resizedfile);
      const url = await getDownloadURL(storageref);
      setuploadurl(url);
      console.log("uploaded");
    } catch (error) {
      console.error("upload error " + error);
    } finally {
      setUploading(false);
    }
  };
  const handleupload2 = async () => {
    if (!file2) return;
    setUploading(true);
    const storageref = ref(storage, `BDImages/${date}${random}${file2.name}`);

    try {
      const resizedfile = await resizeFile(file2);
      await uploadBytes(storageref, resizedfile);
      const url = await getDownloadURL(storageref);
      setuploadurl2(url);
      console.log("uploaded");
    } catch (error) {
      console.error("upload error " + error);
    } finally {
      setUploading(false);
    }
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log("pressed here");
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log("isverified- ", isverified);
    if (isverified == "success!") {
      SetSaving("Saving...");
      await handleupload();
      await handleupload2();
      setisverified("");
      RandomKeyset();
      SetSaving("Saved");
    }
  };

  return (
    <div className="md:w-11/12 m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper">
      <h2 className="font-khand text-3xl text-center">Registration Form</h2>
      <form onSubmit={handlesubmit} className="text-2xl font-khand font-light">
        <div className="form-field form-field-narrow">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleFileChange} />
          <input type="file" id="image2" onChange={handleFileChange2} />
          <button onClick={handleupload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <Image
            src={uploadurl}
            alt="uploaded image"
            width={300}
            height={300}
            style={{ width: "300px", height: "auto", maxHeight: "400px" }}
          />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="map">Map:</label>
          <input type="text" id="map" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="description">Description:</label>
          <textarea id="description"></textarea>
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="tel" id="contactNumber" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="contactEmail">Contact Email:</label>
          <input type="email" id="contactEmail" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="address">Address:</label>
          <textarea id="address"></textarea>
        </div>
        <div className="form-field form-field-narrow self-center">
          <p className="text-red-700">{captchamessage}</p>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            key={randomkey}
          />
        </div>
        <div className="form-field form-field-narrow">
          <input
            type="submit"
            value={Saving}
            disabled={Saving == "Saved" ? true : false}
            className={Saving == "Saved" ? "opacity-disabled" : ""}
          />
          {Saving == "Saved" ? <a href="">Edit / View AD</a> : ""}
        </div>
      </form>
    </div>
  );
};

export default RegisterBusiness;
