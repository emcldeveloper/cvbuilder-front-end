import React, { useState } from 'react';
import { Row, Col, Form, Button,Container } from 'react-bootstrap';

const JobSearchSection = () => {
  // State for input and select fields
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    console.log('Search term:', searchTerm);
    console.log('Selected category:', selectedCategory);
  };

  return (
    <Container>
      <div className="w-100">
    <Row>
      <Col md={12}>
        <Row className="d-flex align-items-center justify-content-between">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="What are you looking for..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="customForm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Select Category"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <option value="">Select Category</option>
              {/* Replace the below options with dynamic data */}
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              onClick={handleSearch}
              style={{
                backgroundColor: '#D36314',
                color: '#fff',
                width: '100%',
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
    
  </div></Container>
    
  );
};

export default JobSearchSection;
