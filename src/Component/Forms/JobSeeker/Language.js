import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useLanguage from '../../../hooks/Universal/Language';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import useReadLanguage from '../../../hooks/Universal/ReadLanguage';
import useWriteLanguage from '../../../hooks/Universal/Writeanguage';
import useSpeakLanguage from '../../../hooks/Universal/Speak';
import useUnderstandLanguage from '../../../hooks/Universal/Undertsand';

const AddLanguageModal = ({ show, onHide }) => {
    const { languages, loadinglanguage } = useLanguage();
    const { readlanguage, loadreadlanguage } = useReadLanguage()
    const { writelanguage, loadwritelanguage } = useWriteLanguage();
    const { speaklanguage, loadspeaklanguage } = useSpeakLanguage();
    const { understandlanguage, loadunderstandlanguage } = useUnderstandLanguage();
    const AllLanguageOptions = languages?.map(language => ({
        value: language.id,
        label: language.language_name,
    })) || [];
    const AllReadLanguageOptions = readlanguage?.map(read => ({
        value: read.id,
        label: read.read_ability,
    })) || [];
    const AllWriteLanguageOptions = writelanguage?.map(write => ({
        value: write.id,
        label: write.write_ability,
    })) || [];
    const AllSpeakLanguageOptions = speaklanguage?.map(speak => ({
        value: speak.id,
        label: speak.speak_ability,
    })) || [];
    const AllUnderstandLanguageOptions = understandlanguage?.map(understand => ({
        value: understand.id,
        label: understand.understand_ability,
    })) || [];
    console.log("langauge understand list yes", AllUnderstandLanguageOptions);
    const [Langaugeoptions, setLanguageOptions] = useState([]);


    useEffect(() => setLanguageOptions(AllLanguageOptions.slice(0, 10)), [languages]);


    const loadMoreLanguage = () => {
        setLanguageOptions(prev => AllLanguageOptions.slice(0, prev.length + 10));
    };
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Add Language</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="language-applicant">

                    <input type="hidden" name="id" value="" />

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Language
                        </Form.Label>
                        <Col sm={9}>
                            <Select
                                name="language"
                                options={Langaugeoptions}
                                onMenuScrollToBottom={loadMoreLanguage}
                                placeholder="Select language ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected language:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Read<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>

                            <Select
                                name="read"
                                options={AllReadLanguageOptions}

                                placeholder="Select read language ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected  read language:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Write<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>
                            <Select
                                name="write"
                                options={AllWriteLanguageOptions}

                                placeholder="Select write language ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected  write language:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Speak<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>

                            <Select
                                name="speak"
                                options={AllSpeakLanguageOptions}

                                placeholder="Select speak language ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected  speak language:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Understand<span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm={9}>


                            <Select
                                name="understand"
                                options={ AllUnderstandLanguageOptions}

                                placeholder="Select understand language ..."
                                onChange={selected => {
                                    // You can store this in state or pass to your form handler
                                    console.log("Selected  understand language:", selected);
                                }}
                                isSearchable // this is the default behavior
                            />
                        </Col>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="outline-secondary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddLanguageModal;