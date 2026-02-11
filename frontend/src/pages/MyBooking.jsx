import React, { useContext, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";

const MyBooking = () => {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative">
      <div
        className="w-[50px] h-[50px] bg-red-600 absolute cursor-pointer top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white]" />
      </div>
      <div className="w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap px-[20px]">
        MY Booking
      </div>
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] fleex-wrap mt-[30px]">
        {userData.booking.map((list)=>(
                  <Card title={list.title}  landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3}  rent={list.rent} id={list._id} isBooked={list.isBooked}  host={list.host} ratings={list.ratings} key={list._id} />
                 ))}
      </div>
    </div>
  );
};

export default MyBooking;
