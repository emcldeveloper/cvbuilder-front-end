import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const IntroductionDetails = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid} = useParams()
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
                    <input onChange={(e)=>{
                        let data= candidate;
                        data.applicant_profile[0].first_name = e.target.value;
                       setDoc(doc(collection(firestore,"apis"),`${uuid}`),data) 
                    }} defaultValue={`${originalDetails.applicant_profile[0].first_name == candidate.applicant_profile[0].first_name ? originalDetails.applicant_profile[0].first_name:candidate.applicant_profile[0].first_name}`} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Position</label>
                    <input   defaultValue={originalDetails.experience[0].position_name} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Email</label>
                    <input defaultValue={originalDetails.applicant_profile[0].email}  className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Phone Number</label>
                    <input  defaultValue={originalDetails.phone.phone_number} type="number" className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Location</label>
                    <input  defaultValue={`${originalDetails.address[0].sub_location}, ${originalDetails.address[0].region_name}, ${originalDetails.address[0].name} `}  className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Date of birth</label>
                    <input defaultValue={originalDetails.applicant_profile[0].dob}  type="date" className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className=" ">
                    <label>Gender</label>
                    <select defaultValue={originalDetails.applicant_profile[0].gender_name} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent">
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className=" ">
                    <label>Maritial Status</label>
                    <select  className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent">
                     <option>Married</option>
                     <option>Not Married</option>
                    </select>
                  </div>
                 </div>
                <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/professional_summary/${uuid}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default IntroductionDetails;