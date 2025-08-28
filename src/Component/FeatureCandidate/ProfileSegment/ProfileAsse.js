import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { FaEye, FaStar } from "react-icons/fa";
 

const ProfileAssessment = ({ candidate }) => {
    const applicant_tag = candidate?.applicant?.applicant_tags || [];
    console.log("tag one", applicant_tag);
    const [views, setViews] = useState(2000);
    const [rating, setRating] = useState(10); // average rating
    const [totalRatings, setTotalRatings] = useState(20); // number of ratings
    const [userRating, setUserRating] = useState(null);
    const candidateId = 48;
    useEffect(() => {
        // fetch candidate stats when component loads
        // axios.get(`/api/candidate/${candidateId}/stats`).then((res) => {
        //     setViews(res.data.views);
        //     setRating(res.data.rating);
        //     setTotalRatings(res.data.total_ratings);
        // });

        // // increment view count
        // axios.post(`/api/candidate/${candidateId}/view`);
    }, [candidateId]);

    const handleRate = (value) => {
        // axios.post(`/api/candidate/${candidateId}/rate`, { rating: value }).then((res) => {
        //     setRating(res.data.rating);
        //     setTotalRatings(res.data.total_ratings);
        //     setUserRating(value);
        // });
    };



    if (applicant_tag.length === 0) {
        return (
            <Container className="border p-4 bg-white rounded mb-1">
                <p className="text-muted">No Profile Assessment  available.</p>
            </Container>
        );
    }


    return (

        <Container className="border p-4 bg-white rounded mb-1">
            <p className="fw-bold text-primary mb-3" style={{ fontSize: "18px" }}>
                Profile Assessment
            </p>
            <hr />

            <p className="d-flex align-items-center">
                <FaEye className="text-primary me-2" /> {views}
            </p>

            <p className="d-flex align-items-center">
                <FaStar className="text-primary me-2" />{" "}
                {rating.toFixed(1)} ({totalRatings} ratings)
            </p>

            <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRate(star)}
                        className={`px-2 py-1 rounded d-flex align-items-center justify-content-center ${userRating === star ? "bg-warning text-white" : "bg-light"
                            }`}
                    >
                        <FaStar />
                        <span className="ms-1">{star}</span>
                    </button>
                ))}
            </div>
        </Container>
    );
};

export default ProfileAssessment;