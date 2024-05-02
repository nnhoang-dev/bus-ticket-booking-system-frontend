import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import HomeSearch from "../components/HomeSearch";
import SearchResult from "../components/SearchResult";
import Footer from "../components/Footer";

const searchInfo = [
  {
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
  },
];

const searchData = [
  {
    id: 1,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "12:00",
    end_time: "15:00",
    price: "200.000",
    address1: "Bến Xe Miền Tây",
    address2: "Bến Xe Đà Lạt",
    vacant_seat: 30,
  },
  {
    id: 2,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
    address1: "Bến Xe Miền Tây",
    address2: "Bến Xe Đà Lạt",
    vacant_seat: 30,
  },
  {
    id: 3,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "18:00",
    end_time: "22:00",
    price: "200.000",
    address1: "Bến Xe Miền Tây",
    address2: "Bến Xe Đà Lạt",
    vacant_seat: 30,
  },
  {
    id: 4,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "22:00",
    end_time: "00:00",
    price: "200.000",
    address1: "Bến Xe Miền Tây",
    address2: "Bến Xe Đà Lạt",
    vacant_seat: 30,
  },
  {
    id: 5,
    start_address: "TP HCM",
    end_address: "Đà Lạt",
    date: "11/5/2024",
    start_time: "16:00",
    end_time: "20:00",
    price: "200.000",
    address1: "Bến Xe Miền Tây",
    address2: "Bến Xe Đà Lạt",
    vacant_seat: 30,
  },
];

function SearchPage(props) {
  return (
    <div>
      <Navbar />
      <Banner />
      <HomeSearch />
      <SearchResult searchInfo={searchInfo} searchData={searchData} />
      <Footer />
    </div>
  );
}

export default SearchPage;
