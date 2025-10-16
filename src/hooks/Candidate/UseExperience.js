// src/hooks/JobSeeker/useLanguageForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

 

const useExperinceForm = (applicant_id) => {
  
   const [formData, setFormData] = useState({
       'started': '',
       'ended': '',
       'position': '',
       'country': '',
       'region': '',
       'employer': '',
       'industry': '',
       'start_salary': '',
       'end_salary': '',
       'level': '',
       'sub_location': '',
       'remark': '',
       'responsibility': ''
     });
 

   console.log("data experience is available on this type" ,formData);

  // Handle select change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

     const sendData = {
      employer: formData.employer?.value || null,
      country: formData.country?.value || null,
      region: formData.region?.value || null,
      position: formData.position?.value || null,
      start_salary: formData.start_salary?.value || null,
      end_salary: formData.end_salary?.value || null ,
      started: formData.started?.value || null,
      ended: formData.ended?.value || null,
      level: formData?.positionlevel.value || null ,

    
    };

    try {
        console.log("received employer from form",sendData);
    //   const response = "200";
    //   if (response.status === 200) {
        Swal.fire({
          title: "Success!",
        //   text: response.data.success,
          text: " successful save the experience data",
          icon: "success",
          confirmButtonText: "OK",
        });
    //     if (onSuccess) onSuccess(); // refresh parent data
    //   }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
    //   setLoading(false);
    }
  };
    const handleRemove = (id) => {
          {
              Swal.fire({
                  title: 'Are you sure?',
                  text: "This action will permanently delete the item. Do you want to proceed? ",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, delete it!'
              }).then(async (result) => {
                  if (result.isConfirmed) {
                      try {
  
                        //   const response = await deleteLanguage(id) 
                        const response ="200";
  
                          if (response.status === 200) {
                              Swal.fire({
                                  title: 'Success!',
                                  text: 'Data has been deleted permanently.',
                                  icon: 'success',
                                  confirmButtonText: 'OK'
                              }).then(() => {
                                  window.location.reload(); // Reloads the entire page after the success message
                              });
                          }
  
                      } catch (error) {
                          console.error('There was an error removing the referee:', error);
  
                          Swal.fire({
                              title: 'Error!',
                              text: 'Failed to remove referee. Please try again.',
                              icon: 'error',
                              confirmButtonText: 'OK'
                          });
                      }
                  }
              });
          };
      };

  return {
    formData,
     handleSubmit,
     handleChange,
    // handleRemove,
    // loading,
 
  };
};

export default useExperinceForm;
