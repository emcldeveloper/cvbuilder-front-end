import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';

const Template4 = () => {
 
  const cv  = useRef()
  const {uuid,template} = useParams()
  const [candidate,setCandidate] = useState(null)
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences,setExperiences] = useState([])

  const isVerified = candidate?.subscription?.verify === 1;
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // 'yyyy-mm-dd'
};
  console.log("checjk verifcation:",isVerified);
  useEffect(() => {
    // Fetch data from the API
    axios.get(`https://test.ekazi.co.tz/api/cv/cv_builder/${uuid}`)
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
                    style={{ width: "550px", height: "200px" 
                  
                  }}
                />
            </div>
          
            )}
           
          <div className="absolute text-gray-200 opacity-10 text-6xl font-bold">
                Ekazi
            </div>
           </div>
           <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-700">
              {candidate.applicant_profile?.[0]?.first_name || "N/A"}
              , {candidate.applicant_profile?.[0]?.last_name || "N/A"}
            </h1>
          </div>
          
          <div className="grid grid-cols-12 items-center mt-8">
            <div className="col-span-5 space-y-4">
              {[
                { title: "Location:", value: "Dar es Salaam" },
                { title: "Phone:", value: candidate.phone?.phone_number || "Not specified" },
                { title: "Email:", value: candidate.applicant_profile?.[0]?.email || "Not specified" },
                { title: "Nationality:", value: "Tanzanian" },
                { title: "Date of birth:", value: candidate.applicant_profile?.[0]?.dob || "Not specified" },
                { title: "Gender:", value: candidate.applicant_profile?.[0]?.gender_name || "Not specified" },
                { title: "Marital status:", value: candidate.applicant_profile?.[0]?.marital_status || "Not specified" },
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div className="font-medium">{item.title}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h1 className="font-bold mt-5 mb-1 text-lg text-blue-700">PROFESSIONAL SUMMARY</h1>
            <div className="h-[2px] bg-gray-100 mb-2"></div>
            <p>
              {candidate?.careers?.[0]?.career || "Not Specified"}
            </p>
            
            <h1 className="font-bold mt-2 text-blue-700">Career Objective</h1>
            <p>
              {candidate?.objective?.objective || "Not Specified"}
            </p>
          </div>
          
          {experiences.length > 0 && (
            <div className="mt-6">
              <h1
                className="font-bold mt-5 mb-1 text-lg"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                WORKING EXPERIENCE
              </h1>
              <div className="h-[2px] bg-gray-100 mb-2"></div>
              <div className="space-y-4">
                {experiences.map((experience, index) => (
                  <div key={index} className="mb-4">
                    {/* Employer Information */}
                    <div>
                      <p>
                        <span className="font-bold text-blue-700">
                          {experience?.employer?.employer_name || "Employer Not Specified"}
                        </span>
                      </p>
                      <span className="capitalize">
                        {experience?.employer?.region?.region_name || "Region Not Specified"}
                        , {experience?.employer?.sub_location || "Location Not Specified"}
                      </span>
                    </div>
          
                    {/* Positions */}
                    <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                      {experience.positions.map((position, posIndex) => (
                        <li key={posIndex}>
                          <div>
                            <p className="font-bold text-orange-600">
                              {position?.position?.position_name || "Position Not Specified"}
                            </p>
                            <i>
                              {position?.employer?.employer_name || "Employer Not Specified"}
                            </i>
                            <p>
                              {position?.start_date
                                ? new Date(position.start_date).getFullYear()
                                : "Start Date Not Specified"}{" "}
                              -{" "}
                              {position?.end_date
                                ? new Date(position.end_date).getFullYear()
                                : "Present"}
                            </p>
                            {/* Uncomment if necessary */}
                            {/* <p className="flex">
                              <span className="font-bold mt-3">Responsibilities:</span>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: position?.responsibility,
                                }}
                              ></span>
                            </p> */}
                            {/* <p>
                              <span className="font-bold">Reason for leaving:</span>{" "}
                              {position.reason_for_leaving || "Not Specified"}
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
            {/* Languages Section */}
            <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
              LANGUAGES
            </h1>
            <div className="h-[2px] bg-gray-100 mb-2"></div>
            <div className="flex flex-wrap space-x-1">
              {candidate.language?.length > 0 ? (
                candidate.language.map((item, index) => (
                  <p key={index}>
                    {item.language?.language_name || "Not Specified"}
                    {index + 1 !== candidate.language.length && ","}
                  </p>
                ))
              ) : (
                <p>No languages specified</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            {/* Skills Section */}
            <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
              SKILLS
            </h1>
            <div className="h-[2px] bg-gray-100 mb-2"></div>
          
            {/* Culture */}
            <p className="flex flex-wrap space-x-1">
              <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Culture:</span>
              {candidate.culture?.length > 0 ? (
                candidate.culture.map((item, index) => (
                  <p key={index}>
                    {item.culture?.culture_name || "Not Specified"}
                    {index + 1 !== candidate.culture.length && ","}
                  </p>
                ))
              ) : (
                <p>No culture specified</p>
              )}
            </p>
          
            {/* Personality */}
            <p className="flex flex-wrap space-x-1">
              <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Personality:</span>
              {candidate.culture?.length > 0 ? (
                candidate.culture.map((item, index) => (
                  <p key={index}>
                    {item.culture?.culture_name || "Not Specified"}
                    {index + 1 !== candidate.culture.length && ","}
                  </p>
                ))
              ) : (
                <p>No personality specified</p>
              )}
            </p>
          
            {/* Skills and Knowledge */}
            <p className="flex flex-wrap space-x-1">
              <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Skill & Knowledge:</span>
              {candidate.knowledge?.length > 0 ? (
                candidate.knowledge.map((item, index) => (
                  <p key={index}>
                    {item.knowledge?.knowledge_name || "Not Specified"}
                    {index + 1 !== candidate.knowledge.length && ","}
                  </p>
                ))
              ) : (
                <p>No skills or knowledge specified</p>
              )}
            </p>
          
            {/* Software */}
            <p className="flex flex-wrap space-x-1">
              <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Software:</span>
              {candidate.software?.length > 0 ? (
                candidate.software.map((item, index) => (
                  <p key={index}>
                    {item.software?.software_name || "Not Specified"}
                    {index + 1 !== candidate.software.length && ","}
                  </p>
                ))
              ) : (
                <p>No software specified</p>
              )}
            </p>
          
            {/* Tools */}
            <p className="flex flex-wrap space-x-1">
              <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Tools:</span>
              {candidate.tools?.length > 0 ? (
                candidate.tools.map((item, index) => (
                  <p key={index}>
                    {item.tool?.tool_name || "Not Specified"}
                    {index + 1 !== candidate.tools.length && ","}
                  </p>
                ))
              ) : (
                <p>No tools specified</p>
              )}
            </p>
          </div>
          
          {/* Education Details */}
          {candidate.education?.length > 0 && (
            <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
                EDUCATION DETAILS
              </h1>
              <div className="h-[2px] bg-gray-100 mb-2"></div>
              {candidate.education.map((item, index) => (
                <div key={index}>
                  <p>
                    <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>
                      {item?.course?.course_name || "Course Not Specified"}:
                    </span>{" "}
                    {item?.started ? new Date(item.started).getFullYear() : "Start Year Not Specified"} -{" "}
                    {item?.ended ? new Date(item.ended).getFullYear() : "End Year Not Specified"}
                  </p>
                  <i>{item?.level?.education_level || "Education Level Not Specified"}</i>,{" "}
                  <span>{item?.college?.college_name || "College Not Specified"}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Proficiency Qualification Section */}
          {candidate.proficiency?.length > 0 && (
            <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
                PROFICIENCY QUALIFICATION
              </h1>
              <div className="h-[2px] bg-gray-100 mb-2"></div>
              {candidate.proficiency.map((item, index) => (
                <div key={index}>
                  <p>
                    <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>
                      {item?.award || "Award Not Specified"}:
                    </span>{" "}
                    {formatDate(item?.started) || "Start Date Not Specified"} -{" "}
                    {formatDate(item?.ended) || "End Date Not Specified"}
                  </p>
                  <p className="flex space-x-2">
                    <i>{item?.proficiency?.proficiency_name || "Proficiency Not Specified"}</i>,{" "}
                    <span>{item?.organization?.organization_name || "Organization Not Specified"}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {/* Referees Section */}
          {candidate.referees?.length > 0 && (
            <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
                REFEREES
              </h1>
              <div className="h-[2px] bg-gray-100 mb-2"></div>
              <div className="space-y-3">
                {candidate.referees.map((item, index) => (
                  <div key={index}>
                    <p style={{ color: "rgb(211, 99, 20)" }}>
                      <span className="font-bold">
                        {`${item?.first_name || "First Name"} ${item?.middle_name || ""} ${item?.last_name || "Last Name"}`}
                      </span>
                    </p>
                    <p>{item?.referee_position || "Position Not Specified"}</p>
                    <p>
                      <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Phone:</span>{" "}
                      {item?.phone || "Phone Not Specified"}
                    </p>
                    <p>
                      <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Email:</span>{" "}
                      {item?.email || "Email Not Specified"}
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
 
export default Template4;