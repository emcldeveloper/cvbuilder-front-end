import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import axios from 'axios';
const Template3 = () => {
    const cv  = useRef()
    const {uuid,template} = useParams()
    const [candidate,setCandidate] = useState(null)
    const [show, setShow] = useState(false);
    const [pages, setPages] = useState(false);
    const [experiences,setExperiences] = useState([])
  
    
   
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
    return (show&& <div>
      <div id="data" className="bg-primary py-4">
        <div className="grid grid-cols-12 gap-4 px-12 items-center">
          
          <div className="col-span-4 flex">
            {/* Profile image with fallback if picture is missing */}
            <img 
              alt="profile image" 
              src={`https://test.ekazi.co.tz/${candidate?.applicant_profile?.[0]?.picture || 'default-profile.jpg'}`}
              className="w-48 h-48 object-cover rounded-full"
            />
          </div>
          
          <div className="col-span-8">
            {/* First name with fallback */}
            <h1 className="text-3xl font-bold mt-3 text-white">
              {candidate?.applicant_profile?.[0]?.first_name || 'No Name Provided'}
            </h1>
            
            {/* Position title with conditional rendering */}
            {candidate?.experience?.length > 0 && candidate?.experience[0]?.position?.position_name ? (
              <h1 className="text-white text-lg">
                {candidate.experience[0].position.position_name}
              </h1>
            ) : (
              <p className="text-white text-lg">No Position Available</p>
            )}
            
            {/* Career description with fallback */}
            <p className="text-white mt-2">
              {candidate?.careers?.[0]?.career || 'No career information available'}
            </p>
            
            <h1 className="font-bold mt-2 text-white">Career Objective</h1>
            
            {/* Career objective with fallback */}
            <p className="text-white">
              {candidate?.objective?.objective || 'No career objective available'}
            </p>
          </div>
        </div>
      </div>
      
        <div className="mt-4 px-12 grid grid-cols-12 gap-x-6">
            <div className="col-span-4">
            <div className="bg-primary py-2 text-white font-bold px-4">CONTACT</div>
            <div className="space-y-1 mt-2 px-4">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: "Location",
                    value: "Dar es Salaam",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: "Phone",
                    value: candidate.phone ? candidate.phone.phone_number : "N/A",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    ),
                    title: "Email",
                    value: candidate.applicant_profile && candidate.applicant_profile[0] ? candidate.applicant_profile[0].email : "N/A",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: "Nationality",
                    value: "Tanzanian",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: "Gender",
                    value: candidate.applicant_profile && candidate.applicant_profile[0] ? candidate.applicant_profile[0].gender_name : "N/A",
                  },
                ].map((item, index) => {
                  return (
                    <div className="flex space-x-2 items-center" key={index}>
                      <div className="text-primary">{item.icon}</div>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4">
                <div className="bg-primary py-2 text-white font-bold px-4">EDUCATION</div>
                <div className="flex flex-wrap mt-2">
                  {candidate?.education && candidate.education.length > 0 ? (
                    candidate.education.map((item, index) => (
                      <div key={index}>
                        <p>
                          <span className="font-bold">
                            {item?.course?.course_name || 'Course Name Not Available'}
                          </span>
                        </p>
                        <span className="font-bold">
                          {item?.level?.education_level || 'Education Level Not Available'}
                        </span>
                        ,
                        <span>{item?.college?.college_name || 'College Name Not Available'}</span>
                        <p>
                          {item?.started ? new Date(item.started).getFullYear() : 'Start Year Not Available'} - 
                          {item?.ended ? new Date(item.ended).getFullYear() : 'End Year Not Available'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No Education Data Available</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="bg-primary py-2 text-white font-bold px-4">SKILLS</div>
                <h1 className="font-bold mt-2">Culture</h1>
                <ul className="flex flex-col list-disc list-inside space-x-0">
                  {candidate?.culture && candidate.culture.length > 0 ? (
                    candidate.culture.map((item, index) => (
                      <li key={index} className="py-0">
                        {item?.culture?.culture_name || 'Culture Name Not Available'} {index + 1}
                      </li>
                    ))
                  ) : (
                    <li className="py-0">No Culture Skills Available</li>
                  )}
                </ul>
              
                <h1 className="font-bold mt-2">Software</h1>
                <ul className="flex flex-col list-disc list-inside space-x-0">
                  {candidate?.software && candidate.software.length > 0 ? (
                    candidate.software.map((item, index) => (
                      <li key={index} className="py-0">
                        {item?.software?.software_name || 'Software Name Not Available'} {index + 1}
                      </li>
                    ))
                  ) : (
                    <li className="py-0">No Software Skills Available</li>
                  )}
                </ul>
              
                <h1 className="font-bold mt-2">Tools</h1>
                <ul className="flex flex-col list-disc list-inside space-x-0">
                  {candidate?.tools && candidate.tools.length > 0 ? (
                    candidate.tools.map((item, index) => (
                      <li key={index} className="py-0">
                        {item?.tool?.tool_name || 'Tool Name Not Available'} {index + 1}
                      </li>
                    ))
                  ) : (
                    <li className="py-0">No Tools Available</li>
                  )}
                </ul>
              
                <h1 className="font-bold mt-2">Skills & Knowledge</h1>
                <ul className="flex flex-col list-disc list-inside space-x-0">
                  {candidate?.knowledge && candidate.knowledge.length > 0 ? (
                    candidate.knowledge.map((item, index) => (
                      <li key={index} className="py-0">
                        {item?.knowledge?.knowledge_name || 'Knowledge Name Not Available'} {index + 1}
                      </li>
                    ))
                  ) : (
                    <li className="py-0">No Skills & Knowledge Available</li>
                  )}
                </ul>
              </div>
              
              <div className="mt-4">
                <div className="bg-primary py-2 text-white font-bold px-4">LANGUAGES</div>
                <div className="flex flex-wrap mt-2">
                  {candidate?.language && candidate.language.length > 0 ? (
                    candidate.language.map((item, index) => (
                      <div key={index} className="py-1 px-3 mr-2 mb-2 rounded-md border">
                        {item?.language?.language_name || 'Language Name Not Available'} {index + 1}
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No Languages Available</p>
                  )}
                </div>
              </div>
              
            </div>
            <div className="col-span-8">
              <div className="">
                <div className="bg-primary py-2 text-white font-bold px-4">WORK EXPERIENCE</div>
                {experiences && experiences.length > 0 ? (
                  experiences.map((item, index) => (
                    <div className="flex" key={index}>
                      <div className="w-4/12">
                        <div className="">
                          <p> 
                            <span className="font-bold">2014 - 2018</span>
                          </p>
                          <span className="capitalize">
                            {item?.employer?.region?.region_name || 'Region Not Available'}, 
                            {item?.employer?.sub_location || 'Sub-location Not Available'}
                          </span>
                        </div>
                      </div>
                      <div className="w-8/12">
                        <div className="">
                          <div className="">
                            <p> 
                              <span className="font-bold">{item?.employer?.employer_name || 'Employer Name Not Available'}</span>
                            </p>
                          </div>   
                        </div>
                        <div className="ml-0 mt-2">
                          {item?.positions?.map((position, index) => (
                            <div className="flex space-x-2" key={index}>
                              <div className="flex flex-col items-center">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <div className="h-16 w-1 bg-gray-200"></div>
                              </div>
                              <div className="py-0 my-0">
                                <p className="text-primary py-0 my-0">
                                  {position?.position?.position_name || 'Position Name Not Available'}
                                </p>
                                <i>{position?.employer?.employer_name || 'Employer Not Available'}</i>
                                <p>
                                  {position?.start_date ? new Date(position.start_date).getFullYear() : 'Start Year Not Available'} - 
                                  {position?.end_date ? new Date(position.end_date).getFullYear() : 'Present'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No Work Experience Available</p>
                )}
              </div>
            
              {/* PROFICIENCY QUALIFICATIONS */}
              <div className="mt-4">
                <div className="bg-primary py-2 text-white font-bold px-4">PROFICIENCY QUALIFICATIONS</div>
                {candidate?.proficiency?.length > 0 ? (
                  candidate.proficiency.map((item, index) => (
                    <div className="flex" key={index}>
                      <div className="w-4/12">
                        <p className="font-bold">
                          {item?.started} - {item?.ended || 'Present'}
                        </p>
                      </div>
                      <div className="w-8/12">
                        <p><span className="font-bold">{item?.award || 'Award Not Available'}</span></p>
                        <p className="text-primary">{item?.organization?.organization_name || 'Organization Not Available'}</p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Proficiency:</span>
                          <span>{item?.proficiency?.proficiency_name || 'Proficiency Not Available'}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No Proficiency Qualifications Available</p>
                )}
              </div>
            
              {/* TRAININGS & WORKSHOPS */}
              <div className="mt-4">
                <div className="bg-primary py-2 text-white font-bold px-4">TRAININGS & WORKSHOPS</div>
                {candidate?.proficiency?.length > 0 ? (
                  candidate.proficiency.map((item, index) => (
                    <div className="flex" key={index}>
                      <div className="w-4/12">
                        <p className="font-bold">
                          {item?.started} - {item?.ended || 'Present'}
                        </p>
                      </div>
                      <div className="w-8/12">
                        <p><span className="font-bold">{item?.award || 'Award Not Available'}</span></p>
                        <p className="text-primary-500">{item?.organization?.organization_name || 'Organization Not Available'}</p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Proficiency:</span>
                          <span>{item?.proficiency?.proficiency_name || 'Proficiency Not Available'}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No Trainings or Workshops Available</p>
                )}
              </div>
            </div>
            
            
        </div>
        <div className="mt-4 px-12">
          {/* Conditionally render the title and referees section */}
          {candidate?.referees?.length > 0 ? (
            <>
              <div className="bg-primary py-2 text-white font-bold px-4">REFEREES</div>
              <div className="grid grid-cols-3 mt-2">
                {candidate.referees.map((item, index) => (
                  <div key={index}>
                    <p>
                      <span className="font-bold">
                        {item?.first_name || 'Unknown'} {item?.middle_name || ''} {item?.last_name || 'Unknown'}
                      </span>
                    </p>
                    <p>{item?.referee_position || 'Unknown Position'}</p>
                    <p>
                      <span className="font-bold">Phone:</span> {item?.phone || 'N/A'}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {item?.email || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No referees available</p>
          )}
        </div>
        
    </div> );
}
 
export default Template3;