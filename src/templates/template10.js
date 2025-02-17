import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';

const Template10 = () => {
 
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
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-md ">
    {/* Header */}
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(46, 88, 166)' }}>CURRICULUM VITAE</h1>
    </div>

   <div className=" p-8 rounded-lg  mt-6 mb-6">
  <div className="flex">
    {/* Profile Image */}
    <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold">
      <img
      alt={candidate.applicant_profile?.[0]?.picture ? "Profile image" : "Default profile image"}
      src={
        candidate.applicant_profile?.[0]?.picture
          ? `https://ekazi.co.tz/${candidate.applicant_profile[0].picture}`
          : "/default-profile.png" // Fallback image in case of missing profile picture
      }
      className="w-48 h-48 object-cover rounded-full border-2 border-gray-300"
    />
    
    </div>
    
    {/* Name and Contact Details */}
    <div className="ml-8 flex-grow">
      <h1 className="text-4xl font-bold text-blue-900">
        {candidate.applicant_profile[0]?.first_name} {candidate.applicant_profile[0]?.last_name}
      </h1>
      
      <p className="text-gray-600 text-lg mt-2">
        📞 {candidate.phone?.phone_number || "Not available"}
      </p>
      
      <p className="text-gray-600 text-lg">
        ✉️ {candidate.applicant_profile[0]?.email || "Not provided"}
      </p>
    
      <div className="mt-2">
        {candidate.address?.length > 0 ? (
          candidate.address.map((item, index) => (
            <p key={index} className="text-gray-600 text-md">
              📍 {item.region_name ? item.region_name : 'Region not specified'}, {item.name ? item.name : 'Location not specified'}
            </p>
            
          ))
        ) : (
          <p className="text-gray-600 text-md">Address information not available</p>
        )}
      </div>
    </div>
    
  </div>
</div>

    {/* Professional Summary */}
   
  
    {/* Content */}
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column */}
      <div className="col-span-4">
        {/* Skills Section */}
             
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>
            SKILLS
          </div>
        
          <h1 className="font-bold mt-2">Culture</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate.culture?.length > 0 ? (
              candidate.culture.map((item, index) => (
                <li key={index} className="py-0">
                  {item.culture?.culture_name || 'No culture specified'}
                </li>
              ))
            ) : (
              <li className="py-0">No culture skills available</li>
            )}
          </ul>
        
          <h1 className="font-bold mt-2">Software</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate.software?.length > 0 ? (
              candidate.software.map((item, index) => (
                <li key={index} className="py-0">
                  {item.software?.software_name || 'No software specified'}
                </li>
              ))
            ) : (
              <li className="py-0">No software skills available</li>
            )}
          </ul>
        
          <h1 className="font-bold mt-2">Tools</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate.tools?.length > 0 ? (
              candidate.tools.map((item, index) => (
                <li key={index} className="py-0">
                  {item.tool?.tool_name || 'No tools specified'}
                </li>
              ))
            ) : (
              <li className="py-0">No tools skills available</li>
            )}
          </ul>
        
          <h1 className="font-bold mt-2">Skills & Knowledge</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate.knowledge?.length > 0 ? (
              candidate.knowledge.map((item, index) => (
                <li key={index} className="py-0">
                  {item.knowledge?.knowledge_name || 'No knowledge specified'}
                </li>
              ))
            ) : (
              <li className="py-0">No skills & knowledge available</li>
            )}
          </ul>
        </div>
        
  
        {/* Education Section */}
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>
            LANGUAGES
          </div>
          <div className="flex flex-wrap mt-2">
            <ul className="flex flex-col list-disc list-inside space-x-0">
              {candidate.language?.length > 0 ? (
                candidate.language.map((item, index) => (
                  <li key={index} className="py-0">
                    {item.language?.language_name || 'No language specified'}
                  </li>
                ))
              ) : (
                <li className="py-0">No languages available</li>
              )}
            </ul>
          </div>
        </div>
        
           
            </div>
        
         
            
            
            
      
  
      {/* Right Column */}
      <div className="col-span-8 mt-5">
        {/* Professional Summary Section */}
        <div>
          <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>
            PROFESSIONAL SUMMARY
          </h1>
          <p className="text-gray-700">
            {candidate.careers[0]?.career || 'Not Specified'}
          </p>
        </div>
      
        {/* Work Experience Section */}
        <div className="py-2 font-bold px-4 mt-5" style={{ color: 'rgb(46, 88, 166)' }}>
          WORK EXPERIENCE
        </div>
        {
          experiences.map((item, index) => {
            const region = item.employer?.region?.region_name || 'Region not specified';
            const subLocation = item.employer?.sub_location || 'Location not specified';
            const employerName = item.employer?.employer_name || 'Employer not specified';
            return (
              <div key={index} className="flex mb-4">
                <div className="w-4/12">
                  <div className="">
                    <span className="capitalize" style={{ color: 'rgb(46, 88, 166)' }}>
                      {region}, {subLocation}
                    </span>
                  </div>
                </div>
                <div className="w-8/12">
                  <div className="">
                    <p>
                      <span className="font-bold">{employerName}</span>
                    </p>
                  </div>
                  <div className="ml-0 mt-2">
                    {item.positions.map((position, positionIndex) => {
                      const positionName = position.position?.position_name || 'Position not specified';
                      const startDate = new Date(position.start_date);
                      const endDate = position.end_date ? new Date(position.end_date) : 'Present';
                      return (
                        <div key={positionIndex} className="flex space-x-2 mb-2">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <div className="h-16 w-1 bg-gray-200"></div>
                          </div>
                          <div className="py-0 my-0">
                            <p className="text-primary py-0 my-0">{positionName}</p>
                            <i>{employerName}</i>
                            <p>
                              {startDate.getFullYear()} - {endDate === 'Present' ? endDate : endDate.getFullYear()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        }
        
      
        {/* Education Section */}
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>EDUCATION</div>
          <div className="flex flex-wrap mt-2">
            {candidate.education.length > 0 ? (
              candidate.education.map((item, index) => {
                const courseName = item.course?.course_name || 'Course not specified';
                const educationLevel = item.level?.education_level || 'Level not specified';
                const collegeName = item.college?.college_name || 'College not specified';
                const startYear = new Date(item.started).getFullYear();
                const endYear = item.ended ? new Date(item.ended).getFullYear() : 'Present';
        
                return (
                  <div key={index} className="mb-4">
                    <p><span className="font-bold">{courseName}</span></p>
                    <p><span className="font-bold">{educationLevel}</span>, <span>{collegeName}</span></p>
                    <p>{startYear} - {endYear}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">No education data available.</p>
            )}
          </div>
        </div>
        
        {/* Proficiency Qualifications Section */}
        <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>
          PROFICIENCY QUALIFICATIONS
        </div>
        {candidate.proficiency && candidate.proficiency.length > 0 ? (
          candidate.proficiency.map((item, index) => (
            <div key={index} className="flex">
              <div className="w-4/12">
                <p className="font-bold">
                  {formatDate(item.started)} - {formatDate(item.ended)}
                </p>
              </div>
              <div className="w-8/12">
                <p>
                  <span className="font-bold">{item.award}</span>
                </p>
                <p className="text-primary">{item.organization.organization_name}</p>
                <p className="flex space-x-2">
                  <span className="font-bold">Proficiency:</span>
                  <span>{item.proficiency.proficiency_name}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No proficiency qualifications available.</p>
        )}
      
        {/* Trainings & Workshops Section */}
        <div className="mt-4">
          <div className="py-2 text-white font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>
            TRAININGS & WORKSHOPS
          </div>
          {candidate.training && candidate.training.length > 0 ? (
            candidate.training.map((item, index) => (
              <div key={index} className="flex">
                <div className="w-4/12">
                  <p className="font-bold">
                    {formatDate(item.started)} - {formatDate(item.ended)}
                  </p>
                </div>
                <div className="w-8/12">
                  <p className="text-primary-500">{item.institution}</p>
                  <p className="flex space-x-2">
                    <span className="font-bold">Training:</span>
                    <span>{item.name}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No training or workshops available.</p>
          )}
        </div>
      </div>
      
    </div>
  </div>
  <div className="mt-4 px-12">
    <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>
      REFEREES
    </div>
    <div className="grid grid-cols-3 mt-2">
      {candidate.referees && candidate.referees.length > 0 ? (
        candidate.referees.map((item, index) => (
          <div key={index} className="mb-4">
            <p>
              <span className="font-bold">
                {item.first_name} {item.middle_name} {item.last_name}
              </span>
            </p>
            <p>{item.referee_position || 'Position not specified'}</p>
            <p>
              <span className="font-bold">Phone:</span> {item.phone || 'Not provided'}
            </p>
            <p>
              <span className="font-bold">Email:</span> {item.email || 'Not provided'}
            </p>
          </div>
        ))
      ) : (
        <p>No referees available.</p>
      )}
    </div>
  </div>
  
  
  
</div>

        
        
    </div> ));
}
 
export default Template10;