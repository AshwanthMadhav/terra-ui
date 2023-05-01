import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axiosBase from "../util/axios_base";

const UploadModal = ({ id, setId, isOpen, closeModal, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("id");
  console.log(id);
  //   const [uploaded, setUploaded] = useState(false);
  useEffect(() => {
    return () => {
      console.log("ertyui");
      //   setId(null);
    };
  }, []);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    setId(null);
    closeModal(false);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      let response = null;
      if (!id) {
        response = await axiosBase.post("/api/assets", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axiosBase.put(`/api/assets/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onUploadSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleClose()}
      contentLabel="Upload Image Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex justify-between text-2xl">
        {id ? <h3>Update Image</h3> : <h3>Upload new image</h3>}
        {/* <h3>Upload Image</h3> */}
        <button onClick={() => handleClose()}>X</button>
      </div>
      <div>
        <input type="file" onChange={handleFileInput} />
      </div>
      {selectedFile && (
        <div>
          <img src={URL.createObjectURL(selectedFile)} alt="preview" />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      <div className="upload py-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </Modal>
  );
};

export default UploadModal;
