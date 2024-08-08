import { useState, useRef } from "react";
import "./register.css";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseconfig";
import RandNum from "@/functions/generaterand";
import Resizer from "react-image-file-resizer";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/functions/validaterecaptcha";
import SaveAd from "@/functions/SaveAd";
import resizeImages from "@/functions/resizeImages";
import deleteimages from "@/functions/deleteimages";
import saveTempImage, { SetUSedInPost } from "@/functions/tempImagesSave";
import DelTempImageFromDB from "@/functions/tempImageDelDB";

const RegisterBusiness = () => {
  //*********variables for image upload start ********
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadurl, setuploadurl] = useState("");
  const [uploadurl2, setuploadurl2] = useState("");
  const [randomkey, setrandomkey] = useState("1");
  const [Saving, SetSaving] = useState("Register");
  const [filename1, setfilename1] = useState("");
  const [filename2, setfilename2] = useState("");

  const [file1uploading, setfile1uploading] = useState("");
  const [file2uploading, setfile2uploading] = useState("");

  //*********variables for image upload end ********

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

  //**************code for image upload begins******************

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
    const f1file = `${date}${random}${file.name}`;
    const storageref = ref(storage, `BDImages/${f1file}`);
    setfilename1(f1file);

    try {
      const resizedfile = await resizeFile(file);
      await uploadBytes(storageref, resizedfile);
      const url = await getDownloadURL(storageref);
      setuploadurl(url);
      console.log("uploaded");
      await saveTempImage(f1file);
    } catch (error) {
      console.error("upload error " + error);
    } finally {
      setUploading(false);
    }
    setfile1uploading("");
  };
  const handleupload2 = async () => {
    if (!file2) return;
    setUploading(true);
    const f2file = `${date}${random}${file2.name}`;
    const storageref = ref(storage, `BDImages/${f2file}`);
    setfilename2(f2file);

    try {
      const resizedfile = await resizeFile(file2);
      await uploadBytes(storageref, resizedfile);
      const url = await getDownloadURL(storageref);
      setuploadurl2(url);
      console.log("uploaded");
      await saveTempImage(f2file);
    } catch (error) {
      console.error("upload error " + error);
    } finally {
      setUploading(false);
    }
    setfile2uploading("");
  };
  const handleimageuploads = async () => {
    setfile1uploading("Uploading...");
    setfile2uploading("Uploading...");
    await handleupload();
    await handleupload2();
  };
  //**********code for image upload ends**********

  // const savetemptodb = async () => {
  //   await saveTempImage(filename1, filename2);
  // };

  // const handleimageuploadAndsaveTemp = async () => {
  //   await handleimageuploads();
  //   await savetemptodb();
  // };
  const handlesubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (isverified == "success!") {
      var result;
      SetSaving("Saving...");
      //await handleupload();
      //  await handleupload2();
      console.log("urlset- ", uploadurl, " ", uploadurl2);
      setisverified("");

      await SaveAd(formData, uploadurl, uploadurl2);
      await SetUSedInPost(filename1, filename2);
      RandomKeyset();
      SetSaving("Saved");
    }
  };

  const seturls = async () => {
    setfilename1("");
    setfilename2("");
    setuploadurl("");
    setuploadurl2("");
  };

  const deletefile = async () => {
    await deleteimages(`BDImages/${filename1}`);
    await deleteimages(`BDImages/${filename2}`);
    await DelTempImageFromDB(filename1);
    await DelTempImageFromDB(filename2);
    await seturls();
  };

  return (
    <div className="md:w-11/12 m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper">
      <h2 className="font-khand text-3xl text-center">Registration Form</h2>
      <form onSubmit={handlesubmit} className="text-2xl font-khand font-light">
        <div className="form-field form-field-narrow">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="ad_title" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" name="ad_type" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="image">Image:</label>

          <div class="grid grid-cols-2 gap-4">
            <div>
              {uploadurl || uploadurl2 ? (
                ""
              ) : (
                <input
                  type="file"
                  id="image"
                  name="ad_image1"
                  onChange={handleFileChange}
                />
              )}
            </div>
            <div>
              {uploadurl || uploadurl2 ? (
                ""
              ) : (
                <input
                  type="file"
                  id="image2"
                  name="ad_image2"
                  onChange={handleFileChange2}
                />
              )}
            </div>
          </div>
          {uploadurl || uploadurl2 ? (
            ""
          ) : (
            <button
              onClick={handleimageuploads}
              disabled={uploading}
              className="rounded-full pr-5 pl-5"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          )}

          <div class="flex gap-4">
            <div>
              {uploadurl ? (
                <>
                  <p>{file1uploading}</p>
                  <Image
                    name="url1"
                    src={uploadurl}
                    alt="uploaded image"
                    width={300}
                    height={300}
                    style={{
                      width: "300px",
                      height: "auto",
                      maxHeight: "400px",
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {uploadurl2 ? (
                <>
                  <p>{file2uploading}</p>
                  <Image
                    name="url2"
                    src={uploadurl2}
                    alt="uploaded image"
                    width={300}
                    height={300}
                    style={{
                      width: "300px",
                      height: "auto",
                      maxHeight: "400px",
                    }}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {uploadurl || uploadurl2 ? (
            <div class="grid grid-cols-4 gap-4">
              <button onClick={deletefile}>Change</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-field form-field-narrow">
          <p>{filename1}</p>
          <p>{filename2}</p>
        </div>
        <div className="form-field form-field-narrow">
          <label htmlFor="map">Map:</label>
          <input type="text" id="map" name="ad_map" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="ad_description"></textarea>
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="tel" id="contactNumber" name="ad_telephone" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="contactEmail">Contact Email:</label>
          <input type="email" id="contactEmail" name="ad_email" />
        </div>

        <div className="form-field form-field-narrow">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="ad_address"></textarea>
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
