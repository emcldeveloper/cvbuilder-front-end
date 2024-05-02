import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const Template1 = () => {
 
  const cv  = useRef()
  const {uuid} = useParams()
  const [candidate,setCandidate] = useState(null)
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);

  
  useEffect(()=>{
    getDoc(doc(collection(firestore,"apis"),`${uuid}`)).then((value)=>{
      setCandidate(value.data());
      setShow(true);
    })
    // h-[1125px]
},[])
useEffect(()=>{
  if(show == true){
    setPages(Math.ceil(cv.current.offsetHeight/1025))
  }
},[show])
    return ( show && ( <div  >
      
        <div className="relative">
        <div >
        {Array.from({length:pages}).map((item)=>{
          return <div  className="h-[1025px] border-b-8  border-slate-900"/>
        })}
        </div>
        <div ref={cv} className="px-12 py-8 absolute">
              <div className="flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">CURRICULUM VITAE</h1>
               <h1 className="text-xl font-bold mt-3">{candidate.applicant_profile[0].first_name}</h1>
               <h1 className="">{candidate.experience[0].position.position_name}</h1>
               </div>
               <div className="grid grid-cols-12 items-center mt-8">
                <div className="col-span-5">
                  {[
                    {title:"Location:",value:"Dar es salaam"},
                    {title:"Phone:",value:candidate.phone.phone_number},
                    {title:"Email:",value:candidate.applicant_profile[0].email},
                    {title:"Nationality:",value:"Tanzanian"},
                    {title:"Date of birth:",value:candidate.applicant_profile[0].dob},
                    {title:"Gender:",value:candidate.applicant_profile[0].gender_name},
                    {title:"Maritial status:",value:candidate.applicant_profile[0].marital_status},
                ].map((item)=>{
                    return <div className="grid grid-cols-2">
                      <div>{item.title}</div>
                      <div>{item.value}</div>
                    </div>
                  })}
                </div>
                <div className="col-span-7 flex justify-end ">
                  <div className="">
                    <img src={`https://test.ekazi.co.tz/${candidate.applicant_profile[0].picture}`}
                    className=" w-48 h-48 object-cover"/>
                  </div>
                </div>
               </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">PROFESSIONAL SUMMARY</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p >
                {candidate.careers[0].career}
               </p>
               <h1 className="font-bold mt-2">
               Career Objective
               </h1>
               <p>
               {candidate.objective.objective}  
              </p>
             
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">WORKING EXPRIENCE</h1>
              <div className="h-[2px] bg-gray-100 mb-2 "></div>
              <div className="">
              {candidate.experience.map((item)=>{
                return <div className="mb-5">
                 <h1 className="font-bold">{item.employer_name}</h1>
                 <p>{item.sub_location}</p>
                 <ul className=" list-disc list-outside ml-4 mt-2">
                  <li>
                    <div>
                    <p className="font-bold">Data System Service</p>
                    <p>Hr Industries</p>
                    <p>Mar 2022 - Present</p>
                    <p><span className="font-bold mt-3">Responsibilities:</span> Designing and codding web projects</p>
                    <p><span className="font-bold">Reason for leaving:</span>  Small pay</p>
                    </div> 
                  </li>
                 </ul>
                </div>
              })}

              </div>
             
              
              
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">LANGAUGES</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <div className="flex space-x-1">
               {candidate.language.map((item,index)=>{
                return <p> {item.language.language_name}{index+1 != candidate.language.length &&','}
               </p>
               })}
               </div>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">SKILLS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p className="flex space-x-1"><span className="font-bold">Culture:</span> <div className="flex space-x-1">
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}
               </div></p>
               <p className="flex space-x-1"><span className="font-bold">Pasonality:</span>
               {candidate.culture.map((item,index)=>{
                return <p> {item.culture.culture_name}{index+1 != candidate.culture.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap"><span className="font-bold ">Skill & Knowledge:</span> 
               {candidate.knowledge.map((item,index)=>{
                return <p className=""> {item.knowledge.knowledge_name}{index+1 != candidate.knowledge.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1 flex-wrap"><span className="font-bold ">Software: </span> 
               {candidate.software.map((item,index)=>{
                return <p className=""> {item.software.software_name}{index+1 != candidate.software.length &&','}
               </p>
               })}</p>
               <p className="flex space-x-1"><span className="font-bold">Tools:</span>
               {candidate.tools.map((item,index)=>{
                return <p className=""> {item.tool.tool_name}{index+1 != candidate.tools.length &&','}
               </p>
               })}</p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">EDUCATION DETAILS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               {candidate.education.map((item)=>{
                return <p><div>
                <p> <span className="font-bold">{item.name}:</span> {new Date(item.started).getFullYear()} - {new Date(item.ended).getFullYear()}</p>
                <i>{item.education_level}</i>, <span>{item.college_name}</span>
              </div>
              </p>
               })}
               
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">PROFICIENCY QUALIFICATION</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p><div>
                  <p> <span className="font-bold">Culture:</span> 2018 - 2024</p>
                  <i>Bachelor Degree</i>, <span>UDISM</span>
                </div>
                </p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">REFEREES</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <div className="space-y-2">
               {candidate.referees.map((item)=>{
                return <p><div>
                <p> <span className="font-bold">{item.first_name} {item.middle_name} {item.last_name}</span></p>
                <p>{item.referee_position}</p>
                <p> <span className="font-bold">Phone:</span> {item.phone}</p>
                <p> <span className="font-bold">Email:</span> {item.email}</p>
              </div>
              </p>
               })}
               </div>
              </div>
              </div>
        </div>
        
        
    </div> ));
}
 
export default Template1;