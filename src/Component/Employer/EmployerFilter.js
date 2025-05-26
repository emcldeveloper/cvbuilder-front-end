import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const EmployerFilter = ({ filters, onChange }) => {
  // Static A–Z characters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
            {/* Your industry options here */}
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
            {/* Your country options here */}
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
            {/* Your region options here */}
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
