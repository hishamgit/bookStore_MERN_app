import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { REACT_APP_API_URL } from "../../config"; 

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance=axios.create({baseURL:REACT_APP_API_URL})

  const handleSaveBook = () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };
    axiosInstance
      .post("book", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error occurred", { variant: "error" });
        // alert('error occurred,check console')
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex justify-center">
        <h1 className="text-3xl my-4">Create Book</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-800 rounded-xl p-4 mx-auto w-[600px]">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300" onClick={handleSaveBook}>
          save
        </button>
      </div>
    </div>
  );
}

export default CreateBook;
