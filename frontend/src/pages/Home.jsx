import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/Home/BooksCard";
import BooksTable from "../components/Home/BooksTable";
import { loginContext } from "../../appContext";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [username, setUsername] = useState("");
  const [cookies,setCookie, removeCookie] = useCookies([]);
  const {loginStatus,setLoginStatus}=useContext(loginContext);

  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token",{path: "/", domain: "localhost"})  //since httpOnly:false
    setLoginStatus(false)
    navigate("/auth/login");
    console.log('cookie removal')
  };

  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:5555/api",
        {},
        { withCredentials: true }
      );
      // console.log(data);
      const { status, user } = data;
      if (status) {
        setUsername(user);
        setLoginStatus(true);
        toast(`Hello ${user}`);
      } else {
        removeCookie("token",{ path: '/' });
        setLoginStatus(false)
        toast(user, { position: "top-left" });
        console.log('cookie not ok')
      }
    };
    verifyCookie();
    axios
      .get("http://localhost:5555/api/book")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [cookies, navigate, removeCookie]);
  return (
      <div className="p-4">
        {loginStatus ? (
          <div className="flex justify-end items-center gap-x-4">
            <button
              className="bg-blue-500 hover:bg-sky-600 px-4 py-1 rounded-lg"
              onClick={Logout}
            >
              Sign out
            </button>
            <span></span>
          </div>
        ) : (
          <div className="flex justify-end items-center gap-x-4">
            <button
              className="bg-blue-500 hover:bg-sky-600 px-4 py-1 rounded-lg"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </button>
            <button
              className="bg-indigo-500 hover:bg-sky-600 px-4 py-1 rounded-lg"
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up
            </button>
          </div>
        )}

        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Books List</h1>
          <Link to={"book/create"}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
  );
}

export default Home;
