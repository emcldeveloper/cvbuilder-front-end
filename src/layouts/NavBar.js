import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Template1 from "../templates/template1";
import { createContext, useEffect, useState } from "react";
import FromReactPdf from "../templates/fromReactPdf";
import axios from "axios";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";


const NavBar = ({ openModal }) => {
    const { uuid, template } = useParams()
    const navigate = useNavigate();
    return (
        <div className="fixed w-full">
            <div className="flex py-5 w-9/12 bg-[#E5E4F6] justify-between items-center px-12">
                {/* Left Section: Upgrade Subscription */}
                <button
                    onClick={openModal}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Upgrade CV Subscription
                </button>

                {/* Center Section: Navigation Links */}
                <nav className="flex gap-6">
                    <a
                          onClick={() => {
                            navigate(`/${uuid}/${template}`)

                        }}
                        className="text-black font-semibold hover:text-blue-600 transition"
                    >
                        Home
                    </a>
                    <a
                  
                        onClick={() => {
                            navigate(`/my-subscription/${uuid}/${template}`)

                        }}
                        className="text-black font-semibold hover:text-blue-600 transition"
                    >
                        Subscription
                    </a>
                    <a
                        
                        onClick={() => {
                            navigate(`/my-cv/${uuid}/${template}`)

                        }}
                        className="text-black font-semibold hover:text-blue-600 transition"
                    >
                       My CV
                    </a>
                    <a
                      
                        onClick={() => {
                            navigate(`/sample-template/${uuid}/${template}`)

                        }}
                        className="text-black font-semibold hover:text-blue-600 transition"
                    >
                        Template
                    </a>
                    <a
                      
                      onClick={() => {
                          navigate(`/cover-letter/${uuid}/${template}`)

                      }}
                      className="text-black font-semibold hover:text-blue-600 transition"
                  >
                      coverletter
                  </a>
                </nav>

                {/* Right Section: Back to Profile */}
                <h1
                    onClick={() => {
                        window.location.href = "https://ekazi.co.tz/applicant/dashboard";
                    }}
                    className="font-bold text-black cursor-pointer hover:text-blue-600 transition"
                >
                    Back 
                </h1>
            </div>
        </div>
    );
};

export default NavBar;
