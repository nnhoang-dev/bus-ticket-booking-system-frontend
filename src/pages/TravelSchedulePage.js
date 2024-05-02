import React from "react";
import Navbar from "../components/Navbar";
import TravelScheduleInfo from "../components/TravelScheduleInfo";
import HomeSearch from "../components/HomeSearch";
import Footer from "../components/Footer";

const travelInfo = [
  {
    id: 1,
    start_address: "TP HCM",
    end_address: "Cần Thơ",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
  },
  {
    id: 2,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
  },
  {
    id: 3,
    start_address: "TP HCM",
    end_address: "Kiên Giang",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
  },
  {
    id: 4,
    start_address: "TP HCM",
    end_address: "Bến Tre",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
  },
  {
    id: 5,
    start_address: "TP HCM",
    end_address: "Đồng Tháp",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
  },
];

function TravelSchedulePage(props) {
  return (
    <div>
      <Navbar />
      <HomeSearch />
      <TravelScheduleInfo travelInfo={travelInfo} />
      <Footer />
    </div>
  );
}

export default TravelSchedulePage;
