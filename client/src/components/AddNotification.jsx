import React, { useState, useEffect } from "react";
import "./style.css";
import NotificationForAdmin from "./NotificationForAdmin";
import { Link } from "react-router-dom";

const AddNotification = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bookfinder-1.onrender.com/notifications",
          {
            method: "POST",
          }
        );
        if (response.ok) {
          const data = await response.json();
          // Reverse the array before setting the state
          setAllNotifications(data.notifications.reverse());
          console.log("Data:", data.notifications);
        } else {
          throw new Error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    secretKey: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const maxFileSize = 10 * 1024 * 1024; // 10 MB (adjust as needed)
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(async (blob) => {
          const fd = new FormData();
          fd.append("file", blob, file.name);
          fd.append("upload_preset", "LibraryProject");
          fd.append("cloud_name", "dqhvbtzjq");

          try {
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dqhvbtzjq/image/upload",
              {
                method: "POST",
                body: fd,
              }
            );
            const response = await res.json();
            console.log(response);
            if (!response.secure_url) {
              alert("Image not uploaded");
            } else {
              alert("Image uploaded");
            }
            setFormData((prevState) => ({
              ...prevState,
              imageUrl: response.secure_url,
            }));
            setIsLoading(false);
          } catch (error) {
            console.error("Error uploading image:", error.message);
            setIsLoading(false);
          }
        }, file.type);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://bookfinder-1.onrender.com/addnotifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Notification added successfully");
        window.location.reload();
        setFormData({
          title: "",
          description: "",
          date: "",
          secretKey: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const onChange = (e) => {
    console.log("called");
    setKey(e.target.value);
  };

  const onClick = () => {
    console.log(key);
    localStorage.setItem("secKey", key);
    alert("Secret key added successfully");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "3rem",
          marginBottom: "3rem",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <input
          onChange={onChange}
          style={{
            border: "solid",
            padding: "5px",
            borderRadius: "10px",
            margin: "auto",
          }}
          type="text"
          placeholder="Enter Secret Key Here"
        />
        <div style={{ margin: "auto" }}>
          <button className="form-button" onClick={onClick}>
            Add key
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="secretKey" className="form-label">
            Secret Key:
          </label>
          <input
            type="password"
            id="secretKey"
            value={formData.secretKey}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="form-input"
          />
          {formData.imageUrl && <img src={formData.imageUrl} alt="Uploaded" />}
        </div>
        {!isLoading ? (
          <button type="submit" className="form-button">
            Add Notification
          </button>
        ) : (
          <div>Uploading Image...</div>
        )}
      </form>
      <div className="text-center">
        <Link
          to="/"
          className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
        >
          Go Back to Home
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        {allNotifications.map((notification) => (
          <NotificationForAdmin
            key={notification._id} // Assuming there's an _id field in the notification object
            title={notification.title}
            dsc={notification.description}
            imageUrl={notification.imageUrl}
            _id={notification._id}
          />
        ))}
      </div>
    </div>
  );
};

export default AddNotification;
