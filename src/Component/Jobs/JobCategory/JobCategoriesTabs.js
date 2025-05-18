// JobCategoriesTabs.js
import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import Industry from './Industry';
import Category from './Category';
import Locations from './Locations';

const JobCategoriesTabs = () => {
  return (
    <Container fluid className="bg-white">
     
        <h4 className="d-flex fw-bold justify-content-center" style={{ color: '#2E58A6', marginTop: '2%' }}>
          Job Categories
        </h4>
        <br />

        <Container>
           <Tabs
          defaultActiveKey="industry"
          id="job-category-tabs"
          className="mb-3 justify-content-center"
          mountOnEnter
          unmountOnExit
        >
          <Tab eventKey="industry" title="By Job Categories">
            <Industry />
          </Tab>
          <Tab eventKey="byindustry" title="By Companies Industry">
            <Category />
          </Tab>
          <Tab eventKey="location" title="By Locations">
            <Locations />
          </Tab>
        </Tabs>
        </Container>
     
    </Container>
  );
};

export default JobCategoriesTabs;
