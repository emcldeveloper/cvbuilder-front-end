import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from 'axios';

const Template1 = () => {
 
  const cv  = useRef()
  const {uuid,template} = useParams()
  const [candidate,setCandidate] = useState(null)
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences,setExperiences] = useState([])

  const isVerified = candidate?.subscription?.verify === 1;
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
                  style={{ width: '550px', height: '200px' }}
                />
              </div>
            )}
          
         
          
        
        
           </div>
              <div className="flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">CURRICULUM VITAE</h1>
               <h1 className="text-xl font-bold mt-3">{candidate.applicant_profile[0]?.first_name},</h1>
               <h1 className="">{candidate.experience?.length>0&& candidate.experience[0]?.position?.position_name}</h1>
               </div>
               <div className="grid grid-cols-12 items-center mt-8">
                <div className="col-span-5">
                  {[
                    {title:"Location:",value:"Dar es salaam"},
                    {title:"Phone:",value:candidate.phone?.phone_number!==null?candidate.phone?.phone_number:"Not speciified"},
                    {title:"Email:",value:candidate.applicant_profile[0].email},
                    {title:"Nationality:",value:"Tanzanian"}, 
                    {title:"Date of birth:",value:candidate.applicant_profile[0].dob!==null ? candidate.applicant_profile[0]?.dob : "Not specified"},
                    {title:"Gender:",value:candidate.applicant_profile[0].gender_name!==null? candidate.applicant_profile[0]?.gender_name  : "Not specified"},
                    {title:"Maritial status:",value:candidate.applicant_profile[0].marital_status!==null? candidate.applicant_profile[0].marital_status:"Not specified"},
                ].map((item)=>{
                    return <div className="grid grid-cols-2">
                      <div>{item.title}</div>
                      <div>{item.value}</div>
                    </div>
                  })}
                </div>
                <div className="col-span-7 flex justify-end ">
                  <div  className="">
                    <img alt="profile image" src={`https://ekazi.co.tz/${candidate.applicant_profile[0].picture}`}
                    className=" w-48 h-48 object-cover"/>
                  </div>
                </div>
               </div>
              <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg">PROFESSIONAL SUMMARY</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p >
                {candidate.careers[0].career!==null ? candidate.careers[0].career:"Not Specified"}
               </p>
               <h1 className="font-bold mt-2">
               Career Objective
               </h1>
               <p>
                
               {candidate.objective.objective!==null?candidate.objective.objective:"Not Specified"}  
              </p>
             
              </div>
              {experiences.length> 0 && <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg">WORKING EXPRIENCE</h1>
              <div className="h-[2px] bg-gray-100 mb-2 "></div>
              <div className=" space-y-4">
              {
             experiences.map((item)=>{
                return <div className="">
                  <div className="flex"></div>
                          <div className="">
                            <div className=" ">
                            <p> <span className="font-bold">{item.employer.employer_name} </span></p>
                            <span className=" capitalize">{item.employer.region.region_name}, {item.employer.sub_location}</span>                    
                          </div>   
                        </div>
                        <ul className="list-disc list-outside  ml-5 space-y-2">
                            {item.positions.map((item)=>{
                                return <li>
                                <div>
                                <p className="font-bold">{item.position?.position_name}</p>
                                <i>{item.employer?.employer_name}</i>
                                <p>{new Date(item?.start_date).getFullYear()} - {item?.end_date == null?"Present":new Date(item?.end_date).getFullYear()}</p>
                                {/* <p className=" flex "><span className="font-bold mt-3" >Responsibilities:</span> <span dangerouslySetInnerHTML={{__html:item.responsibility}}></span></p> */}
                                {/* <p><span className="font-bold">Reason for leaving:</span>  Small pay</p> */}
                                </div> 
                              </li>
                            })}
                        </ul>
                </div>
                
                
                
            })
        }

              </div>
             
              
              
              </div>}
              <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg">LANGAUGES</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <div className="flex space-x-1">
               {candidate.language.map((item,index)=>{
                return <p> {item.language?.language_name}{index+1 != candidate.language.length &&','}
               </p>
               })}
               </div>
              </div>
              <div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg">SKILLS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p className="flex space-x-1"><span className="font-bold">Culture:</span> <div className="flex space-x-1">
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}
               </div></p>
               <p className="flex space-x-1"><span className="font-bold">Pasonality:</span>
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture?.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap"><span className="font-bold ">Skill & Knowledge:</span> 
               {candidate.knowledge.map((item,index)=>{
                return <p className=""> {item.knowledge?.knowledge_name}{index+1 != candidate.knowledge.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap"><span className="font-bold ">Software: </span> 
               {candidate.software.map((item,index)=>{
                return <p className=""> {item.software?.software_name}{index+1 != candidate.software.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1"><span className="font-bold">Tools:</span>
               {candidate.tools.map((item,index)=>{
                return <p className=""> {item.tool?.tool_name}{index+1 != candidate.tools.length &&','}
               </p>
               })}</p>
              </div>
              {candidate.education.length >0&&<div className="mt-6">
              <h1 className="font-bold mt-5 mb-1 text-lg">EDUCATION DETAILS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               {candidate.education.map((item)=>{
                return <p><div>
                <p> <span className="font-bold">{item?.course.course_name}:</span> {new Date(item?.started).getFullYear()} - {new Date(item?.ended).getFullYear()}</p>
                <i>{item?.level.education_level}</i>, <span>{item?.college.college_name}</span>
              </div>
              </p>
               })}
              </div>
              }
              {
                candidate.proficiency.length >0 && <div className="mt-6">
                <h1 className="font-bold mt-5 mb-1 text-lg">PROFICIENCY QUALIFICATION</h1>
                 <div className="h-[2px] bg-gray-100 mb-2 "></div>
                 {candidate.proficiency.map((item)=>{
                 return <>
                  <p> <span className="font-bold">{item?.award}:</span> {item?.started} - {item?.ended}</p>
                      <p className="flex space-x-2">
                      <i>{item.proficiency?.proficiency_name}</i>,  
                       <p>{item.organization?.organization_name}</p>
                      </p></>
                 })}
                </div>
              }
              
              {
                candidate.referees.length > 0  && <div className="mt-6">
                <h1 className="font-bold mt-5 mb-1 text-lg">REFEREES</h1>
                 <div className="h-[2px] bg-gray-100 mb-2 "></div>
                 <div className="space-y-3">
                 {candidate.referees.map((item)=>{
                  return <p><div>
                  <p> <span className="font-bold">{item?.first_name} {item?.middle_name} {item?.last_name}</span></p>
                  <p>{item.referee_position}</p>
                  <p> <span className="font-bold">Phone:</span> {item?.phone}</p>
                  <p> <span className="font-bold">Email:</span> {item?.email}</p>
                </div>
                </p>
                 })}
                 </div>
                </div>
              }
              </div>
        </div>
        
        
    </div> ));
}
 
export default Template1;