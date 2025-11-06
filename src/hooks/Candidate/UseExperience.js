 // src/hooks/Candidate/useTrainingForm.js
 import { useState } from "react";
 import Swal from "sweetalert2";
 import { createExperience } from "../../Api/Jobseeker/JobSeekerProfileApi";
 
 const useExperinceForm = (applicant_id) => {
     const [formData, setFormData] = useState({
         industry: "",
         position: "",
         experiencetype: "",
         employer: "",
         sub_location: "",
         country: "",
         region: "",
         started: "",
         ended: "",
         responsibility: "",
         remark:"",
         positionlevel: "",
         startsalaryRange: "",
         endsalaryRange: "",

     });
     const [loading, setLoading] = useState(false);
 
     const handleChange = (field, value) => {
         setFormData((prev) => ({ ...prev, [field]: value }));
     };
 
     
 
     const handleSubmit = async (e) => {
         e.preventDefault();
         setLoading(true); // start loading 🕐
 
         try {
             const sendData = {
                 applicant_id,
                 industry: formData.industry,
                 position: formData.position,
                 employer: formData.employer,
                 experiencetype: formData.experiencetype,
                 started: formData.started,
                 ended: formData.ended,
                 country: formData.country,
                 region:formData.region,
                responsibility: formData.responsibility,
                remark:formData.remark,
                positionlevel:formData.positionlevel,
                startsalaryRange:formData.startsalaryRange,
                endsalaryRange:formData.endsalaryRange,

               
             };
           
             const response = await createExperience(sendData);
 
             if (response && response.status === 200) {
                 Swal.fire({
                     title: "Success!",
                     text: response.data?.success || "Experince record saved successfully!",
                     icon: "success",
                     confirmButtonText: "OK",
                 });
                //  window.location.reload(); // Reloads the entire page
             } else {
                 Swal.fire({
                     title: "Error!",
                     text: response?.data?.error || "Failed to save Experince record.",
                     icon: "error",
                     confirmButtonText: "OK",
                 });
             }
 
         } catch (error) {
             // Handle Laravel 422 validation errors
             if (error.response && error.response.status === 422) {
                 const validationErrors = error.response.data.error;
 
                 // Convert object to readable message
                 const messages = Object.values(validationErrors)
                     .flat()
                     .join("\n");
 
                 Swal.fire({
                     title: "Validation Error",
                     text: messages,
                     icon: "warning",
                     confirmButtonText: "OK",
                 });
             } else {
                 Swal.fire({
                     title: "Error!",
                     text: "Something went wrong. Please try again.",
                     icon: "error",
                     confirmButtonText: "OK",
                 });
             }
         } finally {
             setLoading(false);
         }
     };
 
 
     return {
         formData,
         handleChange,
         handleSubmit,
         loading
     };
 };
 
 export default useExperinceForm
 