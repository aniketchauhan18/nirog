import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import HospitalCard from "./HospitalCard";

const HospitalSelect = ({ changeMode, setHospital }) => {
  const [hospitals, setHospitals] = useState([]);
  const [currentHospital, setCurrentHospital] = useState({});

  useEffect(() => {
    const fetchhospital = async () => {
      await axios.get("http://localhost:8008/admin/getHospital").then((res) => {
        console.log(res.data)
        setHospitals(res.data);
      });
    };

    fetchhospital();
  }, []);

  const avlbHospitals = [
    {
      name: "Sunrise Memorial Hospital",
      rating: "4/5",
      address: "123 Health Drive, Sun City",
      contact: "info@sunrisehospital.com",
    },
    {
      name: "Unity General Hospital",
      rating: "4.2/5",
      address: "456 Unity Street, Healstown",
      contact: "contact@unityhospital.com",
    },
    {
      name: "Mercy Care Hospital",
      rating: "3.8/5",
      address: "789 Hope Avenue, Mercyville",
      contact: "support@mercycarehospital.com",
    },
    {
      name: "Golden Gate Medical Center",
      rating: "4.5/5",
      address: "101 Health Lane, Golden City",
      contact: "info@goldengatemedical.com",
    },
  ];

  const handleSelect = (value) => {
    alert(`your selected hospital is: ${value}`);
    setCurrentHospital(value);
    changeMode("registration");
    localStorage.setItem("hospital", value);
    const userJWT = localStorage.getItem("userJWT");
    const saveHospital = async () => {
      await axios
        .post("http://localhost:8008/user/add_hospital", {
          userJWT,
          hospName: currentHospital,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("selected this hospital for you.");
          } else {
            alert("couldnt allot hospital");
          }
        });
    };

    saveHospital();
  };


  return (
    <div className="relative flex flex-col text-zinc-800 gap-8 w-full p-6 font-inter ">
      <h1 className=" m-0 text-4xl font-bold pb-2 border-b">
        Hamirpur
      </h1>
      <div className="mt-10">
        <h1>SELECT A HOSPITAL</h1>
        <h2 className="font-light">(अस्पताल का चयन करें)</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital) => (
          // <div
          //   key={hospital._id}
          //   className="flex border-black bg-slate-200 border-2 w-11/12 m-auto rounded-3xl items-center justify-between px-5 py-2"
          // >
          //   <div className="flex flex-col items-start">
          //     <h5 className="font-bold">{hospital.name}</h5>
          //     <p className="italic underline font-semibold">
          //       {hospital.rating}
          //     </p>
          //     <div className="flex items-center">
          //       <img
          //         src="/location.png"
          //         alt="Location icon"
          //         className="mr-0"
          //         style={{ width: "3em", height: "3em", marginTop: "-0.50em" }}
          //       />
          //       <p>{hospital.address}</p>
          //     </div>
          //     <div className="flex items-center">
          //       <img
          //         src="/mail.png"
          //         alt="Location icon"
          //         className="mr-0"
          //         style={{
          //           width: "4em",
          //           height: "4em",
          //           marginTop: "-0.50em",
          //           marginRight: "-1em",
          //         }}
          //       />{" "}
          //       <p>{hospital.email}</p>
          //     </div>
          //   </div>
          //   <button
          //     className="bg-[#2e90f5] rounded-full py-2 px-5 text-white hover:scale-105 duration-100 hover:shadow-lg"
          //     onClick={() => handleSelect(hospital.name)}
          //   >
          //     SELECT
          //   </button>
          // </div>
          <HospitalCard key={hospital._id} data={hospital} onSelection={handleSelect}/>  
        ))}
      </div>
    </div>
  );
};

export default HospitalSelect;
