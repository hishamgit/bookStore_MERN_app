import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value }); //[name]
  };
  const handleSuccess = (msg) => {
    toast.success(msg,{transition: Zoom});
  };
  const handleError = (msg) => {
    toast.error(msg, {
      transition: Flip
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/auth/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 9000);
      } else {
        handleError(message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex justify-center">
        <h1 className="text-3xl my-4">Signup</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border-2 border-sky-800 rounded-xl p-4 mx-auto w-[600px]">
          <div className="my-4">
            <label htmlFor="email" className="text-xl mr-4 text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300" type="submit">
            Sign up
          </button>
          <span className="flex justify-center">
            Already have an account..?{" "}
            <Link className="text-sky-600" to={"/auth/login"}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
