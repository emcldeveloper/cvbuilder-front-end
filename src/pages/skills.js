import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Culture from "./culture";
import Personality from "./personalities";
import Knowledge from "./knowledge";
import Software from "./software";
import Tool from "./tool";
import axios from "axios";


const Skills = () => {
  const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
  const { uuid, template } = useParams()
  const [isopenModel, setOpenModel] = useState(false);
  const [isopenEditModel, setOpenEditModel] = useState(false);
  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectpersonalities, setseletedPersonality] = useState([]);
  const [selectedSkill, setSelectedSkills] = useState([])
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [formData, setFormData] = useState({
    personalities: '',
    software: '',
    culture: '',
    skill: '',
    tool: '',


  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentStep(6)
  }, [])
  const openModal = () => {
    setOpenModel(true);
  }
  const CloseModel = () => {
    setOpenEditModel(false);
  }
  const openeditNodel = () => {
    setOpenEditModel(true);
    setFormData(originalDetails);
  }
  console.log('check skill to edit', formData);


  const handlecultureChange = (selectedValues) => {
    console.log('Received Selected Cultures:', selectedValues);
    setSelectedCultures(selectedValues);
  };

  const handlepersonalitiesSelect = (selectedValues) => {

    setseletedPersonality(selectedValues);
  }
  const handleSelectSkill = (skill) => {
    console.log('Received Selected skill:', skill);
    setSelectedSkills(skill)
  }
  const handleselectedSoftware = (software) => {
    console.log('Received Selected software:', software);
    setSelectedSoftware(software)
  }
  const handleSelectedTool = (tool) => {
    console.log('tool received :', tool);
    setSelectedTool(tool)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const softwareData =
      selectedSoftware?.length > 0
        ? selectedSoftware
        : formData.software.map((item) => item.software.id);
    const ToolData =
      selectedTool?.length > 0
        ? selectedTool
        : formData.tools.map((item) => item.tool.id);
    const knowledgeData = selectedSkill?.length > 0
      ? selectedSkill
      : formData.knowledge.map((item) => item.knowledge.id)
    const cultureData = selectedCultures?.length > 0
      ? selectedCultures
      : formData.culture.map((item) => item.culture.id)
    console.log('send data  skills to skills:', cultureData)
    const personalityData = selectpersonalities?.length > 0
      ? selectpersonalities
      : formData.applicant_personality.map((item) => item.personality.id)
    const dataToSend = {
      cultures: cultureData, // or any other data structure your API expects
      skill: knowledgeData,
      personalities: personalityData,
      tool: ToolData,
      software: softwareData,
      user_id: uuid,
    };
    console.log('send data  skills to skills:', personalityData)
    try {

      const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/generalskills`, dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // alert('Referee added successfully!');
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: response.data.success,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }


       window.location.reload(); // Reloads the entire page

      // Handle the response
      //   console.log('Response data:', response.data); // The actual response data from the server
      //   console.log('Status:', response.status); // The HTTP status code
      //  alert('Referee added successfully!'); // Notify the user of success
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('There was an error submitting the form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  };
  const hideculture = (id) => {
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
          console.log('delete culture :', id);
          const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hideculture/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidetool = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will hidde the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hidde it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('delete culture :', id);
          const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hidetool/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidepersonality = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('delete culture :', id);
          const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hidepersonality/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidesoftware= (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('delete culture :', id);
          const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hidesoftware/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hideknowledge= (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('delete culture :', id);
          const response = await axios.post(`https://test.ekazi.co.tz/api/applicant/hideknowledge/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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



  return (originalDetails == null || candidate == null ? <PageLoader />
    : <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Skills</h1>
          <p className="text-lg text-gray-500 mt-2">Add or remove skills here</p>
        </div>
        <div>
          <div className="bg-white rounded-full flex space-x-4">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full">
              Step 6
            </button>
            {/* <button
              className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all"
              onClick={openModal}
            >
              Add skills
            </button> */}
            <button
              className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all"
              onClick={openeditNodel}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
   {/* Culture Section */}
<p className="mt-2">Culture</p>
<div className="flex flex-wrap mt-1">
  {originalDetails?.culture?.map((item) => {
    const cultureName = item?.culture?.culture_name || "Culture name not available";
    return (
      <div className="flex items-center space-x-2 py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all" key={item?.id}>
        <h1>{cultureName}</h1>
        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => {
            hideculture(item?.id);
            console.log('Hide clicked');
          }}
        />
      </div>
    );
  })}
</div>

{/* Tools Section */}
<p className="mt-2">Tools</p>
<div className="flex flex-wrap mt-1">
  {originalDetails?.tools?.map((item) => {
    const toolName = item?.tool?.tool_name || "Tool name not available";
    return (
      <div className="flex space-x-2 items-center py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all" key={item?.id}>
        <h1>{toolName}</h1>
        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => {
            hidetool(item?.id);
          }}
        />
      </div>
    );
  })}
</div>

{/* Personality Section */}
<p className="mt-2">Personality</p>
<div className="flex flex-wrap mt-1">
  {originalDetails?.applicant_personality?.map((item) => {
    const personalityName = item?.personality?.personality_name || "Personality name not available";
    return (
      <div className="py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all" key={item?.id}>
        <h1>{personalityName}</h1>
        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => {
            hidepersonality(item?.id);
            console.log('Hide clicked');
          }}
        />
      </div>
    );
  })}
</div>

{/* Softwares Section */}
<p className="mt-2">Softwares</p>
<div className="flex flex-wrap mt-1">
  {originalDetails?.software?.map((item) => {
    const softwareName = item?.software?.software_name || "Software name not available";
    return (
      <div className="py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all" key={item?.id}>
        <h1>{softwareName}</h1>
        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => {
            hidesoftware(item?.id);
            console.log('Hide clicked');
          }}
        />
      </div>
    );
  })}
</div>

{/* Skills & Knowledge Section */}
<p className="mt-2">Skills & knowledge</p>
<div className="flex flex-wrap mt-1">
  {originalDetails?.knowledge?.map((item) => {
    const knowledgeName = item?.knowledge?.knowledge_name || "Knowledge name not available";
    return (
      <div className="py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all" key={item?.id}>
        <h1>{knowledgeName}</h1>
        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => {
            hideknowledge(item?.id);
            console.log('Hide clicked');
          }}
        />
      </div>
    );
  })}
</div>

      <div className="flex justify-end space-x-2 mt-4 items-center">
        <h1 onClick={() => {
          navigate(-1)
          setCurrentStep(currentStep - 1)
        }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
        <button onClick={() => {
          navigate(`/languages/${uuid}/${template}`)
          setCurrentStep(currentStep + 1)
        }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
      </div>

      
      {isopenEditModel && (
        <div

          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-2 border-b">
              <h5 className="text-sm font-medium">Skills - No best title specified yet</h5> {/* Reduced font size */}
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
                onClick={CloseModel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3">
              <form onSubmit={handleSubmit} className="skill-applicant">
                {/* Culture Field */}
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Culture</label> {/* Reduced font size */}
                  <Culture
                    label="Culture"
                    onChange={handleChange}
                    onSelect={handlecultureChange}
                    initialValue={formData.culture.map((item) => item.culture.id)}
                    onOptionsLoad={(options) => console.log('Loaded Options culture:', options)}
                  />



                </div>

                {/* Personalities Field */}
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Personalities</label> {/* Reduced font size */}
                  <Personality
                    onChange={handleChange}
                    onSelect={handlepersonalitiesSelect}
                    initialValue={formData.applicant_personality.map((item) => item.personality.id)}
                    onOptionsLoad={(options) => console.log('Loaded options personality:', options)}
                  />

                </div>

                {/* Skills & Knowledge Field */}
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Skills & Knowledge</label> {/* Reduced font size */}
                  <Knowledge
                    onChange={handleChange}
                    onSelect={handleSelectSkill}
                    initialValue={formData.knowledge.map((item) => item.knowledge.id)}
                    onOptionsLoad={(options) => console.log('Loaded Options knowledge:', options)}
                  />

                </div>

                {/* Software Field */}
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Software</label> {/* Reduced font size */}
                  <Software
                    name="software_name"
                    onChange={handleChange}
                    onSelect={handleselectedSoftware}
                    initialValue={formData.software.map((item) => item.software.id)}
                    onOptionsLoad={(options) => console.log('Loaded Options software:', options)}
                  />
                </div>

                {/* Tools Field */}
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tools</label> {/* Reduced font size */}
                  {/* <select
                          className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500  text-xs py-[1px] px-2 h-14"  
                          name="tool[]"
                          multiple
                        >
                        
                        
                        </select> */}
                  <Tool
                    onChange={handleChange}
                    onSelect={handleSelectedTool}
                    initialValue={formData.tools.map((item) => item.tool.id)}
                    onOptionsLoad={(options) => console.log('Loaded Options tool:', options)}
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-1 pt-1 border-t">
                  <button
                    type="button"
                    className="py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
                    onClick={CloseModel}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="py-1 px-2 text-xs bg-indigo-500 text-white rounded-sm hover:bg-indigo-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


      )

      }
    </div>);
}

export default Skills;