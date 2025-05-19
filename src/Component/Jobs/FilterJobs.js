import React, { useState } from 'react';
import { Dropdown, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

const FilterJobs = () => {
  // States for filters
  const [selectedTime, setSelectedTime] = useState('Any Time');
  const [selectedJobType, setSelectedJobType] = useState('Any Type');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubLocation, setSelectedSubLocation] = useState('');
  const [selectedPositionLevel, setSelectedPositionLevel] = useState('');
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filter options
  const timeOptions = [{ label: 'Any Time', value: ' ' }, { label: 'Past 24 Hours', value: '1' }, { label: 'Past Week', value: '7' }];
  const jobTypeOptions = [
    { label: 'Any Type', value: '', color: '#ff6600' },
    { label: 'Contract', value: '3', color: '#0170c1' },
    { label: 'Full-time', value: '1', color: '#33ff00' },
  ];
  const positionLevelOptions = [
    { label: 'Any Level', value: '' }, { label: 'Junior', value: 'Junior' }, { label: 'Mid-Level', value: 'Mid-Level' },
  ];
  const countryOptions = [
    { label: 'USA', value: 'USA' }, { label: 'Canada', value: 'Canada' }, { label: 'UK', value: 'UK' },
  ];
  const regionOptions = { USA: [{ label: 'California', value: 'California' }], Canada: [{ label: 'Ontario', value: 'Ontario' }] };
  const subLocationOptions = { California: ['San Francisco', 'Los Angeles'], Ontario: ['Toronto', 'Ottawa'] };

  // Handlers
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const handleCountryChange = (country) => { setSelectedCountry(country); setSelectedRegion(''); setSelectedSubLocation(''); };
  const handleRegionChange = (region) => { setSelectedRegion(region); setSelectedSubLocation(''); };

  return (
    <div className="container-fluid border-bottom filters-bar-job-result py-4">
      <Row className="d-flex align-items-center">
        {/* Time Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-time" className="w-100">
              {selectedTime}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {timeOptions.map((option) => (
                <Form.Check key={option.value} type="radio" name="job_post_day" label={option.label} value={option.value} checked={selectedTime === option.label} onChange={() => setSelectedTime(option.label)} />
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
                    <div className="box_job_type me-2" style={{ backgroundColor: option.color }} />
                    <span className="job-type text-dark">{option.label}</span>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Position Level Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-position-level" className="w-100">
              {selectedPositionLevel || 'Select Position Level'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {positionLevelOptions.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => setSelectedPositionLevel(option.label)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Country Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-country" className="w-100">
              {selectedCountry || 'Select Country'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {countryOptions.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => handleCountryChange(option.value)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="d-flex align-items-center">
        {/* Region Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-region" className="w-100">
              {selectedRegion || 'Select Region'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {selectedCountry && regionOptions[selectedCountry]?.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => handleRegionChange(option.value)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Sub-location Filter */}
        <Col md={3} xs={12} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-sublocation" className="w-100">
              {selectedSubLocation || 'Select Sub-location'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {selectedRegion && subLocationOptions[selectedRegion]?.map((subLocation, index) => (
                <Dropdown.Item key={index} onClick={() => setSelectedSubLocation(subLocation)}>
                  <span className="text-dark">{subLocation}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

      
      </Row>
    </div>
  );
};

export default FilterJobs;
