import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationForm = ({ changeMode }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [hospital, sethospital] = useState("");
  const [day, setDay] = useState("");

  const options = [
    { label: "ENT", value: "ENT" },
    { label: "Ortho", value: "Ortho" },
    { label: "Neuro", value: "Neuro" },
    { label: "Pediatrics", value: "Pediatrics" },
    { label: "Cardio", value: "Cardio" },
    { label: "Pulmonary", value: "Pulmonary" },
    { label: "Dental", value: "Dental" },
    { label: "Gynecology", value: "Gynecology" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Psychiatry", value: "Psychiatry" },
  ];

  useEffect(() => {
    sethospital(localStorage.getItem("hospital"));
  }, []);

  const handleProceed = () => {
    alert("hitting button");
    const userJWT = localStorage.getItem("userJWT");
    // hit api
    const sendToTokenController = async () => {
      alert("about to send request to server");
      await axios
        .post("http://localhost:8008/user/allot_token_number", {
          userJWT,
          appointmentType: selectedOption,
          severity: 3,
          day,
        })
        .then((res) => console.log("res", res));
    };

    sendToTokenController();
    // run the changes
    changeMode("landing");
  };

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const selectClasses = "w-full px-2 py-2.5 rounded border ";

  return (
    <div className="flex flex-col gap-3  p-6 font-inter">
      <h1 className="font-bold pb-1.5 border-b text-lg sm:text-xl lg:text-3xl">
        REGISTRATION FORM / <span className="font-light">(पंजीकरण)</span>
      </h1>
      <div className="self-start flex flex-col p-10 w-full m-auto bg-gray-100/80 rounded border">
        <div className="dropdown self-start w-full space-y-2">
          <p className="font-bold m-0">Appointment Type/नियुक्ति प्रकार</p>
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-10 dropdown self-start w-full space-y-2">
          <p className="font-bold m-0">Day</p>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select a day</option>
            <option value={"today"}>Today</option>
            <option value={"tomorrow"}>Tomorrow</option>
          </select>
        </div>

        <div className="self-start w-full text-left my-5">
          <p className="font-bold">Symptoms/लक्षण</p>
          <div className="flex flex-col gap-3 w-full">
            {/* <label className="italic font-medium">Describe your symptoms</label> */}
            <textarea
              className="border rounded p-2"
              placeholder="Describe your symptoms"
              width={300}
              height={200}
            ></textarea>
          </div>
        </div>
        <button
          onClick={handleProceed}
          className=" bg-green-600/80  text-white font-medium text-xl self-center px-3 py-1.5 rounded-lg"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
