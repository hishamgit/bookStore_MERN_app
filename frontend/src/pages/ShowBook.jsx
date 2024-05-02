import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { REACT_APP_API_URL } from '../../config'
import axios from "axios";
import { loginContext } from "../../appContext";
import { useCookies } from "react-cookie";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const {loginStatus,setLoginStatus}=useContext(loginContext);
  const [cookies,setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const axiosInstance=axios.create({baseURL:REACT_APP_API_URL})


  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      const { data } = await axiosInstance.post(
        "",
        {},
        { withCredentials: true }
      );
      // console.log(data);
      const { status, user } = data;
      if (status) {
        setLoginStatus(true);
      } else {
        removeCookie("token",{ path: '/' });
        setLoginStatus(false)
        navigate("/auth/login");
        toast(user, { position: "top-left" });
        console.log('cookie not ok')
      }
    };
    verifyCookie();
    axiosInstance
      .get(`book/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [cookies,removeCookie,navigate]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id : </span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title : </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author : </span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year : </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time : </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Update Time :{" "}
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
