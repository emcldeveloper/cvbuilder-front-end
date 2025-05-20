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
  getJobTypes
} from '../Api/Universal/UniversalApi';

// Create the context
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
    positionLevels: [],
    siteStatistics: {},
    types: [],
  });

  const [loading, setLoading] = useState(true);

  // Fetch all data from the API on component mount
  useEffect(() => {
    const fetchUniversalData = async () => {
      setLoading(true); // Set loading state to true while data is being fetched

      try {
        // Make concurrent API requests using Promise.all
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
          jobTypesRes,
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
          getJobTypes(),
        ]);

     
        // Set the fetched data into state
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
          types: jobTypesRes?.data || [], // Set job types data
        });

        console.log('Universal data loaded successfully');
      } catch (error) {
        // Log any errors that occurred during the fetch process
        console.error('Failed to load universal data:', error);
      } finally {
        // Once data is loaded or an error occurs, set loading to false
        setLoading(false);
      }
    };

    fetchUniversalData();
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  return (
    <UniversalContext.Provider value={{ ...universalData, loading }}>
      {children}
    </UniversalContext.Provider>
  );
};
