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
      <div className="px-12 pt-8 pb-12">
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
  
 
    <div className="absolute text-gray-200 opacity-10 text-6xl font-bold">Ekazi</div>
  </div>

  {/* Header Section */}
  <div className="text-center">
    <h1 className="text-3xl font-bold bg-primary py-2 text-white font-bold px-4">
      {candidate?.applicant_profile?.[0]?.first_name || 'First Name Not Available'}{' '}
      {candidate?.applicant_profile?.[0]?.last_name || 'Last Name Not Available'}
    </h1>
  </div>
  

  {/* Two-column Layout */}
  <div className="grid grid-cols-12 gap-6 mt-8">
    {/* Left Column */}
    <div className="col-span-5 space-y-2">
        <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>CONTACT INFORMATION</h1>
       
          
        {[
          { title: 'Location:', value: 'Dar es salaam' },
          { title: 'Phone:', value: candidate?.phone?.phone_number || 'Not specified' },
          { title: 'Nationality:', value: 'Tanzanian' },
          { title: 'Date of birth:', value: candidate?.applicant_profile?.[0]?.dob || 'Not specified' },
          { title: 'Gender:', value: candidate?.applicant_profile?.[0]?.gender_name || 'Not specified' },
          { title: 'Marital status:', value: candidate?.applicant_profile?.[0]?.marital_status || 'Not specified' },
        ].map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-gray-700">{item.title}</div>
            <div className="col-span-2 text-gray-600">{item.value}</div>
          </div>
        ))}
        <div className="mt-6">
          <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>SKILLS</h1>
          <div className="h-[2px] bg-gray-100 mb-2"></div>
          <div className="p-4 rounded-md text-gray-700">
            {/* Culture */}
            <p className="flex space-x-1">
              <span className="font-bold">Culture:</span>
              <div className="flex space-x-1">
                {candidate?.culture?.length > 0 ? (
                  candidate.culture.map((item, index) => (
                    <span key={index}>
                      {item?.culture?.culture_name}
                      {index + 1 !== candidate.culture.length && ','}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Not specified</span>
                )}
              </div>
            </p>
            
            {/* Personality */}
            <p className="flex space-x-1">
              <span className="font-bold">Personality:</span>
              {candidate?.culture?.length > 0 ? (
                candidate.culture.map((item, index) => (
                  <span key={index}>
                    {item?.culture?.culture_name}
                    {index + 1 !== candidate.culture.length && ','}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </p>
        
            {/* Skill & Knowledge */}
            <p className="flex space-x-1 flex-wrap">
              <span className="font-bold">Skill & Knowledge:</span>
              {candidate?.knowledge?.length > 0 ? (
                candidate.knowledge.map((item, index) => (
                  <span key={index}>
                    {item?.knowledge?.knowledge_name}
                    {index + 1 !== candidate.knowledge.length && ','}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </p>
        
            {/* Software */}
            <p className="flex space-x-1 flex-wrap">
              <span className="font-bold">Software:</span>
              {candidate?.software?.length > 0 ? (
                candidate.software.map((item, index) => (
                  <span key={index}>
                    {item?.software?.software_name}
                    {index + 1 !== candidate.software.length && ','}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </p>
        
            {/* Tools */}
            <p className="flex space-x-1">
              <span className="font-bold">Tools:</span>
              {candidate?.tools?.length > 0 ? (
                candidate.tools.map((item, index) => (
                  <span key={index}>
                    {item?.tool?.tool_name}
                    {index + 1 !== candidate.tools.length && ', '}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </p>
          </div>
        </div>
        
      
  
    </div>

    {/* Right Column */}
    <div className="col-span-7 space-y-8 ">
      {/* Personal Information */}
   
      {/* Professional Summary */}
      <div>
        <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>PROFESSIONAL SUMMARY</h1>
        <div className="h-[2px] bg-gray-200 mb-3"></div>
        <p className="text-gray-700">{candidate?.careers?.[0]?.career || 'Not Specified'}</p>
      </div>
      
      {/* Work Experience */}
      {experiences?.length > 0 ? (
        <div>
          <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>WORK EXPERIENCE</h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <div key={index} className="p-2 rounded-md">
                <p className="font-bold text-lg">
                  {item?.employer?.employer_name || 'Employer Not Specified'}
                </p>
                <p className="text-gray-600 capitalize">
                  {item?.employer?.region?.region_name}, {item?.employer?.sub_location || 'Sub-location Not Specified'}
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  {item?.positions?.map((position, posIndex) => (
                    <li key={posIndex}>
                      <p className="font-bold">
                        {position?.position?.position_name || 'Position Not Specified'}
                      </p>
                      <p className="text-gray-600">
                        {position?.start_date ? new Date(position.start_date).getFullYear() : 'Start Year Not Available'} -{' '}
                        {position?.end_date ? new Date(position.end_date).getFullYear() : 'Present'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No work experience available</p>
      )}
      

      {/* Other Sections */}
      {/* Education Details */}
      {candidate?.education?.length > 0 && (
        <div>
          <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>
            EDUCATION DETAILS
          </h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
          <div className="space-y-4">
            {candidate.education.map((item, index) => (
              <div key={index} className="p-4 rounded-md">
                <p className="font-bold">
                  {item?.course?.course_name || 'Course Name Not Specified'}:
                </p>
                <p className="text-gray-700">
                  {item?.started ? new Date(item?.started).getFullYear() : 'Start Year Not Available'} - 
                  {item?.ended ? new Date(item?.ended).getFullYear() : 'End Year Not Available'}
                </p>
                <div className="flex space-x-2 text-gray-700 mt-2">
                  <i>{item?.level?.education_level || 'Education Level Not Specified'}</i>
                  <span>{item?.college?.college_name || 'College Name Not Specified'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Proficiency Qualification */}
      {candidate?.proficiency?.length > 0 && (
        <div className="mt-6">
          {/* Proficiency Qualification Header */}
          <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
            PROFICIENCY QUALIFICATION
          </h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
      
          {/* Proficiency List */}
          <div className="space-y-4">
            {candidate.proficiency.map((item, index) => (
              <div key={index} className="p-4 rounded-md">
                <p className="font-bold">
                  {item?.award || 'Award Not Specified'}:
                </p>
                <p className="text-gray-700">
                  {item?.started ? formatDate(item?.started) : 'Start Date Not Available'} - 
                  {item?.ended ? formatDate(item?.ended) : 'End Date Not Available'}
                </p>
                <div className="flex space-x-2 text-gray-700 mt-2">
                  <i>{item?.proficiency?.proficiency_name || 'Proficiency Name Not Specified'}</i>
                  <p>{item?.organization?.organization_name || 'Organization Name Not Specified'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      
      {/* Language Proficiency */}
      <div className="mt-6">
        <h1 className="font-bold mt-5 mb-1 text-lg" style={{ color: "rgb(46, 88, 166)" }}>
          LANGUAGE PROFICIENCY
        </h1>
        <div className="h-[2px] bg-gray-100 mb-2"></div>
        <div className="flex space-x-1">
          {candidate?.language?.length > 0 ? (
            <div className="mt-6">
              {/* Language List */}
              <div className="p-4 rounded-md text-gray-700">
                {candidate.language.map((item, index) => (
                  <span key={index}>
                    {item?.language?.language_name || 'Language Not Specified'}
                    {index + 1 !== candidate.language.length && ', '}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No languages specified.</p>
          )}
        </div>
      </div>
      
      {/* Referees */}
      {candidate?.referees?.length > 0 && (
        <div className="mt-6">
          {/* Referees Header */}
          <h1 className="font-bold text-lg mb-1" style={{ color: "rgb(46, 88, 166)" }}>
            REFEREES
          </h1>
          <div className="h-[2px] bg-gray-200 mb-3"></div>
      
          {/* Referees List */}
          <div className="space-y-4">
            {candidate.referees.map((referee, index) => (
              <div key={index} className="p-4 rounded-md">
                <p className="text-lg font-bold">
                  {referee?.first_name} {referee?.middle_name} {referee?.last_name || 'No Last Name Provided'}
                </p>
                <p className="text-gray-700">{referee?.referee_position || 'Position Not Specified'}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {referee?.phone || 'Phone Not Provided'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {referee?.email || 'Email Not Provided'}
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