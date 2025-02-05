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
      
        <div className="">
        
        <div ref={cv} id="data" className="px-12 pt-8 pb-12 ">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {candidate.subscription.length < 1 && ( // Render the image only if length is 1 or less
              <div style={{ textAlign: 'center' }}>
                <img
                  src="/logo.png"
                  alt="Watermark"
                  className="opacity-1"
                  style={{ width: '550px', height: '200px' }}
                />
              </div>
            )}
          
         
          
        
        
           </div>
          <div className="flex flex-col items-center justify-center">
  <h1 className="text-2xl font-bold">CURRICULUM VITAE</h1>

  {/* Check if `applicant_profile` exists and has a valid `first_name` */}
  <h1 className="text-xl font-bold mt-3">
    {hideFields.name
      ? " "
      : `${candidate.applicant_profile?.[0]?.first_name || "No Name Provided"} ${candidate.applicant_profile?.[0]?.middle_name || ""} ${candidate.applicant_profile?.[0]?.last_name || ""}`}
  </h1>

  {/* Check if `experience` exists, has at least one item, and the position name is valid */}
  <h1>
    {candidate.experience?.[0]?.position?.position_name || "No Position Available"}
  </h1>
</div>

               <div className="grid grid-cols-12 items-center mt-8">
            <div className="col-span-5">
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
              .filter(Boolean)  // Remove 'false' items from the array
              .map((item, index) => (
                <div className="grid grid-cols-2" key={index}>
                  <div>{item.title}</div>
                  <div>{item.value}</div>
                </div>
              ))}
              
</div>

               <div className="col-span-7 flex justify-end">
  <div>
    {!hideFields.picture && (
      <img
        alt="profile image"
        src={
          candidate.applicant_profile?.[0]?.picture
            ? `https://ekazi.co.tz/${candidate.applicant_profile[0].picture}`
            : "https://ekazi.co.tz/default-placeholder.png"
        }
        className="w-48 h-48 object-cover"
      />
    )}
    
  </div>
</div>

               </div>
           <div className="mt-6">
  <h1 className="font-bold mt-5 mb-1 text-lg">PROFESSIONAL SUMMARY</h1>
  <div className="h-[2px] bg-gray-100 mb-2"></div>
  <p>
    {candidate?.careers?.[0]?.career || "Professional summary not specified"}
  </p>
  <h1 className="font-bold mt-2">Career Objective</h1>
  <p>
    {candidate?.objective?.objective || "Career objective not specified"}
  </p>
</div>

           {experiences?.length > 0 && (
  <div className="mt-6">
    <h1 className="font-bold mt-5 mb-1 text-lg">WORKING EXPERIENCE</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    <div className="space-y-4">
      {experiences.map((item, index) => (
        <div key={index}>
          <div className="flex"></div>
          <div>
            <div>
              <p>
                <span className="font-bold">
                  {item?.employer?.employer_name || "Employer name not specified"}
                </span>
              </p>
              <span className="capitalize">
                {item?.employer?.region?.region_name || "Region not specified"}, {item?.employer?.sub_location || "Sub-location not specified"}
              </span>
            </div>
          </div>
          <ul className="list-disc list-outside ml-5 space-y-2">
            {item?.positions?.map((position, positionIndex) => (
              <li key={positionIndex}>
                <div>
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
                        const isNumbered = /^\d+\./.test(text); // Check if it starts with "1.", "2." etc.
                        
                        return text
                          .split(isNumbered ? /\d+\.\s*/g : /(?<=\.)\s+/g) // Choose splitting method
                          .filter(item => item.trim().length > 0)
                          .map((item, index) => (
                            <li key={index} className="mb-2">{item.trim()}</li>
                          ));
                      })()}
                    </ul>
                  </p>
                  
                  {/* Uncomment and handle null values for these if needed */}
                  {/* <p className="flex">
                    <span className="font-bold mt-3">Responsibilities:</span>
                    <span dangerouslySetInnerHTML={{ __html: position?.responsibility || "Responsibilities not specified" }}></span>
                  </p> */}
                  {/* <p>
                    <span className="font-bold">Reason for leaving:</span> Small pay
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="mt-6">
  <h1 className="font-bold mt-5 mb-1 text-lg">LANGUAGES</h1>
  <div className="h-[2px] bg-gray-100 mb-2"></div>
  <div className="flex space-x-1 flex-wrap">
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

<div className="mt-6">
  <h1 className="font-bold mt-5 mb-1 text-lg">SKILLS</h1>
  <div className="h-[2px] bg-gray-100 mb-2"></div>
  
  <p className="flex space-x-1">
    <span className="font-bold">Culture:</span>
    <div className="flex space-x-1 flex-wrap">
      {candidate?.culture?.length > 0 ? (
        candidate.culture.map((item, index) => (
          <p key={index}>
            {item?.culture?.culture_name || "Culture not specified"}
            {index + 1 !== candidate.culture.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </p>

  <p className="flex space-x-1">
    <span className="font-bold">Personality:</span>
    <div className="flex space-x-1 flex-wrap">
      {candidate?.culture?.length > 0 ? (
        candidate.culture.map((item, index) => (
          <p key={index}>
            {item?.culture?.culture_name || "Personality not specified"}
            {index + 1 !== candidate.culture.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </p>

  <p className="flex space-x-1 flex-wrap">
    <span className="font-bold">Skill & Knowledge:</span>
    <div className="flex space-x-1 flex-wrap">
      {candidate?.knowledge?.length > 0 ? (
        candidate.knowledge.map((item, index) => (
          <p key={index}>
            {item?.knowledge?.knowledge_name || "Skill not specified"}
            {index + 1 !== candidate.knowledge.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </p>

  <p className="flex space-x-1 flex-wrap">
    <span className="font-bold">Software:</span>
    <div className="flex space-x-1 flex-wrap">
      {candidate?.software?.length > 0 ? (
        candidate.software.map((item, index) => (
          <p key={index}>
            {item?.software?.software_name || "Software not specified"}
            {index + 1 !== candidate.software.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </p>

  <p className="flex space-x-1">
    <span className="font-bold">Tools:</span>
    <div className="flex space-x-1 flex-wrap">
      {candidate?.tools?.length > 0 ? (
        candidate.tools.map((item, index) => (
          <p key={index}>
            {item?.tool?.tool_name || "Tool not specified"}
            {index + 1 !== candidate.tools.length && ","}
          </p>
        ))
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  </p>
</div>

          {candidate?.education?.length > 0 && (
  <div className="mt-6">
    <h1 className="font-bold mt-5 mb-1 text-lg">EDUCATION DETAILS</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    {candidate.education.map((item, index) => (
      <div key={index}>
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

{candidate?.proficiency?.length > 0 && (
  <div className="mt-6">
    <h1 className="font-bold mt-5 mb-1 text-lg">PROFICIENCY QUALIFICATION</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    {candidate.proficiency.map((item, index) => (
      <div key={index}>
        <p>
          {moment(item?.started || 'Unknown Start').format("YYYY-MM-DD")}- {moment(item?.ended || 'Present').format("YYYY-MM-DD")}
        </p>
        <p className="flex space-x-2">
          <i>{item?.proficiency?.proficiency_name || "Proficiency not specified"}</i>,{" "}
          <span>{item?.organization?.organization_name || "Organization not specified"}</span>
        </p>
      </div>
    ))}
  </div>
)}
{candidate?.training?.length > 0 && (
  <div className="mt-6">
    <h1 className="font-bold mt-5 mb-1 text-lg">TRAININGS & WORKSHOPS</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    {candidate.training.map((item, index) => (
      <div key={index}>
        <p>
          <span className="font-bold"> {item?.name || "Training not specified"}:</span>{" "}
          {item?.started || "Start date not specified"} -{" "}
          {item?.ended || "End date not specified"}
        </p>
        <p className="flex space-x-2">
   
          <span> {item?.institution || 'Unknown institution'}</span>
        </p>
      </div>
    ))}
  </div>
)}

{candidate?.referees?.length > 0 && !hideFields.referee && ( 
  <div className="mt-6">
    <h1 className="font-bold mt-5 mb-1 text-lg">REFEREES</h1>
    <div className="h-[2px] bg-gray-100 mb-2"></div>
    <div className="space-y-3">
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
        </div>
        
        
    </div> ));
}
 
export default Template1;