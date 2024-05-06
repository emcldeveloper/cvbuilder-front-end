import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const WorksExperiences = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const [experiences,setExperiences] = useState([])
    const {uuid,template} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentStep(4)
     },[])
    
     useEffect(()=>{
        if(originalDetails != null){
           originalDetails.experience.forEach(item=>{
               if(experiences.filter((e)=>e.employer.id==item.employer.id) == 0){
                item.positions = originalDetails.experience.filter((ex)=>ex.employer.id==item.employer.id)
                  setExperiences([...experiences,item])
               }
           })
        }
     },[originalDetails,experiences])
    return (  originalDetails == null || candidate == null ? <PageLoader/>
    : <div>
<div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Work Experience</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove experiences here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 5</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-5">
        {
             experiences.map((item)=>{
                return <div className="py-3 px-5 bg-white border border-gray-200 rounded shadow">
                          <div className="flex justify-between">
                            <div className=" ">
                            <p> <span className="font-bold">{item.employer.employer_name} </span></p>
                            <span className=" capitalize">{item.employer.region.region_name}, {item.employer.sub_location}</span>                    
                          </div>
                          {candidate.experience.filter((e)=>e.applicant_employer_id == item.applicant_employer_id).length >0 == true ? <div onClick={()=>{
                            const newData = { ...candidate };
                            newData.experience = candidate.experience.filter((e)=>e.applicant_employer_id != item.applicant_employer_id);
                        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                     }} className="font-bold text-red-500 mt-3 cursor-pointer 
                     bg-red-500 bg-opacity-10 py-2 px-4 rounded-full">Remove</div>:
                     <div onClick={()=>{
                        try {
                            // alert(item.positions.length)
                        const newData = { ...candidate };
                        console.log(newData.experience)
                        console.log(item.positions)
                        newData.experience = [...item.positions];
                        
                        // console.log(newData)
                       setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        } catch (error) {
                            console.log(error);
                            throw error
                        }
                     }} className="font-bold text-primary mt-3 cursor-pointer 
                     bg-primary bg-opacity-15 py-2 px-4 rounded-full">Add</div>}
                        </div>
                        <ul className="list-disc list-outside  ml-5 space-y-4">
                            {item.positions.map((item)=>{
                                return <li>
                                <div>
                                <p className="font-bold">{item.position.position_name}</p>
                                <i>{item.employer.employer_name}</i>
                                <p>{new Date(item.start_date).getFullYear()} - {item.end_date == null?"Present":new Date(item.end_date).getFullYear()}</p>
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
        <div className="flex justify-end space-x-2 mt-4 items-center z-50">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/skills/${uuid}/${template}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
        </div>
    </div> );
}
 
export default WorksExperiences;