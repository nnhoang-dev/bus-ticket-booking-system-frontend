import React from "react";
import Navbar from "../components/Navbar";
import LookUpForm from "../components/LookUpForm";
import LookUpResult from "../components/LookUpResult";

const result = [
  {
    first_name: "Kim Long",
    last_name: "Võ",
    phone_number: "0915307659",
    email: "longsn113@gmail.com",
    price: "290.000",
    method_pay: "VNPay",
    status: "Thành công",
    ticket_id: "NYIYLM",
    name: "Vũng Tàu - Kiên Giang",
    date: "11/5/2024",
    time: "20:00",
    seat: "A20",
    address1: "Bến Xe Vũng Tàu",
    address2: "Bến Xe Kiên Giang",
    license: "ABC-123-FD23",
  },
];

function LookUpResultPage(props) {
  return (
    <div>
      <Navbar />
      <LookUpForm />
      <LookUpResult result={result} />
    </div>
  );
}

export default LookUpResultPage;
