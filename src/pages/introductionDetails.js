import { useContext } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate } from "react-router-dom";

const IntroductionDetails = () => {
    const {currentStep,setCurrentStep} = useContext(StepsContext)
    const navigate = useNavigate();
    return ( <div>
         <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Introduction  Details</h1>
        <p className="text-lg text-gray-500 mt-2">Edit introduction details here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 2</button>
            </div>
        </div>
        </div>
         <div className="grid grid-cols-3 gap-4 mt-12">
                  <div className=" ">
                    <label>Name</label>
                    <input className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Position</label>
                    <input className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Email</label>
                    <input className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Phone Number</label>
                    <input type="number" className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Location</label>
                    <input  className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Date of birth</label>
                    <input type="date" className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Gender</label>
                    <select className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent">
                     <option>Male</option>
                     <option>Female</option>
                    </select>
                  </div>
                  <div className=" ">
                    <label>Maritial Status</label>
                    <select className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent">
                     <option>Married</option>
                     <option>Not Married</option>
                    </select>
                  </div>
                 </div>
                <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-500 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate('/introduction')
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default IntroductionDetails;