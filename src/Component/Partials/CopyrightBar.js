import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CopyrightBar = ({ title = 'All rights reserved' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Container fluid style={{ backgroundColor: '#1E65A6', paddingTop: '2%' }}>
      <Row>
        <Col className="text-center">
          <b style={{ color: '#fff' }}>
            © {currentYear}. {title}
          </b>
        </Col>
      </Row>
    </Container>
  );
};

export default CopyrightBar;
