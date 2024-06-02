import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import IndividualNotification from './IndividualNotification';

// Install Swiper modules

const AllNotifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bookfinder-1.onrender.com/notifications", {
          method: "POST"
        });
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
    <Swiper
    style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      justifyItems:"center",
      marginTop:"4rem"
    }}
    pagination={{
      type: 'fraction',
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
  );
};

export default AllNotifications;
