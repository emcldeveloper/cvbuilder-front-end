import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useEducationLevel from '../../../hooks/Universal/EducationLevel';
import useCourse from '../../../hooks/Universal/Course';
import useMajor from '../../../hooks/Universal/Major';
import useOrganization from '../../../hooks/Universal/Organization';
import { useEffect, useState } from 'react';

const AddEducationModal = ({ show, onHide }) => {
    const { educationLevel, loadingevel } = useEducationLevel();
    const { course, loadingcourse } = useCourse();
    const { major, loadingmajor } = useMajor();
    const {organization,loadorganization}=useOrganization();
 
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


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title  className="fs-5">Add Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType="multipart/form-data" className="education-applicant">
                    <input type="hidden" name="id" value="" />

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Level<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Select
                                name="level"
                                options={levelOptions}
                                placeholder="Select education level..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected level:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            College / University<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                              <CreatableSelect
                                name="major"
                                options={Organizationoptions}
                                onMenuScrollToBottom={loadMoreOrganization}
                                placeholder="Select organization ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected organization:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Course<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Select
                                name="level"
                                options={courseoptions2}
                                onMenuScrollToBottom={loadMore}
                                placeholder="Select course ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected course:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Specialized In<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                           
                          <CreatableSelect
                                name="major"
                                options={Majoroptions}
                                onMenuScrollToBottom={loadMoreMajor}
                                placeholder="Select course /specilized in ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected specialized in:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Started<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="date"
                                name="started"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Ended<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="date"
                                name="ended"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Attach Certificate<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="file"
                                name="attachment"
                                accept=".pdf"
                                required
                            />
                            <Form.Text className="text-muted">
                                PDF format is the only acceptable format max size: 5120 KB.
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="outline-secondary" type="submit" id="myButton">
                            Save changes
                            <span className="spinner-border spinner-border-sm ms-2 d-none" role="status" aria-hidden="true"></span>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEducationModal;