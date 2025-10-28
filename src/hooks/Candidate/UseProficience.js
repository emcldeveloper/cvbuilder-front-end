// src/hooks/Candidate/useTrainingForm.js
import { useState } from "react";
import Swal from "sweetalert2";
import { createTraining } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { createProficience } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useProficienceForm = (applicant_id) => {
    const [formData, setFormData] = useState({
        started: "",
        ended: "",
        award: "",
        proficiency: "",
        attachment: null,
    });
    const [loading, setLoading] = useState(false); 

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, attachment: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading 🕐

        try {
            const sendData = {
                applicant_id,
                award: formData.award,
                proficiency: formData.proficiency,
                started: formData.started,
                ended: formData.ended,
                organization: formData.organization,
                attachment: formData.attachment,
            };
            console.log("proficeincy data is availbel",sendData)
            const response = await createProficience(sendData);

            if (response && response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data?.success || "Training record saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                window.location.reload(); // Reloads the entire page
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response?.data?.error || "Failed to save training record.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }

        } catch (error) {
            console.error("Error saving training:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        finally {
            setLoading(false); // stop loading 🔚
        }
    };


    return {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
        loading
    };
};

export default useProficienceForm;
