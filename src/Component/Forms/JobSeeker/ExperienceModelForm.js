import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import useEmployers from '../../../hooks/Universal/Employer';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import UsegetCountries from '../../../hooks/Universal/Country';
import useRegions from '../../../hooks/Universal/Region';
import usePosition from '../../../hooks/Universal/Position';
import useIndustry from '../../../hooks/Universal/Industry';
import usePositionLevel from '../../../hooks/Universal/PositionLevel';
import usesalaryRange from '../../../hooks/Universal/SalaryRange';
import useSalaryRange from '../../../hooks/Universal/SalaryRange';
import useExperienceType from '../../../hooks/Universal/ExperienceType';
import useExperinceForm from '../../../hooks/Candidate/UseExperience';


const AddWorkExperienceModal = ({ show, onHide, edit }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const [currentRole, setCurrentRole] = useState(false);
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);
  const { formData, handleSubmit, handleChange } = useExperinceForm(applicant_id);




  const toggleCurrentRole = () => {
    setCurrentRole(!currentRole);
  };
  const { employers, loademployer } = useEmployers();
  const AllEmployerOptions = employers?.map(employer => ({
    value: employer.id,
    label: employer.employer_name,
  })) || [];

  const [Employeronoptions, setEmployerOptions] = useState([]);

  useEffect(() => setEmployerOptions(AllEmployerOptions.slice(0, 10)), [employers]);

  const loadMoreEmployer = () => {
    setEmployerOptions(prev => AllEmployerOptions.slice(0, prev.length + 10));
  };
  //country option
  const { countries, loadecountry } = UsegetCountries();
  const AllCountryOptions = countries?.map(country => ({
    value: country.id,
    label: country.name,
  })) || [];

  const [Countryoptions, setCountryOptions] = useState([]);

  useEffect(() => setCountryOptions(AllCountryOptions.slice(0, 10)), [countries]);

  const loadMoreCountry = () => {
    setCountryOptions(prev => AllCountryOptions.slice(0, prev.length + 10));
  };
  //experince type option
  const { experincetype, loadeexperincetype } = useExperienceType();

  const AllexperiencetypeOptions = experincetype?.map(experincetype => ({
    value: experincetype.id,
    label: experincetype.name,
  })) || [];

  const [Experiencetypeoptions, setExperiencetypeOptions] = useState([]);

  useEffect(() => setExperiencetypeOptions(AllexperiencetypeOptions.slice(0, 10)), [countries]);

  const loadMoreExpeiencetype = () => {
    setCountryOptions(prev => AllexperiencetypeOptions.slice(0, prev.length + 10));
  };
  //region option
  const { regions, loaderegion } = useRegions();
  const AllRegionOptions = regions?.map(region => ({
    value: region.id,
    label: region.region_name
  })) || [];

  const [Regionoptions, setRegionOptions] = useState([]);

  useEffect(() => setRegionOptions(AllRegionOptions.slice(0, 10)), [regions]);

  const loadMoreRegions = () => {
    setRegionOptions(prev => AllRegionOptions.slice(0, prev.length + 10));
  };
  //position option
  const { positions, loadposition } = usePosition();
  const AllPositionOptions = positions?.map(position => ({
    value: position.id,
    label: position.position_name
  })) || [];

  const [Positionoptions, setPositionOptions] = useState([]);

  useEffect(() => setPositionOptions(AllPositionOptions.slice(0, 10)), [positions]);

  const loadMorePosition = () => {
    setPositionOptions(prev => AllPositionOptions.slice(0, prev.length + 10));
  };
  //industry
  const { industry, loadindustry } = useIndustry();
  const AllIndustryOptions = industry?.map(industry => ({
    value: industry.id,
    label: industry.industry_name
  })) || [];

  const [Industryoptions, setIndustryOptions] = useState([]);

  useEffect(() => setIndustryOptions(AllIndustryOptions.slice(0, 10)), [industry]);

  const loadMoreIndustry = () => {
    setIndustryOptions(prev => AllIndustryOptions.slice(0, prev.length + 10));
  };
  // positionlevel
  const { positionlevel, loadpositionlevel } = usePositionLevel();
  const AllPositionLevelOptions = positionlevel?.map(positionlevel => ({
    value: positionlevel.id,
    label: positionlevel.position_name

  })) || [];

  const [positionleveloptions, setPositionLevelOptions] = useState([]);

  useEffect(() => setPositionLevelOptions(AllPositionLevelOptions.slice(0, 10)), [positionlevel]);

  const loadMorePositionLevel = () => {
    setPositionLevelOptions(prev => AllPositionLevelOptions.slice(0, prev.length + 10));
  };
  //salry Range
  const { salaryrange, loadsalryrange } = useSalaryRange();
  const AllSalaryRangeOption = salaryrange?.map(salaryrange => ({
    value: salaryrange.id,
    label: salaryrange.low

  })) || [];

  const [salaryrangeoptions, setSalaryRangeOptions] = useState([]);

  useEffect(() => setSalaryRangeOptions(AllSalaryRangeOption.slice(0, 10)), [salaryrange]);

  const loadMoreSalaryRange = () => {
    setSalaryRangeOptions(prev => AllSalaryRangeOption.slice(0, prev.length + 10));
  };
  //second sa,ry range
 
  const AllSalaryRangeOptiontwo = salaryrange?.map(salaryrange => ({
    value: salaryrange.id,
    label: salaryrange.low

  })) || [];

  const [salaryrangeoptionstwo, setSalaryRangeOptionstwo] = useState([]);

  useEffect(() => setSalaryRangeOptionstwo(AllSalaryRangeOptiontwo.slice(0, 10)), [salaryrange]);

  const loadMoreSalaryRangetwo = () => {
    setSalaryRangeOptionstwo(prev => AllSalaryRangeOptiontwo.slice(0, prev.length + 10));
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="experience_applicant" onSubmit={handleSubmit}>

          <input type="hidden" name="id" value="" />

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Experience type<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={3}>
              <Select
                name="experiencetype"
                options={Experiencetypeoptions}
                onMenuScrollToBottom={loadMoreExpeiencetype}
                placeholder="Select  type"
                onChange={(selected) => handleChange("experiencetype", selected)}
                value={formData.experiencetype}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
            <Form.Label column sm={1}>
              Employer<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={5}>
              <CreatableSelect
                name="employer"
                options={Employeronoptions}
                onMenuScrollToBottom={loadMoreEmployer}
                placeholder="Select employer ..."
                onChange={(selected) => handleChange("employer", selected)}
                value={formData.employer}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Location<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={4}>
                  <Form.Label>Country / State<span className="text-danger">*</span></Form.Label>
                  <Select
                    name="country"
                    options={Countryoptions}
                    onMenuScrollToBottom={loadMoreCountry}
                    placeholder="Select country "
                    onChange={(selected) => handleChange("country", selected)}
                    isSearchable // this is the default behavior
                    isClearable // Allow clearing the selected option
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Region / City<span className="text-danger">*</span></Form.Label>
                  <Select
                    name="region"
                    options={Regionoptions}
                    onMenuScrollToBottom={loadMoreRegions}
                    placeholder="Select Region "
                    onChange={(selected) => handleChange("region", selected)}
                    isSearchable // this is the default behavior
                    isClearable // Allow clearing the selected option
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Sub Location<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="sub_location"
                    className="sub_location"
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Position<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={7}>
                  <Select
                    name="position"
                    options={Positionoptions}
                    onMenuScrollToBottom={loadMorePosition}
                    placeholder="Select Position "
                    onChange={(selected) => handleChange("position", selected)}
                    isSearchable // this is the default behavior
                    isClearable // Allow clearing the selected option
                  />
                </Col>

                <Col md={5}>
                  <Select
                    name="positionlevel"
                    options={positionleveloptions}
                    onMenuScrollToBottom={loadMorePositionLevel}
                    placeholder="Select level "
                    onChange={(selected) => handleChange("positionlevel", selected)}
                    isSearchable // this is the default behavior
                    isClearable // Allow clearing the selected option
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Industry <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="industry"
                options={Industryoptions}
                onMenuScrollToBottom={loadMoreIndustry}
                placeholder="Select industry "
                onChange={(selected) => handleChange("industry", selected)}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
          </Form.Group>

          {showCustomIndustry && (
            <Form.Group as={Row} className="mb-3 custom-industry-container">
              <Form.Label column sm={3}>
                Please specify <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="custom-industry"
                  name="custom_industry"
                  className="custom-industry"
                  required
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={3}>
              Duration<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Row className="mb-2">
                <Col md={12}>
                  <Form.Check
                    type="checkbox"
                    id="currentRoleCheckbox"
                    label="I am currently working in this role"
                    onChange={toggleCurrentRole}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label>Started<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="started"
                    className="input-sm"
                    required

                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Ended<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="ended"
                    className="input-sm"
                    disabled={currentRole}
                    required={!currentRole}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Salary Range from <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={4}>
              <Select
                name="startsalaryRange"
                options={salaryrangeoptions}
                onMenuScrollToBottom={loadMoreSalaryRange}
                placeholder="Select Salry Range "
                onChange={(selected) => handleChange("startsalaryRange", selected)}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
            <Form.Label column sm={1}>
              To <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={4}>
              <Select
                name="endsalaryRange"
                options={salaryrangeoptionstwo}
                onMenuScrollToBottom={loadMoreSalaryRangetwo}
                placeholder="Select Salry Range "
                onChange={(selected) => handleChange("endsalaryRange", selected)}
                isSearchable // this is the default behavior
                isClearable // Allow clearing the selected option
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Responsibility<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                name="responsibility"
                style={{ height: '100px' }}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Reason for Leaving <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                name="remark"
                style={{ height: '100px' }}
                required
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="outline-secondary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkExperienceModal;