import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import Template1 from "../templates/template1";
import axios from "axios";
import Spinner from "../widgets/spinner";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";

const HomePage = () => {
   const [downloading,setDownloading] = useState(false)
   const [selectedTemplate,setselectedTemplate]  = useState(null)
   const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
   const {uuid,template} = useParams()
   const navigate = useNavigate();
   useEffect(()=>{
    setCurrentStep(0)
 },[])
    return ( <div className=" min-h-screen overflow-x-hidden  ">
         <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Welcome to CV builder</h1>
        <p className="text-lg text-gray-500 mt-2">Here is your CV template preview</p>
        </div>
        <div>
            <div className=" flex space-x-2">
           <button className="bg-white rounded-full">
           <button onClick={()=>{
            navigate(`/introduction/${uuid}/${template}`)
           }} className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Edit before downloading</button>
           </button>
           <button className="bg-white rounded-full">
           <button onClick={()=>{
                setDownloading(true)
                axios.get(`http://localhost:5000/generatePdf/?template=${template}&uuid=${uuid}`).then((response)=>{
                    const link =  response.data.body.link;
                    setDownloading(false)
                    window.open(link,'_blank')
                })
           }} className="py-2 px-4 bg-primary font-bold  text-white
              rounded-full ">
            {downloading?<Spinner/>:"Download Now"}
            </button>

           </button>
            </div>
        </div>
        </div>
          <div className="flex pt-4">
          <div className=" w-full ms-auto bg-dark">
           <div className="bg-white pb-16">
            {[
            {template:<Template1/>},
            {template:<Template2/>},
            {template:<Template3/>}].map((item,index)=>{
              return index+1 == template&& <div>{item.template}</div>
            })}
           </div>
          
            </div>

          </div>
    </div> );
}
 
export default HomePage;