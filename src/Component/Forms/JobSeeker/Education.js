import { Modal, Button, Form, Row, Col ,Spinner } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useEducationLevel from '../../../hooks/Universal/EducationLevel';
import useCourse from '../../../hooks/Universal/Course';
import useMajor from '../../../hooks/Universal/Major';
import useOrganization from '../../../hooks/Universal/Organization';
import { useEffect, useState } from 'react';
import useEducationForm from '../../../hooks/Candidate/UseEducation';
import useCollege from '../../../hooks/Universal/College';

const AddEducationModal = ({ show, onHide }) => {
    const applicant_id = localStorage.getItem("applicantId");
    const { educationLevel, loadingevel } = useEducationLevel();
    const { course, loadingcourse } = useCourse();
    const { major, loadingmajor } = useMajor();
    const { organization, loadorganization } = useOrganization();
    const {college ,loadcollege}=useCollege();
    console.log("college education is available for this situation",college);

    const levelOptions = educationLevel.data?.map(level => ({
        value: level.id,
        label: level.education_level
    })) || [];
    const CourseOptions = course?.map(course => ({
        value: course.id,
        label: course.course_name
    })) || [];
    const [courseoptions2, setOptions] = useState([]);

    useEffect(() => setOptions(CourseOptions.slice(0, 10)), [course]);

    const loadMore = () => {
        setOptions(prev => CourseOptions.slice(0, prev.length + 10));
    };
    //college
    const AllCollegeOptions = college?.map(college => ({
        value: college.id,
        label: college.college_name
    })) || [];
    const [CollegeOptions, setCollegeOptions] = useState([]);

    useEffect(() => setCollegeOptions(AllCollegeOptions.slice(0, 10)), [college]);

    const loadMoreCollege = () => {
        setCollegeOptions(prev => CollegeOptions.slice(0, prev.length + 10));
    };

    //end of college
    const AllMajorOptions = major?.map(major => ({
        value: major.id,
        label: major.name
    })) || [];
    const [Majoroptions, setmajorOptions] = useState([]);

    useEffect(() => setmajorOptions(AllMajorOptions.slice(0, 10)), [major]);

    const loadMoreMajor = () => {
        setmajorOptions(prev => AllMajorOptions.slice(0, prev.length + 10));
    };
    const AllOrganizationOptions = organization?.map(organization => ({
        value: organization.id,
        label: organization.organization_name,
    })) || [];

    const [Organizationoptions, setOrganizationOptions] = useState([]);

    useEffect(() => setOrganizationOptions(AllOrganizationOptions.slice(0, 10)), [organization]);

    const loadMoreOrganization = () => {
        setOrganizationOptions(prev => AllOrganizationOptions.slice(0, prev.length + 10));
    };
    const { formData, handleChange, handleFileChange, handleSubmit, loading } = useEducationForm(applicant_id)

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Add Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="education-applicant"
        >
          <input type="hidden" name="id" value="" />

          {/* Level */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Level<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="level"
                options={levelOptions}
                value={
                  formData.level
                    ? levelOptions.find((opt) => opt.value === formData.level)
                    : null
                }
                placeholder="Select education level..."
                onChange={(selected) =>
                  handleChange("level", selected?.value || "")
                }
                isSearchable
              />
            
            </Col>
          </Form.Group>

          {/* College / University */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              College / University<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="college"
                options={CollegeOptions}
                onMenuScrollToBottom={loadMoreCollege}
                value={
                  formData.college
                    ? CollegeOptions.find(
                        (opt) => opt.value === formData.college
                      )
                    : null
                }
                placeholder="Select college..."
                onChange={(selected) =>
                  handleChange("college", selected?.value || "")
                }
                isSearchable
              />
             
            </Col>
          </Form.Group>

          {/* Course */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Course<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                name="course"
                options={courseoptions2}
                onMenuScrollToBottom={loadMore}
                value={
                  formData.course
                    ? courseoptions2.find(
                        (opt) => opt.value === formData.course
                      )
                    : null
                }
                placeholder="Select course..."
                onChange={(selected) =>
                  handleChange("course", selected?.value || "")
                }
                isSearchable
              />
             
            </Col>
          </Form.Group>

          {/* Major */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Specialized In<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <CreatableSelect
                name="major"
                options={Majoroptions}
                onMenuScrollToBottom={loadMoreMajor}
                value={
                  formData.major
                    ? Majoroptions.find(
                        (opt) => opt.value === formData.major
                      )
                    : null
                }
                placeholder="Select course / specialized in..."
                onChange={(selected) =>
                  handleChange("major", selected?.value || "")
                }
                isSearchable
              />
            
            </Col>
          </Form.Group>

          {/* Started */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Started<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="started"
                value={formData.started}
                onChange={(e) => handleChange("started", e.target.value)}
                required
              />
             
            </Col>
          </Form.Group>

          {/* Ended */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="ended"
                value={formData.ended}
                onChange={(e) => handleChange("ended", e.target.value)}
                required
              />
         
            </Col>
          </Form.Group>

          {/* Attachment */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attach Certificate<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="attachment"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                PDF format only, max size: 5MB.
              </Form.Text>
             
            </Col>
          </Form.Group>

          {/* Footer */}
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </Modal.Footer>
        </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEducationModal;