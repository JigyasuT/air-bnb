import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios"
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const SignUp = () => {
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let {userData,setUserData}=useContext(userDataContext)
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {loading,setLoading}=useContext(authDataContext);

  const handleSignUP = async (e) => {
    setLoading(true)
    try {
      e.preventDefault();
      let result =await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false)
      setUserData(result.data)
      navigate("/");
      toast.success("Signup Successfully...")
      console.log(result);
    } catch (error) {
      setLoading(false);
       toast.error("Something went wrong...")
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-red-600 absolute cursor-pointer top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white]" />
      </div>
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center  flex-col md:items-start gap-[10px] mt-[30px] "
        onSubmit={handleSignUP}
      >
        <h1 className="text-[30px] text-[black]">Welcome to Airbnb</h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="" className="text-[20px]">
            UserName
          </label>
          <input
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="" className="text-[20px]">
            Email
          </label>
          <input
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative ">
          <label htmlFor="" className="text-[20px]">
            Password
          </label>
          <input
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] relative"
            type={show ? "text" : "password"}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!show && (
            <IoMdEye
              className="w-[22px]  h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {show && (
            <IoMdEyeOff
              className="w-[22px]  h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>
        <button className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg" disabled={loading}>
          {loading?"Loading...":"SignUp"}
        </button>
        <p className="text-[18px]  ">
          Already have a account?{" "}
          <span
            className="text-[19px] text-[green] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
