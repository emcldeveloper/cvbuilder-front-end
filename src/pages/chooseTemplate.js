import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";

const ChooseTemplate = () => {
   const [selectedTemplate,setselectedTemplate]  = useState(null)
   const {currentStep,setCurrentStep} = useContext(StepsContext)
   const {uuid} = useParams()
   const navigate = useNavigate();
    return ( <div className="  ">
        
        <div className={`bottom-0 right-0   ${selectedTemplate != null?"translate-y-12 opacity-100 ":"translate-y-24 opacity-0"}  transition-all duration-500 fixed`}>
          <div className="p-12 mt-12">
          <div className="flex space-x-2 mb-5">
          <div className="flex space-x-2 mb-5">
                <button onClick={()=>{
                    setCurrentStep(currentStep+1)
                    navigate(`/introduction/${uuid}`)
                }} className="bg-green-600 py-4 hover:scale-105 transition-all px-5 rounded-full text-white font-bold">
                    Continue
                </button>
            </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Choose Template</h1>
        <p className="text-lg text-gray-500 mt-2">Select one template to continue</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 1</button>
            </div>
        </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 my-10 mb-24">
         {["/cv1.png","cv3.png","cv2.png"].map((item,index)=>{
            return <div onClick={()=>{
                setselectedTemplate(index)
            }} className={`border-4 rounded-lg cursor-pointer hover:shadow-2xl transition-all
             ${selectedTemplate==index?'border-secondary':'border-gray-100'}`}>
            <img className=" w-full rounded-lg " src={item}/>
        </div>
        })}
         </div>
    </div> );
}
 
export default ChooseTemplate;