const EditTemplate = () => {
    const steps = [{title:"Introduction"},{title:"Contact Informations"},{title:"Education"},{title:"Work Experience"},
    {title:"Certification"},{title:"Refrees"},{title:'Skills'}];
    return ( <div>
        <div className="flex">
            <div className=" w-3/12 fixed bg-primary h-screen text-white px-12 py-12">
                <h1 className="font-bold text-2xl">eKazi CV Builder</h1>
              <div className="  mt-8">
              {steps.map((item,index)=>{
                    return <div className="font-bold text-opacity-75  border-white border-opacity-50 rounded">
                      <div className="flex space-x-2 items-center">
                      <div className="h-8 w-8 bg-[#6688C7] rounded-full flex justify-center items-center">
                        {index+1}
                      </div>
                        <h1>{item.title}</h1>
                      </div>
                      {index+1 != steps.length && <div className="h-6 bg-[#6688C7] ml-4 w-[2px]"/>}
                      
                    </div>
                })}
              </div>
            </div>
            <div className="w-9/12 ms-auto">
                
              

            </div>


        </div>
    </div> );
}
 
export default EditTemplate;