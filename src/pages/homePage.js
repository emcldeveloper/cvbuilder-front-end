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
import HideInfo from '../layouts/useHideFields';
import { useLocation } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";

const HomePage = () => {
    const [downloading, setDownloading] = useState(false)
    const [selectedTemplate, setselectedTemplate] = useState(null)
    const [donwload, setSub] = useState(null)
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(0)
    }, [])
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
        'template': template,
        'applicant_id': uuid,
        'cv_name': cvName,


    }

    const handleDownloadClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };


    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }


    };

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



        console.log("CV Name:", cvName);
        const newTab = window.open("", "_blank"); // Open a blank tab immediately
        setDownloading(true); // Start loading indicator
        // Step 1: Save the CV

        axios
            .post("https://ekazi.co.tz/api/applicant/savedCv", sendToData)
            .then((saveResponse) => {
                console.log("Save Response:", saveResponse);

                if (saveResponse.status === 200 && saveResponse.data.success) {

                    // https://cvtemplate.ekazi.co.tz
                    return axios.get(
                        `   http://localhost:5001/generatePdf/?template=${template}&uuid=${uuid}&name=${cvName}`, options
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


                    // const newTab = window.open("", "_blank"); // Open a blank tab immediately
                    // window.open(link, "_blank"); // Open the link in a new tab
                    if (newTab) {
                        newTab.location.href = link; // Update URL after fetching the link
                        setDownloading(false); // Stop loading indicator
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
    useEffect(() => {
        axios
            .get(`https://ekazi.co.tz/api/applicant/mycv/${uuid}`)
            .then((response) => {
                console.log("API Response:", response); // Debug API response
                if (response) {
                    const data = response.data.mycv
                    setSub(data);
                    console.log("test cv sub", data);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching CV Subscription data:", error.message);
            });
    }, []);
    console.log("check download", donwload);

    let templateCount = {};
    let uniqueTemplateCount = 0;
    let totalUsageSum = 0;

    if (Array.isArray(donwload)) {
        donwload.forEach(item => {
            const templateNo = item.template_no;
            if (templateNo != null) {  // Skip if template_no is null or undefined
                templateCount[templateNo] = (templateCount[templateNo] || 0) + 1;
            }
        });

        // Step 2: Count unique templates (avoid redundancy)
        uniqueTemplateCount = Object.keys(templateCount).length;

        totalUsageSum = Object.values(templateCount).reduce((sum, count) => sum + count, 0);
    } else {

        templateCount = {};
        uniqueTemplateCount = 0;
        totalUsageSum = 0;
    }

    console.log("Template Usage:", templateCount);
    console.log("Unique Template Count:", uniqueTemplateCount);
    console.log("Total Template Usage Count:", totalUsageSum);







    return (<div className=" min-h-screen overflow-x-hidden  ">
        <div className="bg-white p-5 rounded-lg shadow-md w-full mt-3">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md p-6">
  {/* Left Section: Heading + Marquee */}
  <div className="text-center md:text-left w-full overflow-hidden">
    {/* Animated Info Text */}
    <div className="overflow-hidden whitespace-nowrap mb-2">
      <p className="animate-marquee text-sm md:text-base font-medium text-primary">
        Explore more options by clicking 'CV Templates' in the navigation bar.
      </p>
    </div>

    {/* Dashboard Title */}
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">CV Dashboard</h2>
    <p className="text-gray-500 text-sm sm:text-base mt-1">
      Manage your CV templates, usage, and downloads efficiently
    </p>
  </div>

  {/* Right Section: Stats */}
  <div className="flex flex-col sm:flex-row justify-center md:justify-end w-full md:w-auto mt-6 md:mt-0 gap-4">
    {/* Downloads Card */}
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl px-6 py-4 shadow-sm text-center hover:shadow-md transition">
      <h3 className="text-2xl font-bold text-gray-800">
        {totalUsageSum != null ? totalUsageSum : 'N/A'}
      </h3>
      <p className="text-sm text-gray-500 mt-1">Downloads</p>
    </div>

    {/* Templates Used Card */}
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl px-6 py-4 shadow-sm text-center hover:shadow-md transition">
      <h3 className="text-2xl font-bold text-gray-800">
        {uniqueTemplateCount}
      </h3>
      <p className="text-sm text-gray-500 mt-1">Templates Used</p>
    </div>
  </div>
</div>



            {/* Action Buttons */}
            {/* <div className="flex flex-col md:flex-row mt-6 space-y-4 md:space-y-0 md:space-x-4 w-full">
                
                <button
                    onClick={() => navigate(`/introduction/${uuid}/${template}`)}
                    className="w-full md:w-auto py-2 px-4 bg-primary font-bold text-white rounded-full hover:bg-primary-dark transition"
                >
                    Edit before downloading
                </button>
                <button
                    onClick={handleDownloadClick}
                    className="w-full md:w-auto py-2 px-4 bg-green-500 font-bold text-white rounded-full hover:bg-green-600 transition"
                >
                    {downloading ? <Spinner /> : "Save & Download"}
                </button>
            </div> */}
        </div>

        <div className="flex pt-4">
            <div className=" w-full ms-auto bg-dark">
                <div className="bg-white pb-16">
                    {[
                        { template: <Template1 /> },
                        { template: <Template2 /> },
                        { template: <Template3 /> },
                        { template: <Template4 /> },
                        { template: <Template5 /> },
                        { template: <Template6 /> },
                        { template: <Template7 /> },
                        { template: <Template8 /> },
                        { template: <Template9 /> },
                        { template: <Template10 /> }].map((item, index) => {
                            return index + 1 == template && <div>{item.template}</div>
                        })}
                    <div className="w-full flex flex-col md:flex-row md:justify-end md:space-x-4 space-y-3 md:space-y-0 mt-4 pr-4">
                        <button
                            onClick={() => navigate(`/introduction/${uuid}/${template}`)}
                            className="w-full md:w-auto py-2 px-4 bg-primary font-bold text-white rounded-full hover:bg-primary-dark transition"
                        >
                            Edit before downloading
                        </button>
                        <button
                            onClick={handleDownloadClick}
                            className="w-full md:w-auto py-2 px-4 bg-green-500 font-bold text-white rounded-full hover:bg-green-600 transition"
                        >
                            {downloading ? <Spinner /> : "Save & Download"}
                        </button>
                    </div>
                </div>

            </div>
            {/* model for popup */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Cv Save & Download Form</h2>
                        {/* Informational description */}
                        <p className="mb-2 text-gray-700 max-w-xs">
                            <HideInfo uuid={uuid} template={template} > </HideInfo>
                            Your CV will be saved to the Ekazi platform and will be available in your personal account.
                            You can view  your saved CVs at any time by going to the <strong>My CV</strong>.

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
    </div>);
}

export default HomePage;