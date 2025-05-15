import React, { createContext, useEffect, useState } from 'react';
import {
  getMaritalStatuses,
  getGenders,
  getCountries,
  getRegions,
  getIndustry,
  geMajor,
  getCourse,
  getEducationLevel,
  gePosition,
  getPositionLevel
} from '../Api/Universal/UniversalApi';

export const UniversalContext = createContext();

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
    positionLevels: []
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
          positionLevel
        ] = await Promise.all([
          getMaritalStatuses(),
          getGenders(),
          getCountries(),
          getRegions(),
          getIndustry(),
          geMajor(),
          getCourse(),
          getEducationLevel(),
          gePosition(),
          getPositionLevel()
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
          positionLevels: positionLevel.data
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
