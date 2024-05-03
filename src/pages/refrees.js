import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";

const Refrees = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        setCurrentStep(7)
     },[])
    return ( originalDetails == null || candidate == null ?<PageLoader/> : <div>
        <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Referees</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove refrees here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 4</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
        {
            originalDetails.referees.map((item)=>{
                return <div className="p-5 bg-white border border-gray-200 flex flex-col items-center rounded shadow">
                    <div className="  bg-orange-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" s
                    trokeWidth={1.5} stroke="currentColor" className="w-20 h-20 p-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    </div>
                    <p className="mt-2"> <span className="font-bold capitalize">{item.first_name} {item.middle_name} {item.last_name}</span></p>
                    <p>{item.referee_position}</p>
                    <i>Company: {item.employer}</i>
                    <div className="flex justify-center">   
                    {candidate.referees.filter((e)=>e.id==item.id).length >0 == true ? <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.referees = candidate.referees.filter((e)=>e.id != item.id);
                        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
                     }} className="font-bold text-red-500 mt-3 cursor-pointer 
                     bg-red-500 bg-opacity-15 py-2 px-4 rounded-full">Remove</div>:
                     <div onClick={()=>{
                        const newData = { ...candidate };
                        newData.referees = [item,...newData.referees];
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
                    navigate(`/complete/${uuid}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>

    </div> );
}
 
export default Refrees;