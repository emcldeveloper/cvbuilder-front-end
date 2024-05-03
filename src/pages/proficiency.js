import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const Proficiency = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentStep(6)
     },[])
    return ( originalDetails == null || candidate == null ?<PageLoader/> : <div>
       <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Proficiency</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove proficiency here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 7</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
        {
            originalDetails.proficiency.map((item)=>{
                return <div  className="p-5 bg-white border border-gray-200 rounded shadow">
                    <p> <span className="font-bold">{item.award}:</span> {item.started} - {item.ended}</p>
                    <p className="flex space-x-2">
                    <i>{item.proficiency.proficiency_name}</i>,  
                     <p>{item.organization.organization_name}</p>
                    </p>
                    <div className="flex justify-end">   
                    {candidate.proficiency.filter((e)=>e.id==item.id).length >0 == true ? <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.proficiency = candidate.proficiency.filter((e)=>e.awaid != item.awaid);
                        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                     }} className="font-bold text-red-500 mt-3 cursor-pointer 
                     bg-red-500 bg-opacity-15 py-2 px-4 rounded-full">Remove</div>:
                     <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.proficiency = [item,...newData.proficiency];
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
                    navigate(`/refrees/${uuid}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default Proficiency;