// src/hooks/JobSeeker/useLanguageForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

 

const useLanguageForm = (editData, applicant_id, onSuccess) => {
  
//   const { understandlanguage } = useUnderstandLanguage();

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     language: null,
//     read: null,
//     write: null,
//     speak: null,
//     understand: null,
//   });

 

  // Handle select change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sendData = {
      language: formData.language?.value || null,
      read: formData.read?.value || null,
      write: formData.write?.value || null,
      speak: formData.speak?.value || null,
      understand: formData.understand?.value || null,
      applicant_id,
    };

    try {
      const response = await createlanguage(sendData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response.data.success,
          icon: "success",
          confirmButtonText: "OK",
        });
        if (onSuccess) onSuccess(); // refresh parent data
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
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
  
                          const response = await deleteLanguage(id) 
  
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
    handleChange,
    handleSubmit,
    handleRemove,
    loading,
    AllLanguageOptions,
    AllReadLanguageOptions,
    AllWriteLanguageOptions,
    AllSpeakLanguageOptions,
    AllUnderstandLanguageOptions,
  };
};

export default useLanguageForm;
