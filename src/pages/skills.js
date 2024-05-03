import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const Skills = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentStep(5)
     },[])
    return ( originalDetails == null || candidate == null ? <PageLoader/>
    : <div>
        <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Skills</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove skills here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 6</button>
            </div>
        </div>
        </div>
        <p className="mt-4">Culture</p>
        <div className="flex flex-wrap mt-1">
        {
            originalDetails.culture.map((item)=>{
                return <div className=" flex items-center space-x-2  py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.culture.culture_name}</h1> 
                    <input onChange={(e)=>{
                        if(e.target.checked == true){
                            const newData = {...candidate};
                            newData.culture = candidate.culture??[];
                            newData.culture.push(item);
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                        else{
                            const newData = { ...candidate };
                            newData.culture = candidate.culture.filter((e)=>e.culture.culture_name != item.culture.culture_name);
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                     }} checked={candidate.culture.filter((e)=>e.culture.culture_name == item.culture.culture_name).length >0} type="checkbox"/>
                </div>
            })
        }
        </div>
        <p className="mt-2">Tools</p>
        <div className="flex flex-wrap mt-1">
        {
            originalDetails.tools.map((item)=>{
                return <div className=" flex space-x-2 items-center py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.tool.tool_name}</h1> 
                    <input onChange={(e)=>{
                        if(e.target.checked == true){
                            const newData = { ...candidate };
                            newData.tools = candidate.tools??[];
                            newData.tools.push(item)
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                        else{
                            const newData = { ...candidate };
                            newData.tools = candidate.tools.filter((e)=>e.tool.tool_name != item.tool.tool_name);
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        } 
                     }} checked={candidate.tools && candidate.tools.filter((e)=>e.tool.tool_name ==
                         item.tool.tool_name).length >0}   type="checkbox"/>
                </div>
            })
        }
        </div>
        <p className="mt-2">Personality</p>
        <div className="flex flex-wrap mt-1">
         {
            originalDetails.applicant_personality.map((item)=>{
                return <div className=" py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.personality.personality_name}</h1>
                     <input onChange={(e)=>{
                        if(e.target.checked == true){
                            const newData = { ...candidate };
                            newData.applicant_personality = [item,...candidate.applicant_personality];
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                        else{
                            const newData = { ...candidate };
                            newData.applicant_personality = candidate.applicant_personality.filter((e)=>e.personality.personality_name != item.personality.personality_name);
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                          
                     }}  checked={candidate.applicant_personality.filter((e)=>e.personality.personality_name ==
                         item.personality.personality_name).length >0}  type="checkbox"/>
                </div>
            })
        }
        </div>
        <p className="mt-2">Softwares</p>
        <div className="flex flex-wrap mt-1">
        {
            originalDetails.software.map((item)=>{
                return <div className=" py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.software.software_name}</h1>
                     <input onChange={(e)=>{
                        if(e.target.checked == true){
                            const newData = { ...candidate };
                            newData.software =candidate.software??[];
                            newData.software.push(item)
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                        else{
                            const newData = { ...candidate };
                            newData.software = candidate.software.filter((e)=>e.software.software_name != item.software.software_name);
                            setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }
                          
                     }} checked={candidate.software&& candidate.software.filter((e)=>e.software.software_name ==
                         item.software.software_name).length >0} type="checkbox"/>
                </div>
            })
        }
        </div>
        
       
        <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/proficiency/${uuid}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default Skills;