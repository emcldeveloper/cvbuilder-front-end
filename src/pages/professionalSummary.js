import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";

const ProfessionalSummary = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid,template} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
      setCurrentStep(2)
   },[])
    return ( originalDetails == null || candidate == null ?<PageLoader/>
    : <div>
             <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Professional Summary</h1>
        <p className="text-lg text-gray-500 mt-2">Edit professional summary here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 3</button>
            </div>
        </div>
        </div>
        <div className=" mt-8">
                    <label>Career Objective</label>
                    <textarea onChange={(e) => {
                          const newData = { ...candidate };
                          newData.careers[0].career = e.target.value;
                          setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }} 
                    defaultValue={originalDetails.careers[0].career == candidate.careers[0].career ?
                     originalDetails.careers[0].career : candidate.careers[0].career} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className="mt-2">
                    <label>Main Objective</label>
                    <textarea onChange={(e) => {
                          const newData = { ...candidate };
                          newData.objective.objective = e.target.value;
                          setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                        }}  defaultValue={originalDetails.objective.objective == candidate.objective.objective ?
                          originalDetails.objective.objective : candidate.objective.objective} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"/>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/educations/${uuid}/${template}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div>);
}
 
export default ProfessionalSummary;