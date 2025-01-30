import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import Template1 from "../templates/template1";
import axios from "axios";
import Swal from 'sweetalert2';
import Spinner from "../widgets/spinner";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";

const HomePage = () => {
   const [downloading,setDownloading] = useState(false)
   const [selectedTemplate,setselectedTemplate]  = useState(null)
   const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
   const {uuid,template} = useParams()
   const navigate = useNavigate();
   useEffect(()=>{
    setCurrentStep(0)
 },[])
    const [margin, setMargin] = useState("mt-32 opacity-0 ")

    const [showModal, setShowModal] = useState(false);
    const [cvName, setCvName] = useState(""); // To store the user-entered CV name
    const [error, setError] = useState(null);

  

    useEffect(() => {

        setCurrentStep(11)
    }, [])
    useEffect(() => {
        setMargin("mt-0 opacity-100")
    }, [originalDetails])
    const sendToData = {
        'template':template,
        'applicant_id': uuid,
        'cv_name':cvName,
        

    }
    const handleDownloadClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
      };
    
    // const handleSaveAndDownload = () => {
    //     setDownloading(true);
    //     console.log('cv name :',cvName);
    //     axios.post('http://127.0.0.1:8000/api/applicant/savedCv', sendToData)

    //     .then((downloadResponse) => {
    //         console.log("CV saved successfully!:", downloadResponse.data.success);
    //         if (downloadResponse.status === 200) {
    //           Swal.fire({
    //             title: 'Success!',
    //             text: downloadResponse.data.success,
    //             icon: 'success',
    //             confirmButtonText: 'OK'
    //           });
    //         }
      
    //         window.location.reload(); // Reloads the entire page
    //         // const link = downloadResponse.data.body.link;
    //         // // Initiate download by opening the link in a new tab
    //         // window.open(link, '_blank');

    //         // // After download, call the API to save the CV
    //         // return axios.get('https://cvtemplate.ekazi.co.tz/generatePdf/?template=${template}&uuid=${uuid}&name=${candidate.applicant_profile[0].first_name}');
    //     //     const blob = new Blob([downloadResponse.data], {
    //     //         type: downloadResponse.headers["content-type"] || "application/pdf", // Fallback to 'application/pdf'
    //     //     });

    //     //     // Create a download link dynamically
    //     //     const link = document.createElement("a");
    //     //     link.href = window.URL.createObjectURL(blob);
    //     //     link.download = `${cvName}.pdf`; // Set filename
    //     //     link.click(); 

    //     //     // Cleanup
    //     //     window.URL.revokeObjectURL(link.href);
    //     //     setDownloading(false);
    //     //     setShowModal(false);
    //     //     console.log("CV downloaded successfully!")
    //     // })
    //     // .then((saveResponse) => {
    //     //     // Once the CV is saved successfully, stop loading
    //     //     setDownloading(false);
    //     //     window.location.reload();
    //     //     console.log("CV saved successfully!");
    //     })
    //     .catch((error) => {
    //         setDownloading(false);
    //         console.error("Error occurred while downloading or saving the CV:", error);
    //     });
 
    //     setShowModal(false); 
    //     }
   const handleSaveAndDownload = () => {
    if (!cvName || !sendToData || !template || !uuid) {
        console.error("Missing required data: cvName, sendToData, template, or uuid.");
        Swal.fire({
            title: "Error!",
            text: "Required data is missing. Please fill in all fields.",
            icon: "error",
            confirmButtonText: "OK",
        });
        return;
    }

    setDownloading(true); // Start loading indicator

    console.log("CV Name:", cvName);

    // Step 1: Save the CV
    axios
        .post("https://ekazi.co.tz/api/applicant/savedCv", sendToData)
        .then((saveResponse) => {
            console.log("Save Response:", saveResponse);
            const newTab = window.open("", "_blank"); // Open a blank tab immediately
            if (saveResponse.status === 200 && saveResponse.data.success) {
              
                return axios.get(
                    `https://cvtemplate.ekazi.co.tz/generatePdf/?template=${template}&uuid=${uuid}&name=${cvName}`
                );
            } else {
                throw new Error(
                    saveResponse.data.message || "Failed to save CV. Please try again."
                );
            }
        })
        .then((generateResponse) => {
            console.log("Generate Response:", generateResponse);

            const link = generateResponse?.data?.body?.link;
            if (link) {
              
                setDownloading(false); // Stop loading indicator
                // const newTab = window.open("", "_blank"); // Open a blank tab immediately
                // window.open(link, "_blank"); // Open the link in a new tab
                if (newTab) {
                    newTab.location.href = link; // Update URL after fetching the link
                } else {
                    alert("Pop-up blocked! Please allow pop-ups for this site.");
                }
            } else {
                throw new Error("Failed to generate PDF link. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error during save or download process:", error);
            Swal.fire({
                title: "Error!",
                text: error.message || "An unexpected error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        })
        .finally(() => {
            setDownloading(false); // Stop loading indicator
            if (showModal) {
                setShowModal(false); // Close modal
            }
        });
};

              
           






    return ( <div className=" min-h-screen overflow-x-hidden  ">
         <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Welcome to CV builder </h1>
        <p className="text-lg text-gray-500 mt-2">Here is your CV template preview</p>
        </div>
        <div>
            <div className=" flex space-x-2">
           <button className="bg-white rounded-full">
           <button onClick={()=>{
            navigate(`/introduction/${uuid}/${template}`)
           }} className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Edit before downloading</button>
           </button>
           <button className="bg-white rounded-full">
           <button   onClick={handleDownloadClick} className="py-2 px-4 bg-primary font-bold  text-white
              rounded-full">
            {downloading?<Spinner/>:"Save & Download"}
            </button>

           </button>
            </div>
        </div>
        </div>
          <div className="flex pt-4">
          <div className=" w-full ms-auto bg-dark">
           <div className="bg-white pb-16">
            {[
            {template:<Template1/>},
            {template:<Template2/>},
            {template:<Template3/>},
            {template:<Template4/>},
            {template:<Template5/>},
            {template:<Template6/>},
            {template:<Template7/>},
            {template:<Template8/>},
            {template:<Template9/>},
            {template:<Template10/>}].map((item,index)=>{
              return index+1 == template&& <div>{item.template}</div>
            })}
           </div>
          
            </div>
            {/* model for popup */}
            {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Enter CV Name</h2>
                         {/* Informational description */}
                         <p className="mb-2 text-gray-700 max-w-xs">
                            Your CV will be saved to the Ekazi platform and will be available in your personal account. 
                            You can view  your saved CVs at any time by going to the <strong>My CV</strong> section on Ekazi.
            
                            </p>
                        <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder="Enter CV Name"
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveAndDownload}
                            className="bg-primary px-4 py-2 text-white rounded"
                        >
                            Save & Download
                        </button>
                        </div>
                    </div>
                    </div>
                )}
          </div>
    </div> );
}
 
export default HomePage;