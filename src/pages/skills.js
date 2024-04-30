import { useContext } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";

const Skills = () => {
    const {currentStep,setCurrentStep,originalDetails} = useContext(StepsContext)
    const {uuid} = useParams()
    const navigate = useNavigate();
    return ( <div>
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
        <div className="flex flex-wrap mt-8">
        {
            originalDetails.culture.map((item)=>{
                return <div className=" flex items-center space-x-2  py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.culture_name}</h1> <input type="checkbox"/>
                </div>
            })
        }
        {
            originalDetails.tools.map((item)=>{
                return <div className=" flex space-x-2 items-center py-2 rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.tool_name}</h1> <input type="checkbox"/>
                </div>
            })
        }
         {
            originalDetails.applicant_personality.map((item)=>{
                return <div className=" py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.personality_name}</h1> <input type="checkbox"/>
                </div>
            })
        }
        {
            originalDetails.software.map((item)=>{
                return <div className=" py-2 space-x-2 flex items-center rounded-full px-3 me-2 mb-2 bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <h1>{item.software_name}</h1> <input type="checkbox"/>
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