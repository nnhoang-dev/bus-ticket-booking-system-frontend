import React from "react";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup(props) {
  return (
    <div>
      <Navbar />
      <div className="text-white h-[100vh] flex flex-row justify-center items-center bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1557223563-8db8e5e7d90b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
