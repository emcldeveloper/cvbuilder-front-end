import React, { createContext, useEffect, useState } from 'react';
import {
  getMaritalStatuses,
  getGenders,
  getCountries,
  getRegions,
  getIndustry,
  getMajor,
  getCourse,
  getEducationLevel,
  getPosition,
  getPositionLevel,
  getSiteStatistics
} from '../Api/Universal/UniversalApi';
import { getListOfEmployers } from '../Api/Employer/ListOfEmployerApi';
// Create context
export const UniversalContext = createContext();

// Provider component
export const UniversalProvider = ({ children }) => {
  const [universalData, setUniversalData] = useState({
    maritalStatuses: [],
    genders: [],
    countries: [],
    regions: [],
    industries: [],
    majors: [],
    courses: [],
    educationLevels: [],
    positions: [],
    positionLevels: [],
    siteStatistics: [],
    employers:[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          marital,
          gender,
          country,
          region,
          industry,
          major,
          course,
          educationLevel,
          position,
          positionLevel,
          siteStatistic,
          employer
        ] = await Promise.all([
          getMaritalStatuses(),
          getGenders(),
          getCountries(),
          getRegions(),
          getIndustry(),
          getMajor(),
          getCourse(),
          getEducationLevel(),
          getPosition(),
          getPositionLevel(),
          getSiteStatistics(),
          getListOfEmployers()

        ]);

        setUniversalData({
          maritalStatuses: marital.data,
          genders: gender.data,
          countries: country.data,
          regions: region.data,
          industries: industry.data,
          majors: major.data,
          courses: course.data,
          educationLevels: educationLevel.data,
          positions: position.data,
          positionLevels: positionLevel.data,
          siteStatistics: siteStatistic.data ,
          employers: employer.data ,
        });
      } catch (error) {
        console.error('UniversalContext error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <UniversalContext.Provider value={{ ...universalData, loading }}>
      {children}
    </UniversalContext.Provider>
  );
};
