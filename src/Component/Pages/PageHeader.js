import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PageHeader = ({ title }) => {
  return (
   <Container
      fluid
      className="m-0 p-0"
      style={{ backgroundColor: '#2E58A6' }}
    >
      <Row className="m-0 py-2">
        <Col>
          <p style={{ color: '#fff', margin: 0, paddingLeft: '94px' }}>
            <span></span>{title}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PageHeader;
