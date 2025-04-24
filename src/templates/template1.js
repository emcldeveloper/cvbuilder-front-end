import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';
import moment from "moment";
import HideInfo from '../layouts/useHideFields';
import { useLocation } from 'react-router-dom';
 
 
import { useHideFields } from '../layouts/HideFieldsContext';


const Template1 = () => {
 
  const cv  = useRef()
  const {uuid,template} = useParams()
  const [candidate,setCandidate] = useState(null)
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences,setExperiences] = useState([])
  // Access hideFields from the navigation state
  const { hideFields } = useHideFields();
  const location = useLocation();

  const isAdminTemplatePath = /^\/Admin\/[^/]+\/[^/]+$/.test(location.pathname);

  const isVerified = candidate?.subscription?.verify === 1;
  console.log("checjk verifcation:",isVerified);
  useEffect(() => {
    // Fetch data from the API
    axios.get(`https://ekazi.co.tz/api/cv/cv_builder/${uuid}`)
      .then((response) => {
        if (response?.data?.data) {
          setCandidate(response.data.data);  // Set the candidate data from the API response
          setShow(true);  // Display the content
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid]);
  
useEffect(()=>{
  if(candidate != null){
     candidate.experience.forEach(item=>{
         if(experiences.filter((e)=>e.employer.id==item.employer.id) == 0){
          item.positions = candidate.experience.filter((ex)=>ex.employer.id==item.employer.id)
            setExperiences([...experiences,item])
         }
     })
  }
},[candidate,experiences])
const processText = (text) => {
  return text
    // Split on multiple sentence separators
    .split(/(?<=[.])|(?=\d+\.)/g)
    // Group items and clean
    .reduce((acc, item) => {
      const trimmed = item.trim();
      if (!trimmed) return acc;
      
      // Check if item starts with number
      if (/^\d+\./.test(trimmed)) {
        acc.push(trimmed);
      } else {
        // Append to previous item if exists
        acc.length > 0 
          ? acc[acc.length - 1] += ` ${trimmed}`
          : acc.push(trimmed);
      }
      return acc;
    }, [])
    // Final cleanup
    .map(item => {
      const cleaned = item
        .replace(/^\d+\.\s*/, '')
        .replace(/([^.])$/, '$1.') // Add period if missing
        .trim();
      
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    })
    .filter(item => item.length > 1);
};

    return ( !show? <PageLoader/>: candidate == null?<div className="flex justify-center items-center">
      <p className="pt-12 text-gray-300">Oops! No Content</p>
    </div> : ( <div  >
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12">
  {/* Watermark */}
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    
        {isAdminTemplatePath && (
          <div className="flex flex-col items-center justify-center mt-10 sm:mt-16 md:mt-20 lg:mt-24">
            <img
              src="/logo.png"
              alt="Watermark"
              className="opacity-1 w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64 h-auto max-w-full"
            />
          </div>
        )}
  
        {!isAdminTemplatePath && candidate.subscription.length < 1 && (
          <div className="flex flex-col items-center justify-center mt-10 sm:mt-16 md:mt-20 lg:mt-24">
            <img
              src="/logo.png"
              alt="Watermark"
              className="opacity-1 w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64 h-auto max-w-full"
            />
          </div>
        )}
   
  </div>
  
  

  {/* Header Section */}
  <div className="flex flex-col items-center justify-center text-center">
    <h1 className="text-xl sm:text-2xl font-bold">CURRICULUM VITAE</h1>
    <h1 className="text-lg sm:text-xl font-bold mt-2">
      {hideFields.name
        ? " "
        : `${candidate.applicant_profile?.[0]?.first_name || "No Name Provided"} ${candidate.applicant_profile?.[0]?.middle_name || ""} ${candidate.applicant_profile?.[0]?.last_name || ""}`}
    </h1>
    <h1 className="text-base sm:text-lg">
      {candidate.experience?.[0]?.position?.position_name || "No Position Available"}
    </h1>
  </div>

  {/* Contact Information Section */}
  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6">
    <div className="col-span-1 sm:col-span-5 break-words">
      {[
        { title: "Location:", value: "Dar es Salaam" },
        !hideFields.phone && { 
          title: "Phone:", 
          value: candidate.phone?.phone_number || "Not specified" 
        },
        !hideFields.email && { 
          title: "Email:", 
          value: candidate.applicant_profile?.[0]?.email || "Email not provided" 
        },
        { title: "Nationality:", value: "Tanzanian" },
        {
          title: "Date of birth:",
          value: candidate.applicant_profile?.[0]?.dob || "Not specified"
        },
        {
          title: "Gender:",
          value: candidate.applicant_profile?.[0]?.gender_name || "Not specified"
        },
      ]
      .filter(Boolean)
      .map((item, index) => (
        <div className="grid grid-cols-2 gap-2" key={index}>
          <div className="font-semibold">{item.title}</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>

    {/* Profile Picture Section */}
    <div className="col-span-1 sm:col-span-7 flex justify-center sm:justify-end">
      {!hideFields.picture && (
        <img
          alt="profile image"
          src={
            candidate.applicant_profile?.[0]?.picture
              ? `https://ekazi.co.tz/${candidate.applicant_profile[0].picture}`
              : "https://ekazi.co.tz/default-placeholder.png"
          }
          className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full"
        />
      )}
    </div>
  </div>

  {/* Professional Summary Section */}
  <div className="mt-6">
    <h1 className="font-bold text-lg sm:text-xl">PROFESSIONAL SUMMARY</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    <p className="text-sm sm:text-base">
      {candidate?.careers?.[0]?.career || "Professional summary not specified"}
    </p>
    <h1 className="font-bold mt-2 text-sm sm:text-base">Career Objective</h1>
    <p className="text-sm sm:text-base">
      {candidate?.objective?.objective || "Career objective not specified"}
    </p>
  </div>

  {/* Working Experience Section */}
  {experiences?.length > 0 && (
    <div className="mt-6">
      <h1 className="font-bold text-lg sm:text-xl">WORKING EXPERIENCE</h1>
      <div className="h-[2px] bg-gray-100 mb-2"></div>
      <div className="space-y-4">
        {experiences.map((item, index) => (
          <div key={index}>
            <div>
              <p className="font-bold text-sm sm:text-base">
                {item?.employer?.employer_name || "Employer name not specified"}
              </p>
              <span className="capitalize text-sm sm:text-base">
                {item?.employer?.region?.region_name || "Region not specified"}, {item?.employer?.sub_location || "Sub-location not specified"}
              </span>
            </div>
            <ul className="list-disc list-outside ml-5 space-y-2">
              {item?.positions?.map((position, positionIndex) => (
                <li key={positionIndex} className="text-sm sm:text-base">
                  <p className="font-bold">
                    {position?.position?.position_name || "Position not specified"}
                  </p>
                  <p>
                    {position?.start_date
                      ? `${new Date(position.start_date).getFullYear()}-${(new Date(position.start_date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(position.start_date).getDate().toString().padStart(2, '0')}`
                      : "Start date not specified"}{" "}
                    -{" "}
                    {position?.end_date
                      ? `${new Date(position.end_date).getFullYear()}-${(new Date(position.end_date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(position.end_date).getDate().toString().padStart(2, '0')}`
                      : "Present"}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Responsibilities: </span>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      {(() => {
                        const text = position.responsibility.trim();
                        const isNumbered = /^\d+\./.test(text);
                        return text
                          .split(isNumbered ? /\d+\.\s*/g : /(?<=\.)\s+/g)
                          .filter(item => item.trim().length > 0)
                          .map((item, index) => (
                            <li key={index} className="mb-2">{item.trim()}</li>
                          ));
                      })()}
                    </ul>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Languages Section */}
  <div className="mt-6">
    <h1 className="font-bold text-lg sm:text-xl">LANGUAGES</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    <div className="flex flex-wrap gap-2 text-sm sm:text-base">
      {candidate?.language?.length > 0 ? (
        candidate.language.map((item, index) => (
          <p key={index}>
            {item?.language?.language_name || "Language not specified"}
            {index + 1 !== candidate.language.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </div>

  {/* Skills Section */}
  <div className="mt-6">
    <h1 className="font-bold text-lg sm:text-xl">SKILLS</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    <div className="space-y-2 text-sm sm:text-base">
      <p>
        <span className="font-bold">Culture:</span>{" "}
        {candidate?.culture?.map((item, index) => (
          <span key={index}>
            {item?.culture?.culture_name || "Culture not specified"}
            {index + 1 !== candidate.culture.length && ", "}
          </span>
        ))}
      </p>
      <p>
        <span className="font-bold">Personality:</span>{" "}
        {candidate?.culture?.map((item, index) => (
          <span key={index}>
            {item?.culture?.culture_name || "Personality not specified"}
            {index + 1 !== candidate.culture.length && ", "}
          </span>
        ))}
      </p>
      <p>
        <span className="font-bold">Skill & Knowledge:</span>{" "}
        {candidate?.knowledge?.map((item, index) => (
          <span key={index}>
            {item?.knowledge?.knowledge_name || "Skill not specified"}
            {index + 1 !== candidate.knowledge.length && ", "}
          </span>
        ))}
      </p>
      <p>
        <span className="font-bold">Software:</span>{" "}
        {candidate?.software?.map((item, index) => (
          <span key={index}>
            {item?.software?.software_name || "Software not specified"}
            {index + 1 !== candidate.software.length && ", "}
          </span>
        ))}
      </p>
      <p>
        <span className="font-bold">Tools:</span>{" "}
        {candidate?.tools?.map((item, index) => (
          <span key={index}>
            {item?.tool?.tool_name || "Tool not specified"}
            {index + 1 !== candidate.tools.length && ", "}
          </span>
        ))}
      </p>
    </div>
  </div>

  {/* Education Section */}
  {candidate?.education?.length > 0 && (
    <div className="mt-6">
      <h1 className="font-bold text-lg sm:text-xl">EDUCATION DETAILS</h1>
      <div className="h-[2px] bg-gray-100 mb-2"></div>
      {candidate.education.map((item, index) => (
        <div key={index} className="text-sm sm:text-base">
          <p>
            <span className="font-bold">
              {item?.course?.course_name || "Course not specified"}:
            </span>{" "}
            {item?.started
              ? new Date(item.started).getFullYear()
              : "Start date not specified"}{" "}
            -{" "}
            {item?.ended
              ? new Date(item.ended).getFullYear()
              : "End date not specified"}
          </p>
          <i>{item?.level?.education_level || "Level not specified"}</i>,{" "}
          <span>{item?.college?.college_name || "College not specified"}</span>
        </div>
      ))}
    </div>
  )}

  {/* Referees Section */}
  {candidate?.referees?.length > 0 && !hideFields.referee && (
    <div className="mt-6">
      <h1 className="font-bold text-lg sm:text-xl">REFEREES</h1>
      <div className="h-[2px] bg-gray-100 mb-2"></div>
      <div className="space-y-3 text-sm sm:text-base">
        {candidate.referees.map((item, index) => (
          <div key={index}>
            <p>
              <span className="font-bold">
                {item?.first_name || "First name not specified"}{" "}
                {item?.middle_name || ""} {item?.last_name || ""}
              </span>
            </p>
            <p>{item?.referee_position || "Position not specified"}</p>
            <p>
              <span className="font-bold">Phone:</span>{" "}
              {item?.phone || "Phone not specified"}
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              {item?.email || "Email not specified"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
        
    </div> ));
}
 
export default Template1;