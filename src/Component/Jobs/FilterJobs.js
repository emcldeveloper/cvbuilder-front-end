import React, { useContext } from 'react';
import { Dropdown, Form, Row, Col,Container } from 'react-bootstrap';
import { UniversalContext } from '../../context/UniversalContext';

const FilterJobs = ({
  searchKeyword, setSearchKeyword,
  selectedTime, setSelectedTime,
  selectedJobType, setSelectedJobType,
  selectedCountry, setSelectedCountry,
  selectedRegion, setSelectedRegion,
  selectedSubLocation, setSelectedSubLocation,
  selectedPositionLevel, setSelectedPositionLevel
}) => {
  const {
    types = [],
    countries = [],
    regions = [],
    positionLevels = []
  } = useContext(UniversalContext);

  const timeOptions = [
    { label: 'Any Time', value: '' },
    { label: 'Past 24 Hours', value: '1' },
    { label: 'Past Week', value: '7' }
  ];

  const jobTypeOptions = [
    { label: 'Any Type', value: '' },
    ...types.map(type => ({
      label: type?.type_name || 'Unknown',
      value: String(type?.id)
    }))
  ];

  const positionLevelOptions = [
    { label: 'Any Level', value: '' },
    ...positionLevels.map(level => ({
      label: level?.position_name || 'Unknown',
      value: String(level?.id)
    }))
  ];

  const countryOptions = countries.map(country => ({
    label: country?.name || 'Unknown',
    value: String(country?.id)
  }));

  const regionOptions = regions
    .filter(region => String(region?.country_id) === String(selectedCountry))
    .map(region => ({
      label: region?.region_name || 'Unknown',
      value: String(region?.id),
      sub_locations: region?.sub_locations || []
    }));

  const selectedRegionObj = regionOptions.find(r => r.value === selectedRegion);
  const subLocationOptions = selectedRegionObj?.sub_locations || [];

  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    setSelectedRegion('');
    setSelectedSubLocation('');
  };
  const handleRegionChange = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedSubLocation('');
  };

  return (
    <Container>
      {/* First Row */}
      <Row className="d-flex align-items-center">
        <Col md={3} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search jobs"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </Col>

        <Col md={3} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {timeOptions.find(t => t.value === selectedTime)?.label || 'Any Time'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {timeOptions.map(option => (
                <Form.Check
                  key={option.value}
                  type="radio"
                  name="job_post_day"
                  label={option.label}
                  value={option.value}
                  checked={selectedTime === option.value}
                  onChange={() => setSelectedTime(option.value)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={3} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {jobTypeOptions.find(t => t.value === selectedJobType)?.label || 'Any Type'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {jobTypeOptions.map(option => (
                <Dropdown.Item key={option.value} onClick={() => setSelectedJobType(option.value)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={3} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {positionLevelOptions.find(p => p.value === selectedPositionLevel)?.label || 'Select Position Level'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {positionLevelOptions.map(option => (
                <Dropdown.Item
                  key={option.value}
                  onClick={() => setSelectedPositionLevel(option.value)}
                >
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="d-flex align-items-center">
        <Col md={3} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {countryOptions.find(c => c.value === selectedCountry)?.label || 'Select Country'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {countryOptions.map(option => (
                <Dropdown.Item key={option.value} onClick={() => handleCountryChange(option.value)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={3} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {regionOptions.find(r => r.value === selectedRegion)?.label || 'Select Region'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-3 px-3 shadow-lg">
              {regionOptions.map(option => (
                <Dropdown.Item key={option.value} onClick={() => handleRegionChange(option.value)}>
                  <span className="text-dark">{option.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

       
      </Row>
    </Container>
  );
};

export default FilterJobs;
