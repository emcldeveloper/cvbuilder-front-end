import React from "react";


const RightSideBar=()=>{


    return (
        <>
         <div className="w-full lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold mb-4">Featured Companies</h2>



                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4 mt-2">
                                <h2 className="text-xl font-bold mb-4">Featured Companies</h2>

                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((company) => (
                                        <div key={company} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                                <img
                                                    src="/a.jpg"
                                                    alt="Company Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">TechCorp Inc.</h4>
                                                <p className="text-sm text-gray-500">12 Jobs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-bold mb-2">Job Alerts</h3>
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm">Get notified when new jobs match your profile</p>
                                        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 w-full">
                                            Create Job Alert
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )

}


export default RightSideBar