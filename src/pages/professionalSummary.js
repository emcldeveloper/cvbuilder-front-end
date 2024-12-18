import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";
import { checkIfExists } from "../controllers/apisController";

const ProfessionalSummary = () => {
  const { currentStep, setCurrentStep, candidate, setCandidate } = useContext(StepsContext)
  const [originalDetails, setOriginalDetails] = useState(null)
  const [careerObjective, setCareerObjective] = useState(
    originalDetails?.careers[0].career || ''
  );
  const [Objective, setObjective] = useState(
    originalDetails?.objective.objective || ''
  );
  console.log('objective current', Objective);
  useEffect(() => {
    console.log(uuid);
    axios.get(`https://test.ekazi.co.tz/api/cv/cv_builder/${uuid}`).then((response) => {
      if (response != null) {
        const data = response.data.data

        setOriginalDetails(data);
        checkIfExists({ uuid }).then((value) => {
          if (value == false) {
            setDoc(doc(collection(firestore, "apis"), `${uuid}`), data)
          }
        });
      }
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }, [])
  // Initialize state with candidate data

  const { uuid, template } = useParams()
  // const {objective, setObjective}=useState()
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentStep(3)
  }, [])
  const sendData = {
    career: careerObjective
  }
  const sendData2 = {
    objective: Objective
  }
  const handleCareerChange = async (e) => {
    const newCareerObjective = e.target.value;
    setCareerObjective(newCareerObjective);

    setCandidate(prev => ({
      ...prev,
      careers: [{ ...prev.careers[0], career: newCareerObjective }]
    }));

  };
  const handleObjectiveChange = async (e) => {
    const newObjective = e.target.value;
    setObjective(newObjective);



    setCandidate(prev => ({
      ...prev,
      objective: [{ ...prev.objective[0], career: newObjective }]
    }));




  };
  useEffect(() => {
    const saveCareerObjective = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/applicant/storecareerobjective/${uuid}`, sendData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }

        );
        if (response.status === 200) {
       
        }
        // window.location.reload();

      } catch (error) {
        console.error("Error updating career objective:", error);
      }
    };

    // Only call saveCareerObjective if careerObjective is not empty
    if (careerObjective) saveCareerObjective();

  }, [sendData, uuid]);

  useEffect(() => {
    const saveObjective = async () => {
      try {
        console.log('send data three',sendData2);
        const response = await axios.put(`http://127.0.0.1:8000/api/applicant/storeObjective/${uuid}`, sendData2,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }

        );
        if (response.status === 200) {
          console.log('send objective is better ', response.data.success);
        }
        // window.location.reload();

      } catch (error) {
        console.error("Error updating career objective:", error);
      }
    };

    // Only call saveObjective if careerObjective is not empty
    if (Objective) saveObjective();

  }, [sendData2, uuid]);
  return (originalDetails == null || candidate == null ? <PageLoader />
    : <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Professional Summary</h1>
          <p className="text-lg text-gray-500 mt-2">Edit professional summary here</p>
        </div>
        <div>
          <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 3</button>
          </div>
        </div>
      </div>
      <div className=" mt-8">
        <label>Career Objective</label>


        <textarea
          onInput={handleCareerChange}
          defaultValue={originalDetails.careers[0].career === candidate.careers[0].career
            ? originalDetails.careers[0].career : candidate.careers[0].career}
          className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
        />
        {/* <textarea onChange={(e) => {
          const newData = { ...candidate };
          newData.careers[0].career = e.target.value;
          setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
        }}
          defaultValue={originalDetails.careers[0].career == candidate.careers[0].career ?
            originalDetails.careers[0].career : candidate.careers[0].career} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent" /> */}
      </div>
      <div className="mt-2">
        <label>Main Objective</label>
        <textarea
          // onChange={(e) => {
          //   const newData = { ...candidate };
          //   newData.objective.objective = e.target.value;
          //   setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
          // }}
          onInput={handleObjectiveChange}
          defaultValue={originalDetails.objective.objective == candidate.objective.objective ?
            originalDetails.objective.objective : candidate.objective.objective} className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent" />
      </div>
      <div className="flex justify-end space-x-2 mt-4 items-center">
        <h1 onClick={() => {
          navigate(-1)
          setCurrentStep(currentStep - 1)
        }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
        <button onClick={() => {
          navigate(`/educations/${uuid}/${template}`)
          setCurrentStep(currentStep + 1)
        }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
      </div>
    </div>);
}

export default ProfessionalSummary;