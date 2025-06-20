import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOrganization } from "../../pages/organizationContext";
import axios from "axios";
import Dropdown from "../../pages/droapdown";
import UniversalProfiency from "../../pages/universalproficiency";
import Language from "../../pages/universal/language";
import ReadLanguage from "../../pages/universal/readLanguage";
import SpeakLanguage from "../../pages/universal/speakLanguage";
import WriteLanguage from "../../pages/universal/writeLanguage";
import UnderstandLanguage from "../../pages/universal/understandLanguage";
import { CvApi } from "../../Api/Jobseeker/CvApi";
import { Table } from "react-bootstrap";

const LanguagesCvComponent = () => {

    const [selectedlanguage, setSelectedLanguage] = useState('');
    const [selectedSpeak, setSelectedSpeak] = useState('');
    const [selectedWrite, setSelectedWrite] = useState('');
    const [selectedRead, setSelectedRead] = useState('');
    const [selectedUnderstand, setSelectedUnderstand] = useState('');
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [errors, setErrors] = useState({});
    const [editlanguage, setEditLanguage] = useState('');
    const [originalDetails, setOriginalDetails] = useState(null)
    const uuid = localStorage.getItem("applicantId");

    
    const handleSpeakAbilitySelect = (speak) => {
        setSelectedSpeak(speak);
    }
    const handleWriteAbilitySelect = (write) => {
        setSelectedWrite(write);
    }
    const handleReadAbilitySelect = (read) => {
        setSelectedRead(read);
    }
    const handleUnderstandAbilitySelect = (understand) => {
        setSelectedUnderstand(understand);
    }

    const sendTOdata = {

        applicant_id: uuid,
        language: selectedlanguage,
        read: selectedRead,
        write: selectedWrite,
        speak: selectedSpeak,
        understand: selectedUnderstand,

    };
    const navigate = useNavigate();

    const openModel = () => {
        setIsModelOpen(true);
    }
    const onClose = () => {
        setIsModelOpen(false);

    }
    const onCloseEditModel = () => {
        setIsShown(false);
    }
    const onOpeEditModel = () => {
        setIsShown(true);
    }
    const [initialSelection, setInitialSelection] = useState(null);

    useEffect(() => {
        if (editlanguage) {
            setInitialSelection(editlanguage.language_name); // Set the initial selection correctly
        }
    }, [editlanguage]); // Only depend on `editlanguage`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CvApi.getCvprofile(uuid)
                if (response != null) {
                    const data = response.data
                    console.log("all data safi", data);
                    setOriginalDetails(data);

                }
            } catch (error) {

            }
        };
        fetchData();

    }, []);
    console.log("language  data is open ", originalDetails);
    //edit language
    const [editLanguageId, setEditLanguageId] = useState(''); // ID of the language to edit (example: 1)
    const [editReadId, setEditReadId] = useState(''); // ID of the language to edit (example: 1)
    const [editWriteId, setEditWriteId] = useState(''); // ID of the language to edit (example: 1)
    const [editSpeakId, setEditSpeakId] = useState(''); // ID of the language to edit (example: 1)
    const [editUnderstandId, setEditUnderstandId] = useState(''); // ID of the language to edit (example: 1)

    // Callback to handle selection
    const handleEditLanguageSelect = (selectedValue) => {

        setEditLanguageId(selectedValue); // Update parent state
    };
    const handleLanguageSelect = (selectedValue) => {
        console.log('Selected Language ID:', selectedValue);
        setSelectedLanguage(selectedValue); // Update parent state
    };
    const handleEditSpeakAbilitySelect = (speak) => {
        setEditSpeakId(speak)
    }
    const handleEditWriteAbilitySelect = (language) => {
        setEditWriteId(language);
    }
    const handleEditReadAbilitySelect = (language) => {
        setEditReadId(language);
    }
    const handleEditUnderstandAbilitySelect = (understand) => {
        setEditUnderstandId(understand)
    }

    const openEditModal = (language) => {
        setEditLanguageId(language.language.id);
        setEditReadId(language.read.id);
        setEditWriteId(language.write.id);
        setEditSpeakId(language.speak.id)
        setEditUnderstandId(language.understand.id)
        setEditLanguage(language.id)
        setIsShown(true);
    }
    const EditData = {
        language: editLanguageId,
        read: editReadId,
        write: editWriteId,
        speak: editSpeakId,
        understand: editUnderstandId,
        applicant_id: uuid,
    }
    console.log('edit information yes', EditData);

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('send data for language purpose :', sendTOdata);
        const response = await axios.post('http://127.0.0.1:8000/api/applicant/storeLanguage', sendTOdata, {
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

                        const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/languagedelete/${id}`);

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

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidelanguage/${id}`);

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
            console.log('update data for Lnaguage ', updateData);
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/languageupdate/${id}`, updateData,
                {

                    headers: {
                        'Content-Type': 'multipart/form-data',
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
            console.error('There was an error update the training', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };




    // edit languagr

    return (!originalDetails == null ? <PageLoader /> : <div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
            {/* Left Section: Title & Description */}
            <div className="text-center text-md-start mb-3 mb-md-0">
                <h1 className="fw-bold h2 text-dark mb-1">Language</h1>
                <p className="text-muted mb-0">
                    Add or remove language here
                </p>
            </div>

            {/* Right Section: Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2">
                {/* Step 5 Button */}
                <button className="btn btn-outline-secondary rounded-pill fw-bold px-4 py-2">
                    Step 7
                </button>
                <button
                    className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
                    onClick={openModel}
                >
                    Add
                </button>
            </div>
        </div>
        {originalDetails?.data?.language?.length > 0 ? (
            <div className="table-responsive mt-4">
                <Table borderless className="mb-0">
                    <thead>
                        <tr>
                            <th className="text-black fw-bold">Language</th>
                            <th className="text-black fw-bold">Read</th>
                            <th className="text-black fw-bold">Write</th>
                            <th className="text-black fw-bold">Speak</th>
                            <th className="text-black fw-bold">Understand</th>
                            <th className="text-black fw-bold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {originalDetails.data.language.map((item, index) => {
                            const languageName = item?.language?.language_name || "Not specified";
                            const readAbility = item?.read?.read_ability || "Not specified";
                            const writeAbility = item?.write?.write_ability || "Not specified";
                            const speakAbility = item?.speak?.speak_ability || "Not specified";
                            const understandAbility = item?.understand?.understand_ability || "Not specified";

                            return (
                                <React.Fragment key={item?.id || index}>
                                    <tr className="language-row">
                                        <td className="p-2 align-middle">{languageName}</td>
                                        <td className="p-2 align-middle">{readAbility}</td>
                                        <td className="p-2 align-middle">{writeAbility}</td>
                                        <td className="p-2 align-middle">{speakAbility}</td>
                                        <td className="p-2 align-middle">{understandAbility}</td>
                                        <td className="p-2 align-middle">
                                            <div className="d-flex gap-2 justify-content-end">
                                                <button
                                                    className="btn btn-sm btn-link text-primary p-1"
                                                    onClick={() => openEditModal(item)}
                                                    title="Edit"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-link text-danger p-1"
                                                    onClick={() => handleRemove(item?.id)}
                                                    title="Delete"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-link text-secondary p-1"
                                                    onClick={() => handleHide(item?.id)}
                                                    title="Hide"
                                                >
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {index < originalDetails.data.language.length - 1 && (
                                        <tr>
                                            <td colSpan={6} className="border-top p-0">
                                                {/* <div className="divider"></div> */}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </Table>

                {/* Style for the divider */}
                <style jsx>{`
            .divider {
                height: 1px;
                width: 100%;
                background-color: #eaeaea;
                margin: 4px 0;
            }
            .language-row:hover {
                background-color: #f8f9fa;
            }
        `}</style>
            </div>
        ) : (
            <p className="text-muted mt-4">No languages added</p>
        )}


        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Add Language</h3>
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
                                Language <span className="text-red-500">*</span>
                            </label>
                            <Language

                                onSelect={handleLanguageSelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Read Ability <span className="text-red-500">*</span>
                            </label>
                            <ReadLanguage
                                // options={readAbilities}
                                onSelect={handleReadAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Write Ability <span className="text-red-500">*</span>
                            </label>
                            <WriteLanguage
                                // options={writeAbilities}
                                onSelect={handleWriteAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Speak Ability <span className="text-red-500">*</span>
                            </label>
                            <SpeakLanguage
                                // options={speakAbilities}
                                onSelect={handleSpeakAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Understand Ability <span className="text-red-500">*</span>
                            </label>
                            <UnderstandLanguage
                                // options={understandAbilities}
                                onSelect={handleUnderstandAbilitySelect}
                                className="w-full"
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
        )}

        {isShown && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Edit Language</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editlanguage, EditData)
                    }} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Language <span className="text-red-500">*</span>
                            </label>
                            {/* <Language
                     
                        
                        /> */}

                            <Language
                                label="Select Language"
                                onSelect={handleEditLanguageSelect} // Callback for when a language is selected
                                initialValue={editLanguageId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options language tttr:', options)} // Optional: Handle loaded options
                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Read Ability <span className="text-red-500">*</span>
                            </label>
                            <ReadLanguage
                                // options={readAbilities}
                                onSelect={handleEditReadAbilitySelect}
                                className="w-full"
                                initialValue={editReadId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options read tttr:', options)}
                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Write Ability <span className="text-red-500">*</span>
                            </label>
                            <WriteLanguage
                                // options={writeAbilities}
                                onSelect={handleEditWriteAbilitySelect}
                                className="w-full"
                                initialValue={editWriteId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options read tttr:', options)}
                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Speak Ability <span className="text-red-500">*</span>
                            </label>
                            <SpeakLanguage
                                // options={speakAbilities}
                                onSelect={handleEditSpeakAbilitySelect}
                                className="w-full"
                                initialValue={editSpeakId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options speak tttr:', options)}

                            />

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Understand Ability <span className="text-red-500">*</span>
                            </label>
                            <UnderstandLanguage
                                onSelect={handleEditUnderstandAbilitySelect}
                                className="w-full"
                                initialValue={editUnderstandId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options speak tttr:', options)}
                                isClearable={false}
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

export default LanguagesCvComponent;