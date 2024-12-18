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
               <h1 className="text-3xl font-bold" style={{ color: "rgb(46, 88, 166)" }}>{candidate.applicant_profile[0]?.first_name},{candidate.applicant_profile[0]?.last_name}</h1>
 
               </div>
               <div className="grid grid-cols-12 gap-6 items-start mt-8">
                {/* Profile Image Section */}
                <div className="col-span-5 flex justify-center">
                  <img 
                    alt="profile image" 
                    src={`https://test.ekazi.co.tz/${candidate.applicant_profile[0].picture}`}
                    className="w-48 h-48 object-cover rounded-full border-2 border-gray-300"
                  />
                </div>
              
                {/* Candidate Information Section */}
                <div className="col-span-7 space-y-4">
                  {[
                    { title: "Location:", value: "Dar es salaam" },
                    { title: "Phone:", value: candidate.phone?.phone_number || "Not specified" },
                    { title: "Email:", value: candidate.applicant_profile[0].email },
                    { title: "Nationality:", value: "Tanzanian" },
                    { title: "Date of birth:", value: candidate.applicant_profile[0]?.dob || "Not specified" },
                    { title: "Gender:", value: candidate.applicant_profile[0]?.gender_name || "Not specified" },
                    { title: "Marital status:", value: candidate.applicant_profile[0]?.marital_status || "Not specified" },
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="font-semibold text-gray-700">{item.title}</div>
                      <div className="col-span-2 text-gray-600">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                {/* Professional Summary Section */}
                <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                  PROFESSIONAL SUMMARY
                </h1>
                <div className="h-[2px] bg-gray-200 mb-3"></div>
                <p className="text-gray-700 mb-4">
                  {candidate.careers[0]?.career || "Not Specified"}
                </p>
              
                {/* Career Objective Section */}
                <h1 className="font-bold text-lg mt-4 mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                  Career Objective
                </h1>
                <div className="h-[2px] bg-gray-200 mb-3"></div>
                <p className="text-gray-700">
                  {candidate.objective?.objective || "Not Specified"}
                </p>
              </div>
              
              {experiences.length > 0 && (
                <div className="mt-6">
                  {/* Work Experience Header */}
                  <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                    WORK EXPERIENCE
                  </h1>
                  <div className="h-[2px] bg-gray-200 mb-3"></div>
              
                  {/* Experience Items */}
                  <div className="space-y-6">
                    {experiences.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-md ">
                        {/* Employer and Location */}
                        <div className="mb-2">
                          <p className="font-bold text-lg" style={{ color: "rgb(46, 88, 166)" }}>
                            {item.employer.employer_name}
                          </p>
                          <p className="text-gray-600 capitalize">
                            {item.employer.region.region_name}, {item.employer.sub_location}
                          </p>
                        </div>
              
                        {/* Positions List */}
                        <ul className="list-disc list-outside ml-5 space-y-3">
                          {item.positions.map((position, posIndex) => (
                            <li key={posIndex}>
                              <div className="space-y-1">
                                {/* Position Title and Employer */}
                                <p className="font-bold " style={{ color: "rgb(211, 99, 20)" }}>
                                  {position.position?.position_name}
                                </p>
                                <i className="text-gray-700">{position.employer?.employer_name}</i>
              
                                {/* Dates */}
                                <p className="text-gray-600">
                                  {new Date(position?.start_date).getFullYear()} -{" "}
                                  {position?.end_date ? new Date(position?.end_date).getFullYear() : "Present"}
                                </p>
              
                                {/* Additional Details */}
                                {/* Uncomment below if Responsibilities or Reasons are needed */}
                                {/* <p className="mt-2">
                                  <span className="font-semibold">Responsibilities: </span>
                                  <span dangerouslySetInnerHTML={{ __html: position.responsibility }}></span>
                                </p>
                                <p>
                                  <span className="font-semibold">Reason for leaving: </span> Small pay
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
              <h1 className="font-bold mt-5 mb-1 text-lg"  style={{ color: "rgb(46, 88, 166)" }}> LANGUAGE PROFICIENCY</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <div className="flex space-x-1">
                {candidate.language.length > 0 && (
                    <div className="mt-6">
                      
                     
                      
                  
                      {/* Language List */}
                      <div className="p-4 bg-gray-50 rounded-md  text-gray-700">
                        {candidate.language.map((item, index) => (
                          <span key={index}>
                            {item.language?.language_name}
                            {index + 1 !== candidate.language.length && ', '}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
               </div>
              </div>
              <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg"  style={{ color: "rgb(46, 88, 166)" }}>SKILLS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <div className="p-4 bg-gray-50 rounded-md  text-gray-700">
               <p className="flex space-x-1"><span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Culture:</span> <div className="flex space-x-1">
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}
               </div></p>
               <p className="flex space-x-1"><span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Pasonality:</span>
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap" ><span className="font-bold " style={{ color: "rgb(211, 99, 20)" }}>Skill & Knowledge:</span> 
               {candidate.knowledge.map((item,index)=>{
                return <p className=""> {item.knowledge?.knowledge_name}{index+1 != candidate.knowledge.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap"><span className="font-bold " style={{ color: "rgb(211, 99, 20)" }}>Software: </span> 
               {candidate.software.map((item,index)=>{
                return <p className=""> {item.software?.software_name}{index+1 != candidate.software.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1">
                <span className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>Tools:</span>
                {candidate.tools.map((item, index) => (
                  <span key={index} className="text-gray-700">
                    {item.tool?.tool_name}
                    {index + 1 !== candidate.tools.length && ', '}
                  </span>
                ))}
              </p>
            </div>
              </div>
              {candidate.education.length > 0 && (
                <div className="mt-6">
                  {/* Education Details Header */}
                  <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                    EDUCATION DETAILS
                  </h1>
                  <div className="h-[2px] bg-gray-200 mb-3"></div>
              
                  {/* Education List */}
                  <div className="space-y-4">
                    {candidate.education.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-md ">
                        <p className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>
                          {item?.course.course_name}:
                        </p>
                        <p className="text-gray-700">
                          {new Date(item?.started).getFullYear()} - {new Date(item?.ended).getFullYear()}
                        </p>
                        <div className="flex space-x-2 text-gray-700 mt-2">
                          <i>{item?.level.education_level}</i>
                          <span>{item?.college.college_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {candidate.proficiency.length > 0 && (
                <div className="mt-6">
                  {/* Proficiency Qualification Header */}
                  <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                    PROFICIENCY QUALIFICATION
                  </h1>
                  <div className="h-[2px] bg-gray-200 mb-3"></div>
              
                  {/* Proficiency List */}
                  <div className="space-y-4">
                    {candidate.proficiency.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-md ">
                        <p className="font-bold" style={{ color: "rgb(211, 99, 20)" }}>
                          {item?.award}:
                        </p>
                        <p className="text-gray-700">
                          {formatDate(item?.started)} - {formatDate(item?.ended)}
                        </p>
                        <div className="flex space-x-2 text-gray-700 mt-2">
                          <i>{item.proficiency?.proficiency_name}</i>
                          <p>{item.organization?.organization_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              
              {candidate.referees.length > 0 && (
                <div className="mt-6">
                  {/* Referees Header */}
                  <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
                    REFEREES
                  </h1>
                  <div className="h-[2px] bg-gray-200 mb-3"></div>
              
                  {/* Referees List */}
                  <div className="space-y-4">
                    {candidate.referees.map((referee, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-md ">
                        <p className="text-lg font-bold" style={{ color: "rgb(211, 99, 20)" }}>
                          {referee?.first_name} {referee?.middle_name} {referee?.last_name}
                        </p>
                        <p className="text-gray-700">{referee.referee_position}</p>
                        <p className="text-gray-700">
                          <span className="font-semibold" style={{ color: "rgb(211, 99, 20)" }}>Phone:</span> {referee?.phone}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold" style={{ color: "rgb(211, 99, 20)" }}>Email:</span> {referee?.email}
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