import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConsentFormModal = ({ show, onClose }) => {
    const [consentGiven, setConsentGiven] = useState(false);
    const [applicantName, setApplicantName] = useState('Khalifa kasimu selemani');
    const [date, setDate] = useState('02 Jun, 2025');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Consent submitted:', { applicantName, date, consentGiven });
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title><h5> REFERENCE/BACKGROUND CHECK AUTHORIZATION/CONSENT FORM</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4 mx-4 mx-md-3 px-3 px-md-2">
                        <p className="mb-3 text-center"><strong>(Please read the following statements, click the box below to confirm, and submit)</strong></p>

                        <div className="px-lg-3 mx-lg-3">
                            <p className="mb-3 text-justify">
                                I, <strong>{applicantName}</strong> hereby authorize any investigation or duly accredited representative of eKazi Company bearing this form to obtain any information from School/College, Local Government Office/Officials, Past Employers, Criminal Records Authorities, or individual, relating to any activities/ past records. This information may include, but is not limited to, academic, residential, achievement, performance, attendance, personal history, disciplinary, arrest, and conviction records. I hereby direct you to release such information upon request of the bearer. I understand that the information released is for official use by eKazi Company and may be disclosed only to the prospective employer as necessary in the fulfillment of official responsibilities.
                            </p>

                            <p className="mb-3 text-justify">
                                I hereby release any individual including record custodians from any all liabilities for damages of whatsoever kind or nature which may at any time result to me on account of compliance, any attempts to comply, with this authorization.
                            </p>

                            <p className="mb-3 text-justify">
                                I hereby oblige to send eKazi Company both offer letter and contract and also to keep eKazi Company updated in all matters patterning to the recruitment process.
                            </p>
                        </div>

                        <div className="text-center mb-3 mt-4">
                            <strong>{applicantName}</strong><br />
                            (Applicant's Full Name)<br />
                            <strong>{date}</strong><br />
                            (Date)
                        </div>
                    </div>

                    <Form.Group className="mb-3" controlId="formConsent">
                        <Form.Check
                            type="checkbox"
                            label="I confirm and authorize the above background check"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="me-2"
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!consentGiven || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Consent'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};


export default ConsentFormModal;