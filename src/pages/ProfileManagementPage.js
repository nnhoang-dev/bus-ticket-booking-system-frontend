import React from "react";
import ProfileManagementForm from "../components/ProfileManagementForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const userInfo = [
  {
    first_name: "Kim Long",
    last_name: "Võ",
    phone_number: "0915307659",
    gender: "Nam",
    email: "longsn113@gmail.com",
    date_of_birth: "11/3/2004",
    address: "TP HCM",
  },
];

function ProfileManagementPage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ProfileManagementForm userInfo={userInfo} />
      <Footer />
    </div>
  );
}

export default ProfileManagementPage;
