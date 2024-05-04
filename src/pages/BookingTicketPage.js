import React from "react";
import Navbar from "../components/Navbar";
import BookingTicketForm from "../components/BookingTicketForm";
import Footer from "../components/Footer";

const userInfo = [
  {
    first_name: "Kim Long",
    last_name: "Võ",
    email: "longsn113@gmail.com",
    phone_number: "0915307659",
  },
];

function BookingTicketPage(props) {
  return (
    <div>
      <Navbar />
      <BookingTicketForm userInfo={userInfo} />
      <Footer />
    </div>
  );
}

export default BookingTicketPage;
