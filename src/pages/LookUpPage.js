import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LookUpForm from "../components/LookUpForm";

function LookUpPage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LookUpForm />
      <Footer />
    </div>
  );
}

export default LookUpPage;
