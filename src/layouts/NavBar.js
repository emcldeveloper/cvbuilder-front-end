import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ openModal }) => {
    const { uuid, template } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed w-full z-40">
            {/* Mobile Header with Logo and Hamburger Menu */}
            <div className="flex py-3 md:py-5 w-full bg-[#E5E4F6] justify-between items-center px-4 md:px-12">
                {/* Logo */}
                <div className="flex items-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-auto ml-8"  // Adjust ml-* as needed (ml-2, ml-6, etc.)
                />
            </div>


                {/* Hamburger Menu Button (Mobile Only) */}
                <div className="md:hidden">
                    <button onClick={toggleNav} className="text-black">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6 absolute md:static top-12 left-0 w-full md:w-auto bg-[#E5E4F6] md:bg-transparent p-4 md:p-0`}>
                    <a
                        onClick={openModal}
                        className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-2 md:mb-0"
                    >
                        Subscription
                    </a>
                    <a
                        onClick={() => navigate(`/${uuid}/${template}`)}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        CV Building
                    </a>
                    <a
                        onClick={() => { window.location.href = "https://ekazi.co.tz/find-job"; }}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        Find Job
                    </a>
                    <a
                        onClick={() => navigate(`/my-subscription/${uuid}/${template}`)}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        Subscription
                    </a>
                    <a
                        onClick={() => navigate(`/my-cv/${uuid}/${template}`)}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        My CV
                    </a>
                    <a
                        onClick={() => navigate(`/sample-template/${uuid}/${template}`)}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        CV Templates
                    </a>
                    <a
                        onClick={() => navigate(`/cover-letter/${uuid}/${template}`)}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        Cover Letter
                    </a>
                    <a
                        onClick={() => { window.location.href = "https://ekazi.co.tz/applicant/dashboard"; }}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        Back to Profile
                    </a>
                </nav>
            </div>
            
        </div>
        
    );
};

export default NavBar;