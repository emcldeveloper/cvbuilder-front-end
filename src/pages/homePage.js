import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import Template1 from "../templates/template1";
import axios from "axios";

const HomePage = () => {
   const [downloading,setDownloading] = useState(false)
   const [selectedTemplate,setselectedTemplate]  = useState(null)
   const {uuid} = useParams()
   const navigate = useNavigate();
    return ( <div className=" min-h-screen overflow-x-hidden  bg-white ">
          <div className="flex">
            <div className=" w-4/12 fixed pt-32  px-16 flex flex-col  items-center">
                <img src={`/logo.png`} className="h-10"/>
                <h1 className=" font-medium text-3xl text-center mt-4 text-dark">Welcome to CV Builder</h1>
                <div onClick={()=>{
                     setDownloading(true)
                     axios.get('http://localhost:5000/generatePdf').then((response)=>{
                         const link =  response.data.body.link;
                         setDownloading(false)
                         window.open(link,'_blank')
                     })
                }} className="p-3 bg-green-600  cursor-pointer hover:scale-105 flex justify-center transition-all w-full text-center  text-white font-bold  border border-gray-200 rounded-full shadow mt-10">
                      {downloading?<div className=" border-4 h-5 w-5 border-white rounded-full border-t-transparent animate-spin"></div>:"Download Now"}
                </div>
                <p className="py-2 ">Or</p>
                <div onClick={()=>{
                    navigate(`/introduction/${uuid}`)
                }} className="p-3 border bg-primary  cursor-pointer hover:scale-105 transition-all w-full text-center text-white font-bold border-gray-200 rounded-full shadow">
                    Edit before Downloading
                </div>
                {/* <img src="/logo.png" className=" h-12"/> */}

            </div>
            <div className=" w-8/12 ms-auto bg-dark">
           <div className="bg-white pb-16 m-12"><Template1/></div>
            </div>

          </div>
    </div> );
}
 
export default HomePage;