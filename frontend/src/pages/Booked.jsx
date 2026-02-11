// import React, { useContext } from "react";
// import { GiConfirmed } from "react-icons/gi";
// import { bookingDataContext } from "../Context/BookingContext";
// import { IoStarSharp } from "react-icons/io5";
// const Booked = () => {
//   let { bookingData } = useContext(bookingDataContext);
//   return (
//     <div className="w-[100vh] min-h-[100vh] flex items-center justify-center gap-[30px] bg-slate-200 flex-col">
//       <div className="w-[95%] max-w-[500px] h-[400px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg">
//         <div className="w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px] font-semibold">
//           {" "}
//           <GiConfirmed className="w-[100px] h-[100px] text-[green]" />
//           Booking Confirmed
//         </div>
//         <div className="w-[100px] flex items-center justify-between text-[16px]  md:text-[18px]">
//           <span>Booking Id :</span> <span>{bookingData?._id}</span>{" "}
//         </div>
//         <div className="w-[100px] flex items-center justify-between text-[16px]  md:text-[18px]">
//           <span>Owner Details :</span> <span>{bookingData.host?.email}</span>{" "}
//         </div>
//         <div className="w-[100px] flex items-center justify-between text-[16px]  md:text-[18px]">
//           <span>Total Rent :</span> <span>{bookingData.totalRent}</span>{" "}
//         </div>
//       </div>

//       <div className="w-[95%] max-w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5] flex gap-[20px] p-[20px] md:w-[80%] rounded-lg">
//         <h1 className="text-[18px]">0 out of 5 Rating</h1>
//           <IoStarSharp className=""/>
//           <button className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg  text-nowrap">Submit</button>
//       </div>

//     </div>
//   );
// };

// export default Booked;


























import React, { useContext, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { IoStarSharp } from "react-icons/io5";
import { bookingDataContext } from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";
import Star from "../Component/Star";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import axios from "axios";


const Booked = () => {
  const { bookingData } = useContext(bookingDataContext);
  let [star,setStar]=useState(null)
  let {serverUrl}=useContext(authDataContext)
  let {getCurrentUser}=useContext(userDataContext)
  let {getListing}=useContext(listingDataContext)
  let {cardDetails}=useContext(listingDataContext)

  let navigate=useNavigate();

  const handleStar=async(value)=>{
    setStar(value)
    console.log("you rated",value)
  }

  const handleRating=async(id)=>{
    try {
      let result=await axios.post(serverUrl+ `/api/listing/ratings/${id}`,{
        ratings:star
      },{withCredentials:true})
      await getListing();
      await getCurrentUser();
      console.log(result)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-[10px] bg-slate-200 flex-col p-4">

      {/* Booking Info Card */}
      <div className="w-full max-w-[500px] bg-white flex flex-col items-center justify-center border border-gray-300 gap-6 p-6 rounded-lg shadow-sm">
        
        <div className="w-full text-xl flex items-center justify-center flex-col gap-5 font-semibold">
          <GiConfirmed className="w-[100px] h-[100px] text-green-600" />
          <p>Booking Confirmed</p>
        </div>

        <div className="w-full flex justify-between text-[16px] md:text-[18px]">
          <span>Booking Id :</span>
          <span>{bookingData?._id}</span>
        </div>

        <div className="w-full flex justify-between text-[16px] md:text-[18px]">
          <span>Owner Email :</span>
          <span>{bookingData?.host?.email}</span>
        </div>

        <div className="w-full flex justify-between text-[16px] md:text-[18px]">
          <span>Total Rent :</span>
          <span>₹ {bookingData?.totalRent}</span>
        </div>
      </div>

      {/* Rating Card */}
      <div className="w-[95%] max-w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px]  border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg">
        
        <h1 className="text-[18px]">{star} out of 5 Rating</h1>

  
          <Star onRate={handleStar}/>
      

        <button className="px-8 py-2 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition" onClick={()=>handleRating(cardDetails._id)} >
          Submit
        </button>
      </div>

      <button className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap absolute top-[10px] right-[20px]" onClick={()=>navigate("/")}>
          Back to Home
        </button>

    </div>
  );
};

export default Booked;
