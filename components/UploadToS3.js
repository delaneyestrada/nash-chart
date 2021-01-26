import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Dropzone from "react-dropzone";
import {
    fetchPhotos,
    loadWidget,
    openUploadWidget,
} from "../utils/CloudinaryService";

const UploadToS3 = () => {
    const [file, setFile] = useState("");
    const [widgetLoaded, setWidgetLoaded] = useState(false);

    useEffect(() => {
        loadWidget(() => {
            setWidgetLoaded(true);
        });
    });

    const beginUpload = (tag) => {
        const uploadOptions = {
            cloudName: "nashchart",
            tags: [tag],
            uploadPreset: "uploadchart",
            clientAllowedFormats: ["png", "jpeg", "jpg", "pdf"],
            maxFileSize: 1500000,
            thumbnails: ".upload-thumbnails",
            autoMinimize: true,
            multiple: false,
            maxFiles: 1,
        };

        openUploadWidget(uploadOptions, (error, photo) => {
            if (!error) {
                console.log(photo);
                if (photo.event === "success") {
                    setFile([photo.info]);
                }
            } else {
                console.log(error);
            }
        });
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append("image", this.file, this.file.name);
        axios.post("http://localhost:8888/.netlify/functions/upload-chart");
    };
    return (
        <div>
            <div className="upload-thumbnails"></div>
            <Button
                onClick={() => {
                    beginUpload();
                }}
            >
                Upload Image
            </Button>
        </div>
    );
};

export default UploadToS3;
