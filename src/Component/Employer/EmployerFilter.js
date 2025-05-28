import React, { useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { UniversalContext } from '../../context/UniversalContext';
import toTitleCase from "../../utils/toTitleCase"; // Import the utility function

const EmployerFilter = ({ filters, onChange }) => {
  // Static A–Z characters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fetching context data
  const {
    industries = [],  // Assuming 'industries' is an array from context
    countries = [],   // Assuming 'countries' is an array from context
    jobCountByRegion = []      // Assuming 'regions' is an array from context
  } = useContext(UniversalContext);

  return (
    <Card className="shadow-sm border-light">
      <Card.Header
        className="text-white d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#2E58A6" }}
      >
        <h6 className="mb-0">Filters</h6>
        <Button
          variant="link"
          className="text-white text-decoration-underline p-0"
          onClick={() => onChange('reset')} // Reset all filters logic can be added here if necessary
        >
          Reset All
        </Button>
      </Card.Header>

      <Card.Body>
        {/* Industry */}
        <div className="mb-3">
          <Form.Label className="text-primary">Industry</Form.Label>
          <Form.Select
            value={filters.industry}
            onChange={(e) => onChange("industry", e.target.value)}
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.name}>
                {toTitleCase(industry.industry_name)}  {/* Applying toTitleCase here */}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Country */}
        <div className="mb-3">
          <Form.Label className="text-primary">Country</Form.Label>
          <Form.Select
            value={filters.country}
            onChange={(e) => onChange("country", e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {toTitleCase(country.name)}  {/* Applying toTitleCase here */}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Region */}
        <div className="mb-3">
          <Form.Label className="text-primary">Region</Form.Label>
          <Form.Select
            value={filters.region}
            onChange={(e) => onChange("region", e.target.value)}
          >
            <option value="">Select Region</option>
            {jobCountByRegion.map((region) => (
              <option key={region.id} value={region.name}>
                {toTitleCase(region.region_name)}  {/* Applying toTitleCase here */}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Character Filter */}
        <div className="mb-3">
          <Form.Label className="text-primary">Series (A to Z)</Form.Label>
          <Form.Select
            value={filters.character}
            onChange={(e) => onChange("character", e.target.value)}
          >
            <option value="">Select Character</option>
            {alphabet.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployerFilter;
