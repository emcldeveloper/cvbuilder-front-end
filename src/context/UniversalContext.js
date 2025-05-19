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
  getSiteStatistics,
} from '../Api/Universal/UniversalApi';

// Create the context
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
    siteStatistics:{},
 
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversalData = async () => {
      try {
        const [
          maritalRes,
          genderRes,
          countryRes,
          regionRes,
          industryRes,
          majorRes,
          courseRes,
          educationLevelRes,
          positionRes,
          positionLevelRes,
          siteStatsRes,
        
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
       
        ]);

        setUniversalData({
          maritalStatuses: maritalRes?.data || [],
          genders: genderRes?.data || [],
          countries: countryRes?.data || [],
          regions: regionRes?.data || [],
          industries: industryRes?.data || [],
          majors: majorRes?.data || [],
          courses: courseRes?.data || [],
          educationLevels: educationLevelRes?.data || [],
          positions: positionRes?.data || [],
          positionLevels: positionLevelRes?.data || [],
          siteStatistics: siteStatsRes?.data || {},
          
        });
          console.log('📊 siteStatistics:', siteStatsRes.data);
        console.log('Universal data loaded successfully');
      } catch (error) {
        console.error('Failed to load universal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversalData();
  }, []);

  return (
    <UniversalContext.Provider value={{ ...universalData, loading }}>
      {children}
    </UniversalContext.Provider>
  );
};
