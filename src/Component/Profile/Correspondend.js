import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  Form,
  Button,
  Spinner,
  Modal,
  Alert,
  Row,
  Col,
  Badge,
  Container
} from 'react-bootstrap';
import { Envelope, Person, Check, X, Briefcase, Search } from 'react-bootstrap-icons';
import dayjs from 'dayjs';

const employersSample = [
  { id: 1, companyName: 'TechCorp Inc.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 3, lastMessage: '2 hours ago' },
  { id: 2, companyName: 'DesignHub LLC', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 0, lastMessage: '1 day ago' },
  { id: 3, companyName: 'DataSystems Co.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 1, lastMessage: '3 hours ago' },
  { id: 4, companyName: 'FinServe Ltd.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 0, lastMessage: '1 week ago' },
  { id: 5, companyName: 'MediHealth', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 2, lastMessage: 'Yesterday' },
  { id: 6, companyName: 'RetailZone', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 0, lastMessage: '2 days ago' },
  { id: 7, companyName: 'EduSmart', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 5, lastMessage: 'Just now' },
  { id: 8, companyName: 'AgriPlus', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 0, lastMessage: '3 weeks ago' },
  { id: 9, companyName: 'BuildPro', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 1, lastMessage: '5 days ago' },
  { id: 10, companyName: 'TransLogix', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', unread: 0, lastMessage: '1 month ago' }
];

const messageTypes = {
  OFFER: 'offer',
  INTERVIEW: 'interview',
  MESSAGE: 'message'
};

const EmpCorrespondence = () => {
  const [employers] = useState(employersSample);
  const [messagesByEmployer] = useState({
    1: [
      { 
        id: 1, 
        sender: 'employer', 
        content: 'We are impressed with your skills! Would you like to accept our Senior Developer position?', 
        timestamp: new Date(), 
        read: false, 
        type: messageTypes.OFFER,
        salary: '$95,000',
        benefits: 'Health insurance, 401k matching, remote work options'
      }
    ],
    2: [
      { 
        id: 2, 
        sender: 'employer', 
        content: 'We would like to schedule an interview for the UI/UX Designer position. Please let us know your availability.', 
        timestamp: new Date(Date.now() - 86400000), 
        read: true, 
        type: messageTypes.INTERVIEW 
      }
    ],
    3: [
      { 
        id: 3, 
        sender: 'employer', 
        content: 'Congratulations! We are offering you the Data Analyst position at our company.', 
        timestamp: new Date(Date.now() - 43200000), 
        read: false, 
        type: messageTypes.OFFER,
        salary: '$85,000',
        benefits: 'Health insurance, stock options, flexible hours'
      }
    ],
    7: [
      { 
        id: 4, 
        sender: 'employer', 
        content: 'Your application for the Education Consultant role has moved to the next stage!', 
        timestamp: new Date(), 
        read: false, 
        type: messageTypes.MESSAGE 
      }
    ],
    4: [], 5: [], 6: [], 8: [], 9: [], 10: []
  });
  
  const [activeEmployer, setActiveEmployer] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [status, setStatus] = useState({});
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentEmployer = employers.find(e => e.id === activeEmployer) || employers[0];
  const currentMessages = messagesByEmployer[activeEmployer] || [];

  const filteredEmployers = employers.filter(emp => 
    emp.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const newId = (messagesByEmployer[activeEmployer]?.length || 0) + 1;
      const sentMessage = {
        id: newId,
        sender: 'applicant',
        content: newMessage,
        timestamp: new Date(),
        read: true,
        type: messageTypes.MESSAGE
      };
      messagesByEmployer[activeEmployer].push(sentMessage);
      setNewMessage('');
      setLoading(false);
    }, 800);
  };

  const handleAccept = (id) => {
    setStatus({ ...status, [id]: 'accepted' });
    setShowStatusAlert(true);
    setTimeout(() => setShowStatusAlert(false), 3000);
  };

  const handleReject = (id) => {
    if (rejectReason.trim()) {
      setStatus({ ...status, [id]: 'rejected' });
      setShowRejectForm(false);
      setRejectReason('');
      setShowStatusAlert(true);
      setTimeout(() => setShowStatusAlert(false), 3000);
    }
  };

  const renderMessageContent = (msg) => {
    switch(msg.type) {
      case messageTypes.OFFER:
        return (
          <div>
            <p>{msg.content}</p>
            <div className="bg-light p-3 rounded mt-2">
              <h6 className="text-primary">Offer Details</h6>
              <p><strong>Salary:</strong> {msg.salary}</p>
              <p><strong>Benefits:</strong> {msg.benefits}</p>
            </div>
            {!status[activeEmployer] && (
              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="success" onClick={() => handleAccept(currentEmployer.id)}>
                  <Check className="me-1" /> Accept Offer
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => setShowRejectForm(true)}>
                  <X className="me-1" /> Reject Offer
                </Button>
              </div>
            )}
          </div>
        );
      case messageTypes.INTERVIEW:
        return (
          <div>
            <p>{msg.content}</p>
            <div className="mt-3">
              <Button size="sm" variant="primary">
                <Briefcase className="me-1" /> Schedule Interview
              </Button>
            </div>
          </div>
        );
      default:
        return <p>{msg.content}</p>;
    }
  };

  return (
    <Container fluid className="p-0 h-100" style={{ overflow: 'hidden' }}>
      <Row className="g-0 h-100">
        {/* Employer Sidebar */}
        <Col md={3} className="border-end h-100 d-flex flex-column bg-light" style={{ overflow: 'hidden' }}>
          <div className="p-3 border-bottom bg-white">
            <h5 className="mb-3">Messages</h5>
            <Form.Group className="mb-3">
              <div className="position-relative">
                <Form.Control 
                  type="text" 
                  placeholder="" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ps-4"
                />
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              </div>
            </Form.Group>
          </div>
          
          <div className="flex-grow-1 overflow-hidden d-flex flex-column">
            <ListGroup variant="flush" className="overflow-auto flex-grow-1">
              {filteredEmployers.map(emp => (
                <ListGroup.Item
                  key={emp.id}
                  action
                  active={emp.id === activeEmployer}
                  onClick={() => setActiveEmployer(emp.id)}
                  className="py-3 border-bottom"
                  style={{
                    borderLeft: emp.id === activeEmployer ? '4px solid #0d6efd' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'border-left 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <img 
                        src={emp.logo} 
                        alt={emp.companyName} 
                        width={40} 
                        height={40} 
                        className="rounded-circle me-3" 
                      />
                      {emp.unread > 0 && (
                        <Badge 
                          pill 
                          bg="danger" 
                          className="position-absolute top-0 start-100 translate-middle"
                          style={{ transform: 'translate(-50%, -50%)' }}
                        >
                          {emp.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <h6 className="mb-0 text-truncate">{emp.companyName}</h6>
                      <small className="text-muted text-truncate d-block">{emp.lastMessage}</small>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        {/* Message Content Area */}
        <Col md={9} className="h-100 d-flex flex-column bg-white">
          <Card className="flex-grow-1 d-flex flex-column border-0">
            <Card.Header className="d-flex align-items-center border-bottom">
              <img 
                src={currentEmployer.logo} 
                alt={currentEmployer.companyName} 
                width={40} 
                height={40} 
                className="rounded-circle me-3" 
              />
              <div>
                <h5 className="mb-0">{currentEmployer.companyName}</h5>
                <small className="text-muted">
                  {currentMessages.length > 0 
                    ? `${currentMessages.length} message${currentMessages.length !== 1 ? 's' : ''}` 
                    : 'No messages yet'}
                </small>
              </div>
            </Card.Header>

            <Card.Body 
              className="flex-grow-1 overflow-auto p-0" 
              style={{ background: '#f8f9fa' }}
            >
              {showStatusAlert && (
                <Alert 
                  variant={status[activeEmployer] === 'accepted' ? 'success' : 'danger'} 
                  dismissible 
                  onClose={() => setShowStatusAlert(false)}
                  className="m-3"
                >
                  {status[activeEmployer] === 'accepted'
                    ? `You have accepted the offer from ${currentEmployer.companyName}!`
                    : `You have declined the offer from ${currentEmployer.companyName}.`}
                </Alert>
              )}

              {currentMessages.length === 0 ? (
                <div 
                  className="d-flex flex-column align-items-center justify-content-center h-100 text-muted"
                  style={{ minHeight: '300px' }}
                >
                  <Envelope size={48} className="mb-3 opacity-50" />
                  <h5>No messages yet</h5>
                  <p className="text-center">Start your conversation with {currentEmployer.companyName}</p>
                </div>
              ) : (
                <div className="p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                  {currentMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 p-4 rounded ${msg.sender === 'employer' ? 'bg-white border' : 'bg-primary text-white'}`}
                      style={{
                        boxShadow: msg.sender === 'employer' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      <div className="d-flex justify-content-between mb-3">
                        <strong>{msg.sender === 'employer' ? currentEmployer.companyName : 'You'}</strong>
                        <small className={msg.sender === 'employer' ? 'text-muted' : 'text-white-50'}>
                          {dayjs(msg.timestamp).format('MMM D, h:mm A')}
                        </small>
                      </div>
                      {renderMessageContent(msg)}
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>

            <Card.Footer className="border-top bg-white">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`Message ${currentEmployer.companyName}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mb-3"
                  style={{ resize: 'none' }}
                />
                <div className="d-flex justify-content-end">
                  <Button 
                    variant="primary" 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim() || loading}
                    style={{ minWidth: '120px' }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Envelope className="me-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Reject Offer Modal */}
      <Modal show={showRejectForm} onHide={() => setShowRejectForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Decline Offer from {currentEmployer.companyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">Please provide a reason for declining this offer (optional but appreciated):</p>
          <Form.Group>
            <Form.Control 
              as="textarea" 
              rows={4} 
              value={rejectReason} 
              onChange={(e) => setRejectReason(e.target.value)} 
              placeholder="Your reason..."
              style={{ resize: 'none' }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowRejectForm(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleReject(currentEmployer.id)}
            disabled={!rejectReason.trim()}
          >
            Decline Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmpCorrespondence;