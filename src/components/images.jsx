import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../styles/images.css";
import { getAssets } from "../util/api";
import { bucket, s3Endpoint } from "../util/constants";
import UploadModal from "./UploadModal";
import { AuthContext } from "../contexts/AuthContexts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosBase from "../util/axios_base";
const images = () => {
  const [images, setImages] = useState([]);
  const [id, setId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const notify = (msg) => toast(msg);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const fetchAssets = async () => {
    try {
      const response = await getAssets();
      setImages(response.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchAssets();
  }, []);
  const handleUploadSuccess = () => {
    fetchAssets();
    notify("Image uploaded successfully");
  };

  if (!auth?.isLoggedIn) {
    return navigateTo("/");
  }

  const deleteImage = async (id) => {
    try {
      let response = await axiosBase.delete(`/api/assets/${id}`);
      fetchAssets();
      notify("Deleted successfully");
    } catch (e) {
      console.log(e);
    }
  };
  const uploadImageModal = async (id, url) => {
    try {
      setId(id);
      setModalIsOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="text-end pt-5 pr-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 m-10">
        {images?.map((item) => {
          return (
            <div className="bg-blue-100 p-5" key={item._id}>
              <img alt="image" src={`${s3Endpoint}/${bucket}/${item.url}`} />
              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => uploadImageModal(item._id, item.url)}
              >
                Edit
              </button>
              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => deleteImage(item._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {modalIsOpen && (
        <UploadModal
          id={id}
          setId={setId}
          isOpen={modalIsOpen}
          closeModal={setModalIsOpen}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default images;
