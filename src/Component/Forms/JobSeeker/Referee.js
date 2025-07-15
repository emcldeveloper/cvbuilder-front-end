import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { createreferee } from "../../../Api/Jobseeker/JobSeekerProfileApi";
import Swal from "sweetalert2";

const RefereeModal = ({ isOpen, onClose, onSubmit, referee = null, isEditMode = false }) => {
    const [formData, setFormData] = useState({
        first_name: referee?.first_name || '',
        middle_name: referee?.middle_name || '',
        last_name: referee?.last_name || '',
        position: referee?.position || '', 
        employer: referee?.employer || '',
        email: referee?.email || '',
        phone: referee?.phone || '',
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const applicant_id = localStorage.getItem("applicantId");

    useEffect(() => {
        setErrors({});
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.middle_name.trim()) newErrors.middle_name = 'Middle name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!formData.employer.trim()) newErrors.employer = 'Employer is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSaving(true);

        try {
            const dataToSend = {
                ...formData,
                user_id: applicant_id
            };

            const response = await createreferee(dataToSend);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: isEditMode ? 'Referee updated successfully' : 'Referee added successfully',
            });
            onSubmit(response.data);
            onClose();

        } catch (error) {
            if (error.response?.status === 422) {
                // Backend validation errors
                setErrors(error.response.data.errors || {});
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to save referee',
                });
            }
        } finally {
            setIsSaving(false);
        }
    };
    const handleUpdateReferee = async (refereeData) => {
        // Similar implementation for update
        // You'll need an updateReferee API function
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditMode ? 'Edit Referee' : 'Add Referee'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={`w-full px-2 py-1 border rounded text-sm ${errors.first_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                            )}
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Middle Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                                className={`w-full px-2 py-1 border rounded text-sm ${errors.middle_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.middle_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.middle_name}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="col-span-2">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={`w-full px-2 py-1 border rounded text-sm ${errors.last_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                            )}
                        </div>
                    </div>

                    {/* Position */}
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 font-bold mb-1">
                            Position <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full px-2 py-1 border rounded text-sm ${errors.position ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.position && (
                            <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                        )}
                    </div>

                    {/* Employer */}
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 font-bold mb-1">
                            Employer <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="employer"
                            value={formData.employer}
                            onChange={handleChange}
                            className={`w-full px-2 py-1 border rounded text-sm ${errors.employer ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.employer && (
                            <p className="text-red-500 text-xs mt-1">{errors.employer}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 font-bold mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-2 py-1 border rounded text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>
                    {/* Phone */}
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 font-bold mb-1">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-2 py-1 border rounded text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="mr-2 py-1 px-4 bg-gray-300 text-gray-700 rounded-full text-sm"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="py-1 px-4 bg-primary text-white rounded-full text-sm"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RefereeModal;