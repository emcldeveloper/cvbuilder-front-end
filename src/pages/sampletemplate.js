import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import React from "react";

const SampleTemplate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const { currentStep, setCurrentStep } = useContext(StepsContext);
    const navigate = useNavigate();
    const { uuid } = useParams();

    const templates = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `Template ${index + 1}`,
        image: `/cv${index + 1}.png`, // Dynamically set image path
        component: React.createElement(
            [Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9, Template10][index]
        ),
    }));

    useEffect(() => {
        setCurrentStep(0);
    }, [setCurrentStep]);

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        setShowPreview(true); // Show preview and move it to the top
    };

    const goBackToTemplates = () => {
        setShowPreview(false); // Return to template list
    };

    return (
        <div className="p-6">
            <h1 className="font-bold text-3xl mb-6">Select Your CV Template</h1>

            {showPreview && selectedTemplate ? (
                <div>
                    <div className="mb-6">
                        <h2 className="font-bold text-xl mb-4">Preview Selected Template</h2>
                        <div className="border p-4 rounded-md bg-gray-50">
                            {templates.find((template) => template.id === selectedTemplate)?.component}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={goBackToTemplates}
                            className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            Back to Templates
                        </button>
                        <button
                            onClick={() => {
                                console.log("Selected Template:", selectedTemplate);
                                navigate(`/${uuid}/${selectedTemplate}`); // Example route for next step
                            }}
                            className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`p-4 border rounded-md cursor-pointer ${
                                selectedTemplate === template.id ? "border-blue-500 bg-blue-100" : "border-gray-300"
                            }`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <div className="h-40 w-full overflow-hidden flex justify-center items-center bg-gray-100 rounded-md">
                                {/* Image preview */}
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="h-full object-contain rounded-md"
                                />
                            </div>
                            <h2 className="text-center font-semibold mt-2">{template.name}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SampleTemplate;
