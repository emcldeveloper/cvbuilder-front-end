import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';

const Template4 = ({id}) => {
 
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
    axios.get(`https://test.ekazi.co.tz/api/applicant/MyCvView/${uuid}/${id}`)
      .then((response) => {
        if (response?.data?.data) {
          setCandidate(response.data.data);  // Set the candidate data from the API response
          setShow(true);  // Display the content
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid,id]);
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
      <div className="px-12 pt-8 pb-12">
  {/* Watermark */}
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    {isVerified !== 1 && (
      <div style={{ textAlign: 'center' }}>
        <img
          src="/logo.png"
          alt="Watermark"
          className="opacity-1"
          style={{ width: '550px', height: '200px' }}
        />
      </div>
    )}
    <div className="absolute text-gray-200 opacity-10 text-6xl font-bold">Ekazi</div>
  </div>

  {/* Header Section */}
  <div className="text-center">
    <h1 className="text-3xl font-bold bg-primary py-2 text-white font-bold px-4"  >
      {candidate.applicant_profile[0]?.first_name} {candidate.applicant_profile[0]?.last_name}
    </h1>
  </div>

  {/* Two-column Layout */}
  <div className="grid grid-cols-12 gap-6 mt-8">
    {/* Left Column */}
    <div className="col-span-7 space-y-8">
      {/* Work Experience */}
      {experiences.length > 0 && (
        <div>
          <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>WORK EXPERIENCE</h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <div key={index} className="p-2  rounded-md">
                <p className="font-bold text-lg"  >
                  {item.employer.employer_name}
                </p>
                <p className="text-gray-600 capitalize">
                  {item.employer.region.region_name}, {item.employer.sub_location}
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  {item.positions.map((position, posIndex) => (
                    <li key={posIndex}>
                      <p className="font-bold"  >
                        {position.position?.position_name}
                      </p>
                      <p className="text-gray-600">
                        {new Date(position?.start_date).getFullYear()} -{' '}
                        {position?.end_date ? new Date(position?.end_date).getFullYear() : 'Present'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Sections */}
      {candidate.education.length > 0 && (
        <div>
          <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>EDUCATION DETAILS</h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
          <div className="space-y-4">
            {candidate.education.map((item, index) => (
              <div key={index} className="p-4  rounded-md">
                <p className="font-bold"  >
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
      {/* Add more sections like Skills, Referees, etc. */}
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
              <div key={index} className="p-4  rounded-md ">
                <p className="font-bold" >
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
      
      
  
    </div>

    {/* Right Column */}
    <div className="col-span-5 space-y-8 ">
      {/* Personal Information */}
      <div className="space-y-4">
        {/* Profile Image Section */}
       <div className="flex-shrink-0">
    <img 
      alt="profile image" 
      src={`https://test.ekazi.co.tz/${candidate.applicant_profile[0].picture}`}
      className="w-48 h-48 object-cover rounded-full border-2 border-gray-300"
    />
  </div>
        <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>PERSONAL INFORMATION</h1>
        {[
          { title: 'Location:', value: 'Dar es salaam' },
          { title: 'Phone:', value: candidate.phone?.phone_number || 'Not specified' },
          { title: 'Email:', value: candidate.applicant_profile[0]?.email },
          { title: 'Nationality:', value: 'Tanzanian' },
          { title: 'Date of birth:', value: candidate.applicant_profile[0]?.dob || 'Not specified' },
          { title: 'Gender:', value: candidate.applicant_profile[0]?.gender_name || 'Not specified' },
          { title: 'Marital status:', value: candidate.applicant_profile[0]?.marital_status || 'Not specified' },
        ].map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-gray-700">{item.title}</div>
            <div className="col-span-2 text-gray-600">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Professional Summary */}
      <div>
        <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>PROFESSIONAL SUMMARY</h1>
        <div className="h-[2px] bg-gray-200 mb-3"></div>
        <p className="text-gray-700">{candidate.careers[0]?.career || 'Not Specified'}</p>
      </div>

      {/* Career Objective */}
      <div>
        <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>CAREER OBJECTIVE</h1>
        <div className="h-[2px] bg-gray-200 mb-3"></div>
        <p className="text-gray-700">{candidate.objective?.objective || 'Not Specified'}</p>
      </div>
      <div className="mt-6">
        <h1 className="font-bold mt-5 mb-1 text-lg"  style={{ color: "rgb(46, 88, 166)" }}>SKILLS</h1>
         <div className="h-[2px] bg-gray-100 mb-2 "></div>
         <div className="p-4  rounded-md  text-gray-700">
         <p className="flex space-x-1"><span className="font-bold" >Culture:</span> <div className="flex space-x-1">
         {candidate.culture.map((item,index)=>{
          return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
         </p>
         })}
         </div></p>
         <p className="flex space-x-1"><span className="font-bold" >Pasonality:</span>
         {candidate.culture.map((item,index)=>{
          return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
         </p>
         })}</p>
         <p className="flex space-x-1 flex-wrap" ><span className="font-bold " >Skill & Knowledge:</span> 
         {candidate.knowledge.map((item,index)=>{
          return <p className=""> {item.knowledge?.knowledge_name}{index+1 != candidate.knowledge.length &&','}
         </p>
         })}</p>
         <p className="flex space-x-1 flex-wrap"><span className="font-bold " >Software: </span> 
         {candidate.software.map((item,index)=>{
          return <p className=""> {item.software?.software_name}{index+1 != candidate.software.length &&','}
         </p>
         })}</p>
         <p className="flex space-x-1">
          <span className="font-bold" >Tools:</span>
          {candidate.tools.map((item, index) => (
            <span key={index} className="text-gray-700">
              {item.tool?.tool_name}
              {index + 1 !== candidate.tools.length && ', '}
            </span>
          ))}
        </p>
      </div>
        </div>
        <div className="mt-6">
            <h1 className="font-bold mt-5 mb-1 text-lg"  style={{ color: "rgb(46, 88, 166)" }}> LANGUAGE PROFICIENCY</h1>
             <div className="h-[2px] bg-gray-100 mb-2 "></div>
             <div className="flex space-x-1">
              {candidate.language.length > 0 && (
                  <div className="mt-6">
                    
                   
                    
                
                    {/* Language List */}
                    <div className="p-4  rounded-md  text-gray-700">
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
                      <div key={index} className="p-4  rounded-md ">
                        <p className="text-lg font-bold" >
                          {referee?.first_name} {referee?.middle_name} {referee?.last_name}
                        </p>
                        <p className="text-gray-700">{referee.referee_position}</p>
                        <p className="text-gray-700">
                          <span className="font-semibold" >Phone:</span> {referee?.phone}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold" >Email:</span> {referee?.email}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
    </div>
    
  </div>
  
</div>

        
        
    </div> ));
}
 
export default Template4;