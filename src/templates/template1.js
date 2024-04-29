const Template1 = () => {
    return ( <div>
        <div className=" px-12 py-8 ">
              <div className="flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">CURRICULUM VITAE</h1>
               <h1 className="text-xl font-bold mt-3">Sofia Juma</h1>
               <h1 className="">Marketing Intern</h1>
               </div>
               <div className="grid grid-cols-12 items-center mt-8">
                <div className="col-span-5">
                  {[
                    {title:"Location:",value:"Dar es salaam"},
                    {title:"Phone:",value:"+255 627 707 434"},
                    {title:"Email:",value:"johnvchuma@gmail.com"},
                    {title:"Nationality:",value:"Tanzanian"},
                    {title:"Date of birth:",value:"12/05/1999"},
                    {title:"Gender:",value:"Male"},
                    {title:"Maritial status:",value:"Married"},
                ].map((item)=>{
                    return <div className="grid grid-cols-2">
                      <div>{item.title}</div>
                      <div>{item.value}</div>
                    </div>
                  })}
                </div>
                <div className="col-span-7 flex justify-end ">
                  <div className="">
                    <img src="https://t3.ftcdn.net/jpg/06/33/34/48/360_F_633344878_lbmmJtaj155fESZAX8oO1t8aA3T5REx9.jpg"  
                    className=" w-48 h-48 object-cover"/>
                  </div>
                </div>
               </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">PROFESSIONAL SUMMARY</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p>
               Deserunt cillum aliqua. adipisicing voluptate commodo. Officia ipsum deserunt exercitation laborum veniam nulla nostrud nisi consequat minim.
               </p>
               <h1 className="font-bold mt-2">
               Career Objective
               </h1>
               <p>Deserunt cillum aliqua. adipisicing voluptate commodo. Officia ipsum deserunt exercitation laborum veniam nulla nostrud nisi consequat minim.</p>
             
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">WORKING EXPRIENCE</h1>
              <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <h1 className="font-bold">EXACT MANPOWER CONSULTING LTD</h1>
               <p>Sinza, Dar es salaam - Tanzania</p>
               <ul className=" list-disc list-outside ml-4 mt-2">
                <li>
                  <div>
                  <p className="font-bold">Data System Service</p>
                  <p>Hr Industries</p>
                  <p>Mar 2022 - Present</p>
                  <p><span className="font-bold mt-3">Responsibilities:</span> Designing and codding web projects</p>
                  <p><span className="font-bold">Reason for leaving:</span>  Small pay</p>
                  </div> 
                </li>
               </ul>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">LANGAUGES</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p>
               English, Swihili, French
               </p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">SKILLS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p><span className="font-bold">Culture:</span> Culture</p>
               <p><span className="font-bold">Pasonality:</span> Awareness</p>
               <p><span className="font-bold">Skill & Knowledge:</span> Attention to details , Result oriented. , Critical thinkers, , Flexible & Reliable.</p>
               <p><span className="font-bold">Software:</span> Figma, MS office</p>
               <p><span className="font-bold">Tools:</span> Computer</p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">EDUCATION DETAILS</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p><div>
                  <p> <span className="font-bold">Culture:</span> 2018 - 2024</p>
                  <i>Bachelor Degree</i>, <span>UDISM</span>
                </div>
                </p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">PROFICIENCY QUALIFICATION</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p><div>
                  <p> <span className="font-bold">Culture:</span> 2018 - 2024</p>
                  <i>Bachelor Degree</i>, <span>UDISM</span>
                </div>
                </p>
              </div>
              <div className="mt-10">
              <h1 className="font-bold mt-5 mb-1 text-lg">REFEREES</h1>
               <div className="h-[2px] bg-gray-100 mb-2 "></div>
               <p><div>
                  <p> <span className="font-bold">Seraphin Kimaryo</span></p>
                  <p>CEO at Silabu</p>
                  <p> <span className="font-bold">Phone:</span> 0627707434</p>
                  <p> <span className="font-bold">Email:</span> johnvchuma@gmail.com</p>

                </div>
                </p>
              </div>
              </div>
    </div> );
}
 
export default Template1;