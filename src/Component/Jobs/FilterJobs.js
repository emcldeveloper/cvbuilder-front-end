import React, { useState } from 'react';
import { Dropdown, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

const FilterJobs = () => {
  const [selectedTime, setSelectedTime] = useState('Any Time');
  const [selectedJobType, setSelectedJobType] = useState('Any Type');
  const [selectedSalary, setSelectedSalary] = useState(null);

  const timeOptions = [
    { label: 'Past 24 Hours', value: '1' },
    { label: 'Past Week', value: '7' },
    { label: 'Past Quarter', value: '14' },
    { label: 'Past Month', value: '30' },
    { label: 'Any Time', value: ' ' },
  ];

  const jobTypeOptions = [
    { label: 'Contract', value: '3', color: '#0170c1' },
    { label: 'Full-time', value: '1', color: '#33ff00' },
    { label: 'Internship', value: '6', color: '#01b0f1' },
    { label: 'Part-time', value: '2', color: '#00af50' },
    { label: 'Permanent', value: '4', color: '#ec8b5e' },
    { label: 'Remote', value: '7', color: '#ffc001' },
    { label: 'Temporary', value: '5', color: '#cc0033' },
    { label: 'Any Type', value: '', color: '#ff6600' },
  ];

  const salaryOptions = [
    { label: '$0', value: '6', count: 3912 },
  ];

  return (
    <div className="container-fluid border-bottom filters-bar-job-result">
      <Row className="d-flex align-items-center">
        {/* Time Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-time" className="w-100">
              {selectedTime}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {timeOptions.map((option) => (
                <Form.Check
                  key={option.value}
                  type="radio"
                  name="job_post_day"
                  id={`sf_job_post_day_${option.value}`}
                  label={option.label}
                  value={option.value}
                  checked={selectedTime === option.label}
                  onChange={() => setSelectedTime(option.label)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Job Type Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-job-type" className="w-100">
              {selectedJobType}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {jobTypeOptions.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => setSelectedJobType(option.label)}>
                  <div className="d-flex mb-2 align-items-center">
                    <div
                      className="box_job_type me-2"
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="job-type text-dark">{option.label}</span>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Salary Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-salary" className="w-100">
              Salary
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg" style={{ width: '260px' }}>
              {salaryOptions.map((option) => (
                <Form.Check
                  key={option.value}
                  type="checkbox"
                  label={`$ ${option.label}`}
                  value={option.value}
                  checked={selectedSalary === option.value}
                  onChange={() => setSelectedSalary(option.value)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Job Search Input */}
        <Col md={3} xs={12} className="mb-3">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by title, skill, or company"
              className="form-control"
              aria-label="Search"
            />
            <Button variant="primary" id="button-addon2">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default FilterJobs;
