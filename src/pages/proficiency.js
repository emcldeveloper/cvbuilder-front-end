import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOrganization } from "./organizationContext";
import axios from "axios";
import Dropdown from "./droapdown" // Import your dropdown component
import UniversalProfiency from "./universalproficiency";
import moment from "moment";








const Proficiency = () => {

    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedprociciency, setSelectedProciency] = useState('');

    const handleOrganizationSelect = (organization) => {
        setSelectedOrganization(organization);
    };
    const handleProciencySelect = (proficency) => {
        setSelectedProciency(proficency);
    }
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // 'yyyy-mm-dd'
    };

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        organization: '',
        attachment: null,
        ended: '',
        started: '',
        proficiency: ''


    });
    const handleChange = (e) => {

        // Handle other inputs normally
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0],);
        console.log('receive file :', selectedFile);
    };
    console.log('receive file :', selectedFile);

    const sendTOdata = {
        ...formData,
        user_id: uuid,
        proficiency: selectedprociciency,
        organization: selectedOrganization,
        attachment: selectedFile
    };
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(8)
    }, [])
    const openModel = () => {
        setIsModelOpen(true);
    }
    const onClose = () => {
        setIsModelOpen(false);

    }
    const onCloseEditModel = () => {
        setIsShown(false);
    }
    const [EditDatestart, setEditstart] = useState('');
    const [EditDataended, setEditended] = useState('');
    const [editOrganization, seteditOrganization] = useState('');
    const [editProficience, seteditProficience] = useState('');
    const [editaward, seteditaward] = useState('');
    const [editdata, seteditdata] = useState('');
    const [EditFile, setEditFile] = useState(null);
    const openEditModal = (proficiency) => {
        seteditOrganization(proficiency.organization.organization_name);
        seteditProficience(proficiency.proficiency.proficiency_name);
        setEditstart(proficiency.started);
        setEditended(proficiency.ended);
        seteditaward(proficiency.award)
        seteditdata(proficiency);

        setIsShown(true);
    }
    const handleFileEditChange = (e) => {
        setEditFile(e.target.files[0],);
        console.log('receive file :', selectedFile);
    };
    const handlechangeorganization = (value) => {
        seteditOrganization(value);
    }
    const handlechangeproficiency = (value) => {
        seteditProficience(value);
    }
    const handleChangestart = (e) => {
        setEditstart(e.target.value); // `e.target.value` is the selected date
    };
    const handleChangeend = (e) => {
        setEditended(e.target.value); 
    };
    const handleChangeaward = (e) => {
        seteditaward(e.target.value); 
    };
    
    
    const EditToData = {
        started: EditDatestart,
        ended: EditDataended,
        applicant_id: uuid,
        proficiency: editProficience,
        organization: editOrganization,
        attachment: EditFile,
        award:editaward,
    }
    console.log('organization proficience edit', EditToData);
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('send data :', sendTOdata);
        const response = await axios.post(' https://test.ekazi.co.tz/api/applicant/proficiencystore', sendTOdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        );
        try {
            if (response.status === 200) {
                console.log(response.data.success);
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload(); // Reloads the entire page
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
                        const response = await axios.delete(`https://test.ekazi.co.tz/api/applicant/deleteproficiency/${id}`);

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
    const handleHide = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will hide the information on your CV but keep it visible on your profile. Do you want to continue?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hideproficiency/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hiden successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }

                    window.location.reload(); // Reloads the entire page
                } catch (error) {
                    console.error('There was an error hide the referee:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const handleUpdate = async (id, updateData) => {
        try {
            console.log("update proficience  ", updateData);
            const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/updateproficiency/${id}`, updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

            );
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }


             window.location.reload(); // Reloads the entire page
        } catch (error) {
            console.error('There was an error hide the referee:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="font-bold text-3xl">Proficiency</h1>
                <p className="text-lg text-gray-500 mt-2">Add or remove proficiency here</p>
            </div>
            <div className="flex space-x-4">
                <div className="bg-white rounded-full">
                    <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full">
                        Step 8
                    </button>
                </div>
                <div className="bg-white rounded-full">
                    <button className="py-2 px-4 bg-blue-500 font-bold text-white rounded-full" onClick={openModel}>
                        Add
                    </button>
                </div>
            </div>

        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
            {
                originalDetails.proficiency.map((item) => {
                    return <div className="p-5 bg-white border border-gray-200 rounded shadow">
                        <p> <span className="font-bold">{item.award}:</span> {moment(item.started).format("YYYY-MM-DD ")} - {moment(item.ended).format("YYYY-MM-DD")}</p>
                        <p className="flex space-x-2">
                            <i>{item.proficiency.proficiency_name}</i>,
                            <p>{item.organization.organization_name}</p>
                        </p>
                        <div className="flex space-x-4 mt-3">
                            <div

                                onClick={() => openEditModal(item)}
                                className="cursor-pointer text-blue-500 hover:text-blue-700 transition-all">
                                <FontAwesomeIcon icon={faEdit} />

                            </div>
                            <div
                                onClick={() => handleRemove(item.id)}
                                className="cursor-pointer text-red-500 hover:text-red-700 transition-all">
                                <FontAwesomeIcon icon={faTrash} />

                            </div>
                            <div
                                onClick={() => handleHide(item.id)} // Implement handleHide to hide the referee
                                className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all">
                                <FontAwesomeIcon icon={faEyeSlash} />

                            </div>
                        </div>

                    </div>
                })
            }
        </div>
        <div className="flex justify-end space-x-2 mt-4 items-center">
            <h1 onClick={() => {
                navigate(-1)
                setCurrentStep(currentStep - 1)
            }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
            <button onClick={() => {
                navigate(`/Training/${uuid}/${template}`)
                setCurrentStep(currentStep + 1)
            }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
        </div>
        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Add Proficiency</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Organization / Institution <span className="text-red-500">*</span>
                            </label>

                            <Dropdown
                                onSelect={handleOrganizationSelect}
                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Proficiency <span className="text-red-500">*</span>
                            </label>
                            <UniversalProfiency
                                onSelect={handleProciencySelect}
                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Started <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="started"
                                value={formData.started}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ended <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="ended"
                                value={formData.ended}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Awarded <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="award"
                                value={editaward}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Attach Certificate <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="attachment"
                                name="attachment"
                                type="file"
                                // accept=".pdf"
                                className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )

        }
        {isShown && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Edit Proficiency</h3>
                        <button
                            type="button"
                            onClick={onCloseEditModel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editdata.id, EditToData);
                    }} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Organization / Institution <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                onSelect={handlechangeorganization}
                                initialValue={editOrganization} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Proficiency <span className="text-red-500">*</span>
                            </label>
                            <UniversalProfiency
                                onSelect={handlechangeproficiency}
                                initialValue={editProficience} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Started <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="started"
                                value={moment(EditDatestart).format("YYYY-MM-DD")}
                                onChange={handleChangestart}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ended <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="ended"

                                value={moment(EditDataended).format("YYYY-MM-DD")}
                                onChange={handleChangeend}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Awarded <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="award"

                                value={editaward}
                                onChange={handleChangeaward}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Attach Certificate <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="attachment"
                                name="attachment"
                                type="file"
                                // accept=".pdf"

                                onChange={handleFileEditChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />

                        </div>

                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                type="button"
                                onClick={onCloseEditModel}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )

        }
    </div>);
}

export default Proficiency;