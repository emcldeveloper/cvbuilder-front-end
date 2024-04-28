import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {
    const [selectedTemplate, setselectedTemplate] = useState(null);
    const navigate = useNavigate();
    return ( <div>
         <div className="fixed bg-white w-full shadow-lg">
            <div className="flex w-11/12 mx-auto justify-between border-b-2 py-5 border-gray-100">
            <img className="h-10" src="/logo.png"/>
        </div>
            </div>
        <div className="w-11/12 mx-auto ">
           
       
        <div className="flex flex-col justify-center items-center pt-40">
            <h1 className="text-5xl font-bold">Select Template</h1>
            <p className="text-lg pt-3 text-gray-400">Select one template to continue building your CV</p>
        </div>
         <div className="grid grid-cols-3 gap-10 my-10 mb-24">
         {["/cv1.png","cv3.png","cv2.png"].map((item,index)=>{
            return <div onClick={()=>{
                setselectedTemplate(index)
            }} className={`border-4 rounded-lg cursor-pointer hover:shadow-2xl transition-all
             ${selectedTemplate==index?'border-secondary':'border-gray-100'}`}>
            <img className=" w-full rounded-lg " src={item}/>
        </div>
        })}
         </div>
        </div>
        <div className={`fixed bottom-0  w-full bg-primary transition-all  duration-500 ${selectedTemplate != null?'opacity-100 translate-y-0':'opacity-0 translate-y-40'}`}>
            <div className="w-11/12 mx-auto">
            <div className="flex justify-between items-center py-5">
            <p className="text-lg text-white font-bold">Template {selectedTemplate+1} is selected</p>
            <button onClick={()=>[
                navigate(`/template/${selectedTemplate}`)
            ]} className="bg-white rounded hover:scale-105 transition-all py-2 px-3 font-bold text-black">Continue</button>
            </div>
            </div>
        </div>
    </div> );
}
 
export default TemplatesPage;