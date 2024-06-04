import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import IndividualNotification from "./IndividualNotification";
import { Link } from "react-router-dom";

// Install Swiper modules

const AllNotifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);

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

  return (
    <div>
      <Link to="/">
        <div className="cursor-pointer bg-blue-700 text-center align-middle border-2 border-black p-3   rounded-lg text-l text-white w-1/12 m-1">
          Home
        </div>
      </Link>
      <div>
        <Swiper
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            marginTop: "4rem",
          }}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {allNotifications.map((notification) => (
            <SwiperSlide key={notification._id}>
              <IndividualNotification
                title={notification.title}
                dsc={notification.description}
                imageUrl={notification.imageUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AllNotifications;
