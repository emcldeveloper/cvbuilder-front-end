import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";
import { checkIfExists } from "../controllers/apisController";
import moment from "moment";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Template1 from "../downloadtemplate/template1";
import Template2 from "../downloadtemplate/template2";
import Template3 from "../downloadtemplate/template3";
import Template4 from "../downloadtemplate/template4";
import Template5 from "../downloadtemplate/template5";
import Template6 from "../downloadtemplate/template6";
import Template7 from "../downloadtemplate/template7";
import Template8 from "../downloadtemplate/template8";
import Template9 from "../downloadtemplate/template9";
import Template10 from "../downloadtemplate/template10";





const MyCv = () => {

    const [originalDetails, setOriginalDetails] = useState(null)
    const [careerObjective, setCareerObjective] = useState(
        originalDetails?.careers[0].career || ''
    );
    const [Objective, setObjective] = useState(
        originalDetails?.objective.objective || ''
    );
    const [subscription, setSubscription] = useState([]);
    const { uuid, template } = useParams()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCv, setSelectedCv] = useState(null);


    useEffect(() => {
        axios
            .get(`https://ekazi.co.tz/api/applicant/mycv/${uuid}`)
            .then((response) => {
                console.log("API Response:", response); // Debug API response
                if (response) {
                    const data = response.data.mycv
                    setSubscription(data);
                    console.log("test cv sub", data);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching CV Subscription data:", error.message);
            });
    }, []); // Empty dependency array means this runs only once on component mount
    const [searchTerm, setSearchTerm] = useState("");

    // Filter subscription data based on the search term
    const filteredData = subscription.filter((sub) => {
        const applicantName = `${sub.applicant.first_name} ${sub.applicant.last_name}`;
        const cvName = sub.cv_name.toLowerCase();
        const templateNo = sub.template_no.toString();
        const created_at = sub.created_at.toString();

        return (
            applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cvName.includes(searchTerm.toLowerCase()) ||
            templateNo.includes(searchTerm.toLowerCase()) ||
            created_at.includes(searchTerm.toLowerCase())
        );
    });
    const openModal = (cv) => {
        setSelectedCv(cv);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCv(null);
    };
    console.log('cv selection is done', selectedCv);


    //   originalDetails == null || candidate == null ? <PageLoader />
    return (
        
        <div>
            
                <div className="p-4 sm:p-6">
    {/* Header Section */}
    <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl sm:text-3xl">My CV Downloaded</h1>
    </div>

    {/* Subscription CV Section */}
    {/* <div className="mt-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">My Subscription CV</label>
        <div className="subscription-page bg-gray-50 p-4 rounded-lg">
         
        </div>
    </div> */}
    </div>
            <div className="mt-2">

                {/* end table */}
                <div className="overflow-x-auto">
                    {/* Search Input */}
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded px-4 py-2 w-1/3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">CV Name</th>
                                <th className="border border-gray-300 px-4 py-2">Template No</th>
                                <th className="border border-gray-300 px-4 py-2">Created At</th>
                                <th className="border border-gray-300 px-4 py-2">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            <img
                                                src="/cv5.jpg"
                                                alt={sub.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {sub.applicant.first_name} {sub.applicant.last_name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{sub.cv_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{sub.template_no}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {moment(sub.created_at).format("YYYY-MM-DD")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button className="text-blue-500 hover:text-blue-700 flex items-center"
                                                onClick={() => openModal(sub)}
                                            >
                                                <i className="fas fa-eye mr-2"></i> View CV
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center text-gray-500 py-4"
                                    >
                                        No data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* new table */}
                {/* Modal for View CV */}
                {modalOpen && selectedCv && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        {/* Modal Content */}
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 h-5/6 overflow-auto">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b pb-2 mb-4">
                                <h2 className="text-xl font-semibold">
                                    Viewing CV - Template {selectedCv.template_no}
                                </h2>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={closeModal}
                                >
                                    <i className="fas fa-times"></i> Close
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="h-full overflow-y-auto">
                                {selectedCv.template_no === 1 ? (
                                    <Template1 id={selectedCv.id} />
                                ) : selectedCv.template_no === 2 ? (
                                    <Template2 id={selectedCv.id} />
                                ) : selectedCv.template_no === 3 ? (
                                    <Template3 id={selectedCv.id} />
                                ) : selectedCv.template_no === 4 ? (
                                    <Template4 id={selectedCv.id} />
                                ) : selectedCv.template_no === 5 ? (
                                    <Template5 id={selectedCv.id} />
                                )
                                    : selectedCv.template_no === 6 ? (
                                        <Template6 id={selectedCv.id} />
                                    )
                                        : selectedCv.template_no === 7 ? (
                                            <Template7 id={selectedCv.id} />
                                        )
                                        : selectedCv.template_no === 8 ? (
                                            <Template8 id={selectedCv.id} />
                                        )
                                        : selectedCv.template_no === 9 ? (
                                            <Template9 id={selectedCv.id} />
                                        )
                                        : selectedCv.template_no === 10 ? (
                                            <Template10 id={selectedCv.id} />
                                        )

                                            : (
                                                <div className="text-gray-500 text-center py-4">
                                                    Unknown Template
                                                </div>
                                            )}
                                            <p>download</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default MyCv;