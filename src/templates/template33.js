import { useContext,useEffect,useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
{% comment %} import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase"; {% endcomment %}
 
import axios from 'axios';
const Template3 = () => {
  const cv  = useRef()
  const {uuid,template} = useParams()
  const [candidate,setCandidate] = useState(null)
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences,setExperiences] = useState([])

  
  useEffect(() => {
      // Fetch data from the API
      axios.get(`https://test.ekazi.co.tz/api/cv/cv_builder/${uuid}`)
        .then((response) => {
          if (response?.data?.data) {
            setCandidate(response.data.data);  // Set the candidate data from the API response
            setShow(true);  // Display the content
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [uuid]);
 
useEffect(()=>{
  if(candidate != null){
     candidate.experience.forEach(item=>{
         if(experiences.filter((e)=>e.employer.id==item.employer.id) == 0){
          item.positions = candidate.experience.filter((ex)=>ex.employer.id==item.employer.id)
            setExperiences([...experiences,item])
         }
     })
  }
},[candidate,experiences])
    return (show&& <div>
        <div id="data" className="bg-primary py-4">
          <div className="grid grid-cols-12 gap-4 px-12 items-center">
            <div className=" col-span-4 flex ">
            <img alt="profile image" src={`https://test.ekazi.co.tz/${candidate.applicant_profile[0].picture}`}
                    className=" w-48 h-48 object-cover rounded-full"/>
            
            </div>
            <div className=" col-span-8">
            <h1 className="text-3xl font-bold mt-3 text-white">{candidate.applicant_profile[0].first_name}</h1>
               <h1 className=" text-white text-lg">{candidate.experience.length>0&& candidate.experience[0].position.position_name}</h1>
            
               <p className="text-white mt-2" >
                    {candidate.careers[0].career}
                    </p>
                    <h1 className="font-bold mt-2 text-white">
                    Career Objective
                    </h1>
                    <p className="text-white">
                    {candidate.objective.objective}  
                    </p></div>
          </div>
        </div>
        <div className="mt-4 px-12 grid grid-cols-12 gap-x-6">
            <div className="col-span-4">
            <div className="bg-primary py-2 text-white font-bold px-4">CONTACT</div>
            <div className=" space-y-1 mt-2 px-4">
              {[
                {icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>,title:"Location",value:"Dar es salaam"},
                {icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>,title:"Phone",value:candidate.phone.phone_number},
                {icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>,title:"Email",value:candidate.applicant_profile[0].email},
                {icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
                </svg>,title:"Nationality",value:"Tanzanian"},
                {icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
                </svg>,title:"Gender",value:candidate.applicant_profile[0].gender_name},
                ].map((item)=>{
                    return <div className="flex space-x-2 items-center">
                      <div className="text-primary">{item.icon}</div>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  })}
              </div>
              <div className=" mt-4 ">
            <div className="bg-primary py-2 text-white font-bold px-4">EDUCATION</div>
            <div className=" flex flex-wrap mt-2 ">
               {candidate.education.map((item)=>{
                        return <p><div>
                        <p> <span className="font-bold">{item.course.course_name}</span></p>
                        <span className=" font-bold">{item.level.education_level}</span>,
                        <span>{item.college.college_name}</span>
                       <p>{new Date(item.started).getFullYear()} - {new Date(item.ended).getFullYear()}</p>
                        </div>
                         </p>
                    })}
              </div>
            </div>
               
            <div className=" mt-4 ">
            <div className="bg-primary py-2 text-white font-bold px-4">SKILLS</div>
            <h1 className="font-bold mt-2">Culture</h1>
            <ul className=" flex flex-col  list-disc list-inside space-x-0">
                    {candidate.culture.map((item,index)=>{
                return <li className="py-0"> {item.culture.culture_name}{index+1}</li>
               })}
              </ul>
             
              <h1 className="font-bold mt-2">Software</h1>
            <ul className=" flex flex-col  list-disc list-inside space-x-0">
                    {candidate.software.map((item,index)=>{
                return <li className="py-0"> {item.software.software_name}{index+1}</li>
               })}
              </ul>
              <h1 className="font-bold mt-2">Tools</h1>
            <ul className=" flex flex-col  list-disc list-inside space-x-0">
                    {candidate.tools.map((item,index)=>{
                return <li className="py-0"> {item.tool.tool_name}{index+1}</li>
               })}
              </ul>
              <h1 className="font-bold mt-2">Skills & Knowledge</h1>
            <ul className=" flex flex-col  list-disc list-inside space-x-0">
                    {candidate.knowledge.map((item,index)=>{
                return <li className="py-0"> {item.knowledge.knowledge_name}{index+1}</li>
               })}
              </ul>
            </div>
            <div className=" mt-4 ">
            <div className="bg-primary py-2 text-white font-bold px-4">LANGUAGES</div>
            <div className=" flex flex-wrap mt-2 ">
                    {candidate.language.map((item,index)=>{
                return <div className="py-1 px-3 mr-2 mb-2 rounded-md border"> {item.language.language_name}{index+1}
               </div>
               })}
              </div>
            </div>
            </div>
            <div className="col-span-8">
            <div className="">
            <div className="bg-primary py-2 text-white font-bold px-4">WORK EXPERIENCE</div>
            {
             experiences.map((item)=>{
                return <div className="flex">
                <div className="w-4/12">
                <div className=" ">
                        <p> <span className="font-bold">2014 - 2018 </span></p>
                        <span className=" capitalize">{item.employer.region.region_name}, {item.employer.sub_location}</span>                    
                      </div> 
                </div>
                <div className="w-8/12">
                <div className="">
                        <div className=" ">
                        <p> <span className="font-bold">{item.employer.employer_name} </span></p>
                        {/* <span className=" capitalize">{item.employer.region.region_name}, {item.employer.sub_location}</span>                     */}
                      </div>   
                    </div>
                    <div className="ml-0 mt-2">
                        {item.positions.map((item)=>{
                            return <div className="flex space-x-2">
                                <div className="flex flex-col items-center">
                                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                                    <div className="h-16 w-1 bg-gray-200"></div>
                                </div>
                            <div className="py-0 my-0">
                            <p className=" text-primary py-0 my-0">{item.position.position_name}</p>
                            <i>{item.employer.employer_name}</i>
                            <p>{new Date(item.start_date).getFullYear()} - {item.end_date == null?"Present":new Date(item.end_date).getFullYear()}</p>
                           
                            </div> 
                          </div>
                         })}
                    </div>
                </div>
              </div>
            })
        }
            </div>
            <div className=" mt-4">
            <div className="bg-primary py-2 text-white font-bold px-4">PROFICIENCY QUALIFICATIONS</div>
            {candidate.proficiency.map((item)=>{
                 return <div className="flex">
                    <div className="w-4/12">
                    <p className="font-bold">
                    {item.started} - {item.ended}
                    </p>
                    </div>
                    <div className="w-8/12">
                    <p> <span className="font-bold">{item.award}</span> </p>
                     <p className=" text-primary">{item.organization.organization_name}</p>
                      <p className="flex space-x-2">
                        <span className="font-bold">Proficiency:</span>
                      <span> {item.proficiency.proficiency_name}</span>,  
                      </p>
                    </div>
                 </div>
                 })}
            </div>
            <div className=" mt-4">
            <div className="bg-primary py-2 text-white font-bold px-4">TRAININGS & WORKSHOPS</div>
            {candidate.proficiency.map((item)=>{
                 return <div className="flex">
                    <div className="w-4/12">
                    <p className="font-bold">
                    {item.started} - {item.ended}
                    </p>
                    </div>
                    <div className="w-8/12">
                    <p> <span className="font-bold">{item.award}</span> </p>
                     <p className=" text-primary-500">{item.organization.organization_name}</p>
                      <p className="flex space-x-2">
                        <span className="font-bold">Proficiency:</span>
                      <span> {item.proficiency.proficiency_name}</span>,  
                      </p>
                    </div>
                 </div>
                 })}
            </div>
            </div>
            
        </div>
        <div className=" mt-4 px-12">
            <div className="bg-primary py-2 text-white font-bold px-4">REFEREES</div>
            <div className="grid grid-cols-3 mt-2">
                    {candidate.referees.map((item)=>{
                  return <p><div>
                  <p> <span className="font-bold">{item.first_name} {item.middle_name} {item.last_name}</span></p>
                  <p>{item.referee_position}</p>
                  <p> <span className="font-bold">Phone:</span> {item.phone}</p>
                  <p> <span className="font-bold">Email:</span> {item.email}</p>
                </div>
                </p>
                 })}
                    
                 </div>
            </div>
    </div> );
}
 
export default Template3;// TemplateOrange.jsx — CV Template with #e38720 brand and Dosis font
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#009485";

export default function Template11() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(HTTP error! status: ${res.status});
        return res.json();
      })
      .then((json) => {
        setPayload(json?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const profiles = payload?.applicant_profile ?? [];
  const profile = profiles[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

  const phone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    payload?.user?.[0]?.phone ||
    "—";
  const email = payload?.user?.[0]?.email || payload?.email?.email || "—";
  const location = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0].name : ""
      }`
    : "—";

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };

  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container fluid className="my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Row className="justify-content-center">
        <Col md={11} lg={10}>
          <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
            {/* Header */}
            <Card.Header
              className="text-white text-center py-5"
              style={{
                backgroundColor: BRAND,
                fontFamily: "Dosis, sans-serif",
              }}
            >
              <h1 className="fw-bold mb-1" style={{ fontSize: "2.2rem" }}>
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h1>
              <h5 className="mb-0 fw-light">{currentPosition}</h5>
            </Card.Header>

            <Row className="g-0">
              {/* Sidebar */}
              <Col md={4} className="bg-light p-4 text-center text-md-start">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <Image
                    src={
                      profile?.picture
                        ? ${cvUrl}/${profile.picture}
                        : "https://placehold.co/200x200?text=Photo"
                    }
                    alt="profile"
                    roundedCircle
                    fluid
                    className="mb-4 shadow"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      border: 4px solid ${BRAND},
                    }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/200x200?text=Photo")
                    }
                  />

                  <Section icon={<FiMapPin />} title="Location">
                    {location}
                  </Section>
                  <Section icon={<FiPhone />} title="Phone">
                    {phone}
                  </Section>
                  <Section icon={<FiMail />} title="Email">
                    {email}
                  </Section>

                  {languages.length > 0 && (
                    <Section title="Languages">
                      <div className="d-flex flex-wrap gap-2">
                        {languages.map((l, i) => (
                          <Badge
                            key={i}
                            pill
                            style={{
                              backgroundColor: BRAND,
                              color: "#fff",
                              fontFamily: "Dosis, sans-serif",
                            }}
                          >
                            {l?.language?.language_name || "Language"}
                          </Badge>
                        ))}
                      </div>
                    </Section>
                  )}
                </div>
              </Col>

              {/* Main content */}
              <Col
                md={8}
                className="p-4"
                style={{ fontFamily: "Dosis, sans-serif" }}
              >
                <TimelineSection title="About Me">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    {intro}
                  </p>
                </TimelineSection>

                <TimelineSection title="Experience">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{ borderLeft: 5px solid ${BRAND} }}
                      >
                        <div className="fw-semibold">
                          {exp?.position?.position_name || "Job Title"}
                          {exp?.employer?.employer_name && (
                            <span className="text-muted">
                              {" "}
                              @ {exp.employer.employer_name}
                            </span>
                          )}
                        </div>
                        <div className="text-muted small mb-2">
                          {formatY(exp?.start_date)} –{" "}
                          {formatY(exp?.end_date) || "Present"}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mb-0 small">
                            {exp.responsibility
                              .split("\n")
                              .map((t) => t.trim())
                              .filter(Boolean)
                              .map((t, k) => (
                                <li key={k}>{t.replace(/^•\s*/, "")}</li>
                              ))}
                          </ul>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="text-secondary">
                      No job experience added.
                    </div>
                  )}
                </TimelineSection>

                <TimelineSection title="Education">
                  {education.length ? (
                    education.map((edu, i) => (
                      <Card
                        body
                        className="mb-3 border-0 shadow-sm"
                        key={i}
                        style={{ borderLeft: 5px solid ${BRAND} }}
                      >
                        <div className="fw-semibold">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div>
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            "—"}
                        </div>
                        <div className="text-muted small">
                          {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-secondary">
                      No education records available.
                    </div>
                  )}
                </TimelineSection>

                <TimelineSection title="Skills & Tools">
                  <div className="d-flex flex-wrap gap-2">
                    {knowledge.map((k, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))}
                    {software.map((s, i) => (
                      <Badge
                        key={i}
                        pill
                        bg="secondary"
                        style={{ color: "#fff" }}
                      >
                        {s?.software?.software_name}
                      </Badge>
                    ))}
                    {culture.map((c, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} pill bg="dark" style={{ color: "#fff" }}>
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </TimelineSection>

                {referees.length > 0 && (
                  <TimelineSection title="Referees">
                    {referees.map((r, i) => {
                      const fullName = [
                        r.first_name,
                        r.middle_name,
                        r.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Card
                          body
                          className="mb-3 border-0 shadow-sm"
                          key={r.id ?? i}
                          style={{ borderLeft: 5px solid ${BRAND} }}
                        >
                          <div className="fw-semibold">{fullName || "—"}</div>
                          <div className="text-muted">
                            {r?.referee_position || "—"}
                          </div>
                          <div>{r?.employer || "—"}</div>
                          <div className="small">{r?.phone || "—"}</div>
                          <div className="small">{r?.email || "—"}</div>
                        </Card>
                      );
                    })}
                  </TimelineSection>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function Section({ title, children, icon }) {
  return (
    <div className="mb-3">
      <h6
        className="fw-semibold mb-1 d-flex align-items-center"
        style={{ color: BRAND }}
      >
        {icon && <span className="me-2">{icon}</span>} {title}
      </h6>
      <div>{children || "—"}</div>
    </div>
  );
}

function TimelineSection({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3" style={{ color: BRAND }}>
        {title}
      </h4>
      {children}
    </div>
  );
}
 Template 11 