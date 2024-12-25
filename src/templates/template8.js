import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';

const Template8 = () => {
 
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
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-md ">
    {/* Header */}
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(46, 88, 166)' }}>CURRICULUM VITAE</h1>
    </div>
    <div className="flex items-center mb-6 mt-4">
      {/* Profile Image or Icon */}
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
        {candidate?.applicant_profile?.[0]?.first_name?.charAt(0).toUpperCase() || 'A'}
        {candidate?.applicant_profile?.[0]?.last_name?.charAt(0).toUpperCase() || 'B'}
      </div>
      
      {/* Name and Contact Details */}
      <div className="ml-4">
        <h1 className="text-2xl font-bold text-blue-900">
          {candidate?.applicant_profile?.[0]?.first_name || 'First Name'} {candidate?.applicant_profile?.[0]?.last_name || 'Last Name'}
        </h1>
        <p className="text-gray-600">
          {candidate?.phone?.phone_number || 'Phone Not Available'} | {candidate?.applicant_profile?.[0]?.email || 'Email Not Available'}
        </p>
        
        {candidate?.address?.length > 0 ? (
          candidate.address.map((item, index) => (
            <p key={index} className="text-gray-600">
              {item?.region_name || 'Region Not Available'}, {item?.name || 'Address Not Available'}
            </p>
          ))
        ) : (
          <p className="text-gray-600">Address Not Available</p>
        )}
      </div>
    </div>
    
    {/* Professional Summary */}
    <div>
      <h1 className="font-bold text-lg mb-1" style={{ color: 'rgb(46, 88, 166)' }}>PROFESSIONAL SUMMARY</h1>
   
      <p className="text-gray-700">{candidate.careers[0]?.career || 'Not Specified'}</p>
    </div>
  
    {/* Content */}
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column */}
      <div className="col-span-4">
        {/* Skills Section */}
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>SKILLS</div>
          
          {/* Culture Section */}
          <h1 className="font-bold mt-2">Culture</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate?.culture?.length > 0 ? (
              candidate.culture.map((item, index) => (
                <li key={index} className="py-0">{item?.culture?.culture_name || 'Culture not specified'}</li>
              ))
            ) : (
              <li className="py-0">No culture information available</li>
            )}
          </ul>
      
          {/* Software Section */}
          <h1 className="font-bold mt-2">Software</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate?.software?.length > 0 ? (
              candidate.software.map((item, index) => (
                <li key={index} className="py-0">{item?.software?.software_name || 'Software not specified'}</li>
              ))
            ) : (
              <li className="py-0">No software information available</li>
            )}
          </ul>
      
          {/* Tools Section */}
          <h1 className="font-bold mt-2">Tools</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate?.tools?.length > 0 ? (
              candidate.tools.map((item, index) => (
                <li key={index} className="py-0">{item?.tool?.tool_name || 'Tool not specified'}</li>
              ))
            ) : (
              <li className="py-0">No tools information available</li>
            )}
          </ul>
      
          {/* Skills & Knowledge Section */}
          <h1 className="font-bold mt-2">Skills & Knowledge</h1>
          <ul className="flex flex-col list-disc list-inside space-x-0">
            {candidate?.knowledge?.length > 0 ? (
              candidate.knowledge.map((item, index) => (
                <li key={index} className="py-0">{item?.knowledge?.knowledge_name || 'Knowledge not specified'}</li>
              ))
            ) : (
              <li className="py-0">No skills & knowledge information available</li>
            )}
          </ul>
        </div>
      
        {/* Languages Section */}
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>LANGUAGES</div>
          <div className="flex flex-wrap mt-2">
            <ul className="flex flex-col list-disc list-inside space-x-0">
              {candidate?.language?.length > 0 ? (
                candidate.language.map((item, index) => (
                  <li key={index} className="py-0">{item?.language?.language_name || 'Language not specified'}</li>
                ))
              ) : (
                <li className="py-0">No language information available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
            
            
            
      
  
      {/* Right Column */}
      <div className="col-span-8">
        {/* Professional Summary Section */}
        <div className="">
            <div className=" py-2  font-bold px-4 mt-5" style={{ color: 'rgb(46, 88, 166)' }}>WORK EXPERIENCE</div>
            {/* Professional Summary Section */}
            <div>
              <div className="py-2 font-bold px-4 mt-5" style={{ color: 'rgb(46, 88, 166)' }}>WORK EXPERIENCE</div>
              {experiences?.length > 0 ? (
                experiences.map((item, index) => (
                  <div key={index} className="flex mb-4">
                    <div className="w-4/12">
                      <div>
                        <span className="capitalize" style={{ color: 'rgb(46, 88, 166)' }}>
                          {item?.employer?.region?.region_name || 'Region not available'}, {item?.employer?.sub_location || 'Sub-location not available'}
                        </span>
                      </div>
                    </div>
            
                    <div className="w-8/12">
                      <div>
                        <p>
                          <span className="font-bold">{item?.employer?.employer_name || 'Employer name not available'}</span>
                        </p>
                      </div>
                      
                      <div className="ml-0 mt-2">
                        {item?.positions?.length > 0 ? (
                          item.positions.map((position, index) => (
                            <div key={index} className="flex space-x-2">
                              <div className="flex flex-col items-center">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <div className="h-16 w-1 bg-gray-200"></div>
                              </div>
                              <div className="py-0 my-0">
                                <p className="text-primary py-0 my-0">{position?.position?.position_name || 'Position name not available'}</p>
                                <i>{position?.employer?.employer_name || 'Employer name not available'}</i>
                                <p>
                                  {new Date(position?.start_date).getFullYear()} -{' '}
                                  {position?.end_date == null ? "Present" : new Date(position?.end_date).getFullYear()}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No positions available</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No work experience available</p>
              )}
            </div>
            
            </div>
  
        {/* Work History Section */}
        <div className="mt-4">
          <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>EDUCATION</div>
          <div className="flex flex-wrap mt-2">
            {candidate?.education?.length > 0 ? (
              candidate.education.map((item, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <span className="font-bold">{item?.course?.course_name || 'Course not available'}</span>
                  </p>
                  <p>
                    <span className="font-bold">{item?.level?.education_level || 'Education level not available'}</span>,
                    <span>{item?.college?.college_name || 'College name not available'}</span>
                  </p>
                  <p>
                    {item?.started ? new Date(item?.started).getFullYear() : 'Start date not available'} - 
                    {item?.ended ? new Date(item?.ended).getFullYear() : 'End date not available'}
                  </p>
                </div>
              ))
            ) : (
              <p>No education information available</p>
            )}
          </div>
        </div>
        
            <div className=" py-2  font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>PROFICIENCY QUALIFICATIONS</div>
            <div>
              {/* Proficiency Section */}
              {candidate?.proficiency?.length > 0 && (
                <div>
                  {candidate.proficiency.map((item, index) => (
                    <div key={index} className="flex mb-4">
                      <div className="w-4/12">
                        <p className="font-bold">
                          {formatDate(item?.started)} - {formatDate(item?.ended)}
                        </p>
                      </div>
                      <div className="w-8/12">
                        <p>
                          <span className="font-bold">{item?.award || 'Award not available'}</span>
                        </p>
                        <p className="text-primary">{item?.organization?.organization_name || 'Organization name not available'}</p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Proficiency:</span>
                          <span>{item?.proficiency?.proficiency_name || 'Proficiency not available'}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            
              {/* Training & Workshops Section */}
              <div className="mt-4">
                <div className="py-2 font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>TRAININGS & WORKSHOPS</div>
                {candidate?.training?.length > 0 ? (
                  candidate.training.map((item, index) => (
                    <div key={index} className="flex mb-4">
                      <div className="w-4/12">
                        <p className="font-bold">
                          {formatDate(item?.started)} - {formatDate(item?.ended)}
                        </p>
                      </div>
                      <div className="w-8/12">
                        <p className="text-primary-500">{item?.institution || 'Institution not available'}</p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Training:</span>
                          <span>{item?.name || 'Training name not available'}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No training information available</p>
                )}
              </div>
            </div>
            
            
      </div>
      
    </div>
  </div>
  <div className=" mt-4 px-12">
    <div className=" py-2  font-bold px-4" style={{ color: 'rgb(46, 88, 166)' }}>REFEREES</div>
    <div className="grid grid-cols-3 mt-2">
  
        {candidate.referees.map((item, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">
              {item?.first_name} {item?.middle_name} {item?.last_name}
            </p>
            <p>{item?.referee_position}</p>
            <p>
              <span className="font-bold">Phone:</span> {item?.phone || 'Phone not available'}
            </p>
            <p>
              <span className="font-bold">Email:</span> {item?.email || 'Email not available'}
            </p>
          </div>
        ))}
     
      
            
         </div>
    </div>
 
  
  
</div>

        
        
    </div> ));
}
 
export default Template8;