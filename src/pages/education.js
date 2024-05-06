import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import { firestore } from "../utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import PageLoader from "../widgets/pageLoader";

const Educations = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid,template} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentStep(3)
     },[])
    return ( originalDetails == null || candidate == null ?<PageLoader/> : <div>
         <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Education</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove education here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 4</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
        {
        
            originalDetails.education.map((item)=>{
                return <div className="p-5 bg-white border border-gray-200 rounded shadow">
                    <p> <span className="font-bold">{item.name}:</span> {new Date(item.started).getFullYear()} - {new Date(item.ended).getFullYear()}</p>
                    <i>{item.education_level}</i>, <span>{item.college_name}</span>
                    <div className="flex justify-end">   
                    {candidate.education.filter((e)=>e.id==item.id).length >0 == true ? <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.education = candidate.education.filter((e)=>e == item);
                        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                     }} className="font-bold text-red-500 mt-3 cursor-pointer 
                     bg-red-500 bg-opacity-15 py-2 px-4 rounded-full">Remove</div>:
                     <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.education = [item,...newData.education];
                        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                     }} className="font-bold text-primary mt-3 cursor-pointer 
                     bg-primary bg-opacity-15 py-2 px-4 rounded-full">Add</div>}
                    </div>
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
                    navigate(`/experiences/${uuid}/${template}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default Educations;