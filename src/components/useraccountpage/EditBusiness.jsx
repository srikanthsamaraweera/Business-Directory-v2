import { useState, useRef, useEffect } from "react";
import "../register.css";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseconfig";
import RandNum from "@/functions/generaterand";
import Resizer from "react-image-file-resizer";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/functions/validaterecaptcha";
import deleteimages from "@/functions/deleteimages";
import saveTempImage, { SetUSedInPost } from "@/functions/tempImagesSave";
import DelTempImageFromDB from "@/functions/tempImageDelDB";
import citylist from "./cities";
import EditAd from "@/functions/adoperations/EditAd";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTimes } from "@fortawesome/free-solid-svg-icons";

const EditBusiness = ({
  id,
  // Saving,

  // SetSaving,

  randno,

  title,

  type,

  image1,

  image2,

  map,

  description,

  contact_number,

  contact_email,

  address,

  addistrict,

  adcity,
  simplefilename1,
  simplefilename2,
  onBack,
}) => {
  //*********variables for image upload start ********
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadurl, setuploadurl] = useState(image1);
  const [uploadurl2, setuploadurl2] = useState(image2);
  const [randomkey, setrandomkey] = useState("1");
  // const [Saving, SetSaving] = useState("Register");
  // const [Saving, SetSaving] = useState("Register");
  const [filename1, setfilename1] = useState("");
  const [filename2, setfilename2] = useState("");

  const [file1uploading, setfile1uploading] = useState("");
  const [file2uploading, setfile2uploading] = useState("");
  const [bothimagesEmpty, setbothimagesEmpty] = useState(true);

  //*********variables for image upload end ********

  const random = RandNum(1, 100000);
  const date = new Date();

  //code for recaptcha
  const [isverified, setisverified] = useState("");
  const [captchamessage, setcaptchamessage] = useState("");
  const recaptchaRef = useRef(null);

  // console.log("cities list - ", JSON.stringify(citylist));

  // List of districts and their corresponding cities
  const districtsAndCities = citylist;

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [saved, setSavingx] = useState("");

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setCities(districtsAndCities[district] || []);
    setSelectedCity(districtsAndCities[district][0]); // Reset city when district changes
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    if (uploadurl || uploadurl2) {
      setbothimagesEmpty(false);
    } else {
      setbothimagesEmpty(true);
    }
  }, [uploadurl, uploadurl2]); // Dependency array to watch for changes

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

      //await handleupload();
      //  await handleupload2();
      console.log("urlset- ", uploadurl, " ", uploadurl2);

      if (
        bothimagesEmpty &&
        confirm("Are you sure you want to save without any images") == true
      ) {
        setisverified("");
        //  SetSaving("Saving...");
        await EditAd(formData, uploadurl, uploadurl2, filename1, filename2, id);
        await SetUSedInPost(filename1, filename2);
        RandomKeyset();
        setuploadurl("");
        setuploadurl2("");
        setfilename1("");
        setfilename2("");
        setSavingx("saved");
      } else if (!bothimagesEmpty) {
        setisverified("");
        //SetSaving("Saving...");
        await EditAd(formData, uploadurl, uploadurl2, filename1, filename2, id);
        await SetUSedInPost(filename1, filename2);
        RandomKeyset();
        setuploadurl("");
        setuploadurl2("");
        setfilename1("");
        setfilename2("");
        setSavingx("saved");
      }
    }
  };

  const seturls = async () => {
    setfilename1("");
    setfilename2("");
    setuploadurl("");
    setuploadurl2("");
  };

  const deletefile = async () => {
    setfilename1(simplefilename1);
    setfilename2(simplefilename2);
    console.log("delete - ", filename1);
    await deleteimages(`BDImages/${filename1}`);
    await deleteimages(`BDImages/${filename2}`);
    await DelTempImageFromDB(filename1);
    await DelTempImageFromDB(filename2);
    await seturls();
  };

  // Initialize state variables for each form field
  const [adTitle, setAdTitle] = useState(title);
  const [adType, setAdType] = useState(type);
  const [adMap, setAdMap] = useState(map);
  const [adDescription, setAdDescription] = useState(description);
  const [adTelephone, setAdTelephone] = useState(contact_number);
  const [adEmail, setAdEmail] = useState(contact_email);
  const [adAddress, setAdAddress] = useState(address);
  const [fimage1, setfimage1] = useState(image1);
  const [fimage2, setfimage2] = useState(image2);
  const [simplefname1, setsimplefname1] = useState(simplefilename1);
  const [simplefname2, setsimplefname2] = useState(simplefilename2);

  const handleInputChange = (setFunction) => (event) =>
    setFunction(event.target.value);

  // Load initial values from props on component mount
  useEffect(() => {
    setAdTitle(title);
    setAdType(type);
    setAdMap(map);
    setAdDescription(description);
    setAdTelephone(contact_number);
    setAdEmail(contact_email);
    setAdAddress(address);
  }, [title, type, map, description, contact_number, contact_email, address]);

  return (
    <div>
      {saved === "saved" ? (
        <div className="md:w-6/12 w-11/12 m-auto mt-20 mb-10 border-2 p-10 lg:pr-20 pr-10-10 lg:pl-20 pr-10 regist-form-wrapper relative">
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 size-5 top-4 hover:opacity-50"
            icon={faCircleXmark}
            onClick={() => {
              onBack();
            }}
          ></FontAwesomeIcon>
          <p className="font-khand md:text-5xl sm:text-3xl text-3xl">
            Ad Edited Sucessfully!
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
              <p>Ad submitted for review. Will be posted after approval.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-11/12 m-auto mt-10 mb-10 border-2 p-5  regist-form-wrapper relative">
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 size-5 hover:opacity-50"
            icon={faCircleXmark}
            onClick={() => {
              onBack();
            }}
          ></FontAwesomeIcon>

          <h2 className="font-khand text-3xl text-center">Edit Business</h2>
          <form
            onSubmit={handlesubmit}
            className="text-2xl font-khand font-light"
          >
            <div className="form-field form-field-narrow">
              <label htmlFor="title">ID:</label>
              <input type="text" id="adid" name="ad_id" value={id} readOnly />
            </div>
            <div className="form-field form-field-narrow">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="ad_title"
                value={adTitle}
                onChange={handleInputChange(setAdTitle)}
              />
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                name="ad_type"
                value={adType}
                onChange={handleInputChange(setAdType)}
              />
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

              <div class="flex gap-4" key={randomkey}>
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
            <div className="form-field form-field-narrow" key={randomkey}>
              <p>file1 {filename1}</p>
              <p>file2 {simplefname2}</p>
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="map">Map:</label>
              <input
                type="text"
                id="map"
                name="ad_map"
                value={adMap}
                onChange={handleInputChange(setAdMap)}
              />
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="ad_description"
                value={adDescription}
                onChange={handleInputChange(setAdDescription)}
              ></textarea>
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                name="ad_telephone"
                value={adTelephone}
                onChange={handleInputChange(setAdTelephone)}
              />
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="contactEmail">Contact Email:</label>
              <input
                type="email"
                id="contactEmail"
                name="ad_email"
                value={adEmail}
                onChange={handleInputChange(setAdEmail)}
              />
            </div>

            <div className="form-field form-field-narrow">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                name="ad_address"
                value={adAddress}
                onChange={handleInputChange(setAdAddress)}
              ></textarea>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-field form-field-narrow">
                <label htmlFor="district">District:</label>
                <select
                  id="district"
                  name="ad_district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value={addistrict}>{addistrict}</option>
                  {Object.keys(districtsAndCities).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field form-field-narrow">
                <label htmlFor="city">City:</label>
                <select
                  id="city"
                  name="ad_city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  required
                  // disabled={!selectedDistrict}
                >
                  <option value={adcity}>{adcity}</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
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
                value={"Save"}
                // disabled={Saved ? true : false}
                // className={Saved ? "opacity-disabled" : ""}
              />
              {/* {Saved ? <a href="">Edit / View AD</a> : ""} */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBusiness;
