import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import { useState } from "react";
import axios from "axios";

const IntroductionDetails = () => {
  const { currentStep, setCurrentStep, originalDetails, candidate, setCandidate } = useContext(StepsContext)
  const { uuid, template } = useParams()

  const navigate = useNavigate();
  useEffect(() => {
    setCurrentStep(2)
  }, [])
  const [NameApplicant, setNameApplicant] = useState(
    originalDetails?.applicant_profile[0].first_name || ''
  );
  const [phoneApplicant, setPhoneApplicant] = useState(
    originalDetails?.phone.phone_number || ''
  );
  const [emailApplicant, setEmailApplicant] = useState(
    originalDetails?.applicant_profile.email || ''
  );
  const [birthApplicant, setBirthApplicant] = useState(
    originalDetails?.applicant_profile.dob || ''
  );
  const [genderApplicant, setGenderApplicant] = useState(
    originalDetails?.applicant_profile.gender_name || ''
  );
  const [maritalApplicant, setMaritalApplicant] = useState(
    originalDetails?.applicant_profile.marital_status || ''
  );
  const [positionlApplicant, setPositionApplicant] = useState(
    originalDetails?.experience[0].position.position_name || ''
  );

  const [locationApplicant, setLocationApplicant] = useState({
    sub_location: originalDetails?.address?.sub_location || '',
    region_name: originalDetails?.address?.region_name || '',
    name: originalDetails?.address?.name || ''
  });

  console.log('check marital is available', positionlApplicant);
  const handleNameChange = async (e) => {
    const newNameApplicant = e.target.value;
    setNameApplicant(newNameApplicant);

    setCandidate(prev => ({
      ...prev,
      applicant_profile: [
        {
          ...prev.applicant_profile?.[0],
          first_name: newNameApplicant
        }
      ]
    }));
  };
  const handlePhoneChange = async (e) => {
    const newPhoneApplicant = e.target.value;
    setPhoneApplicant(newPhoneApplicant);

    setCandidate(prev => ({
      ...prev,
      phone: [
        {
          ...prev.phone?.[0],
          phone_number: newPhoneApplicant
        }
      ]

    }));
  }
  const handEmailChange = async (e) => {
    const newEmailApplicant = e.target.value;

    setEmailApplicant(newEmailApplicant);
    setCandidate(prev => (
      {
        ...prev,
        applicant_profile: [
          {
            ...prev.applicant_profile?.[0],
            email: newEmailApplicant
          }
        ]
      }));
  }
  const handLocationApplicant = async (e) => {
    const [sub_location, region_name, country] = e.target.value.split(", ");

    const newLocationApplicant = {
      sub_location,
      region_name,
      country,
    };

    setLocationApplicant(newLocationApplicant);

    setLocationApplicant(prev => ({
      ...prev,
      sub_location: sub_location, // Update specific properties as needed
      region_name: region_name,
      country: country,
    }));

  };

  const handleBirthChange = async (e) => {
    const newbirth = e.target.value;
    setBirthApplicant(newbirth);
    setCandidate(prev => ({
      ...prev,
      applicant_profile: [
        {
          ...prev,
          dob: newbirth,
        }

      ]
    }));
  }
  const handleGenderChange = async (e) => {
    const newGender = e.target.value;
    setGenderApplicant(newGender);
    setCandidate(prev => (
      {
        ...prev,
        gender_name: [
          {
            ...prev,
            gender_name: newGender,
          }
        ]

      }));
  }
  const handleMaritalChange = async (e) => {
    const newMarital = e.target.value;
    setMaritalApplicant(newMarital);
    setCandidate(prev => (
      {
        ...prev,
        marital_status: [
          {
            ...prev,
            marital_status: newMarital,
          }
        ]

      }));
  }
  const handlePositionlChange = async (e) => {
    const newPosition = e.target.value;
    setPositionApplicant(newPosition);
    setCandidate(prev => (
      {
        ...prev,
        position_name: [
          {
            ...prev,
            position_name: newPosition,
          }
        ]

      }));
  }




  const sendData = {
    // name: NameApplicant,
    phone: phoneApplicant,
    // email: emailApplicant,
    address: locationApplicant,
    dob: birthApplicant,
    gender: genderApplicant,
    maritas_status: maritalApplicant,
    applicant_id:uuid,
    // current_position: positionlApplicant,

  }
  useEffect(() => {
    const saveIntroduction = async () => {
      console.log(" summery detail skills", sendData);
      try {
        const response = await axios.put(`https://test.ekazi.co.tz/api/applicant/updateIntroduction`, sendData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }

        );
        if (response.status === 200) {
          console.log(" introduction is get ",response.data.success);
        }
        // window.location.reload();

      } catch (error) {
        console.log(error)
        console.error("Error updating career objective:", error);
      }
    };

    // Only call saveCareerObjective if careerObjective is not empty

    if (
      NameApplicant ||
      phoneApplicant ||
      // emailApplicant ||
      locationApplicant ||
      birthApplicant ||
      genderApplicant ||
      maritalApplicant 
      // positionlApplicant
    ) {
      saveIntroduction();
    }


  }, [sendData, uuid]);

  return (originalDetails == null || candidate == null ? <PageLoader />
    : <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Introduction Details</h1>
          <p className="text-lg text-gray-500 mt-2">Edit introduction details here</p>
        </div>
        <div>
          <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 2</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="">
          <label>Name</label>
          <input
            // onChange={(e) => {
            //   const newData = { ...candidate }; // Create a shallow copy of candidate
            //   newData.applicant_profile[0].first_name = e.target.value; // Update the first_name field
            //   // Update the state with the new data
            //   // Update Firestore document
            //    setNameApplicant(newData);
            // }}
            readOnly
            onInput={handleNameChange}

            defaultValue={originalDetails.applicant_profile[0].first_name == candidate.applicant_profile[0].first_name ? originalDetails.applicant_profile[0].first_name : candidate.applicant_profile[0].first_name}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>
        <div className="">
          <label>Position</label>
          <input
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   newData.experience[0].position.position_name = e.target.value;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
            // }}
            readOnly
            onInput={handlePositionlChange}
            defaultValue={originalDetails.experience.length > 0 && originalDetails.experience[0].position.position_name == candidate.experience.length > 0 && candidate.experience[0].position.position_name ? originalDetails.experience.length > 0 && originalDetails.experience[0].position.position_name : candidate.experience.length > 0 && candidate.experience[0].position.position_name}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>
        <div className="">
          <label>Email</label>
          <input
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   newData.applicant_profile[0].email = e.target.value;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
            // }}
          //   onClick={()=>{
          //     window.location.href = "http://127.0.0.1:8000/applicant/profile_view"
          //  }} 
            readOnly
            onInput={handEmailChange}
            defaultValue={originalDetails.applicant_profile[0].email == candidate.applicant_profile[0].email ? originalDetails.applicant_profile[0].email : candidate.applicant_profile[0].email}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>
        <div className="">
          <label>Phone Number</label>
          <input
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   newData.phone.phone_number = e.target.value;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);

            // }}
            readOnly
            onInput={handlePhoneChange}
            defaultValue={originalDetails.phone.phone_number == candidate.phone.phone_number ? originalDetails.phone.phone_number : candidate.phone.phone_number}
            type="number"
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>
      
        <div className="">
          <label>Date of birth</label>
          <input
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   newData.applicant_profile[0].dob = e.target.value;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
            // }}
            readOnly
            onInput={handleBirthChange}
            defaultValue={originalDetails.applicant_profile[0].dob == candidate.applicant_profile[0].dob ? originalDetails.applicant_profile[0].dob : candidate.applicant_profile[0].dob}
            type="date"
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            
          />
        </div>
        <div className="">
          <label>Gender</label>
          <select
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   newData.applicant_profile[0].gender_name = e.target.value;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
            // }}
            readOnly
            onChange={handleGenderChange}
            defaultValue={originalDetails.applicant_profile[0].gender_name == candidate.applicant_profile[0].gender_name ? originalDetails.applicant_profile[0].gender_name : candidate.applicant_profile[0].gender_name}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="">
          <label>Marital Status</label>
          <select
             readOnly
            onChange={handleMaritalChange}
            defaultValue={originalDetails.applicant_profile[0].marital_status == candidate.applicant_profile[0].marital_status ? originalDetails.applicant_profile[0].marital_status : candidate.applicant_profile[0].marital_status}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          >
            <option>Married</option>
            <option>Single</option>
          </select>
        </div>
        <div className="">
          <label>Location</label>
          <input
            readOnly
          placeholder="Sublocation ,region,country"
            // onChange={(e) => {
            //   const newData = { ...candidate };
            //   const address = newData.address[0];
            //   const [sub_location, region_name, name] = e.target.value.split(", ");
            //   address.sub_location = sub_location;
            //   address.region_name = region_name;
            //   address.name = name;
            //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
            // }}
            onInput={handLocationApplicant}
            defaultValue={`${originalDetails.address[0].sub_location}, ${originalDetails.address[0].region_name}, ${originalDetails.address[0].name} `}
           
            className="mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            style={{ width: '150%' }}
          />
        </div>
      </div>


      <div className="flex justify-end space-x-2 mt-4 items-center">
        <h1 onClick={() => {
          navigate(-1)
          setCurrentStep(currentStep - 1)
        }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
        <button onClick={() => {
          navigate(`/professional_summary/${uuid}/${template}`)
          setCurrentStep(currentStep + 1)
        }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
      </div>
    </div>);
}

export default IntroductionDetails;