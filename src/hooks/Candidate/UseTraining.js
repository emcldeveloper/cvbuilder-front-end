// src/hooks/Candidate/useTrainingForm.js
import { useState } from "react";
import Swal from "sweetalert2";
import { createTraining } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useTrainingForm = (applicant_id) => {
    const [formData, setFormData] = useState({
        started: "",
        ended: "",
        name: "",
        institution: "",
        attachment: null,
    });
    const [loading, setLoading] = useState(false); // 🟢 Loading stat

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
                name: formData.name,
                started: formData.started,
                ended: formData.ended,
                institution: formData.institution,
                attachment: formData.attachment,
            };
            const response = await createTraining(sendData);

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

export default useTrainingForm;
