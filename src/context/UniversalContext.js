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
  getJobTypes,
} from '../Api/Universal/UniversalApi';
import {  getJobCountByRegion,
  getJobCategorySummary,
  getClientsJobCountByIndustry,} from '../Api/Job/JobCategoriesApi'

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
    jobCountByRegion: [], // Store job count by region
    jobCategorySummary: [], // Store job category summary
    clientsJobCountByIndustry: [], // Store job count by industry
  });

  const [loading, setLoading] = useState(true);

  // Function to add delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Fetch all data from the API on component mount
  useEffect(() => {
    const fetchUniversalData = async () => {
      setLoading(true); // Set loading state to true while data is being fetched

      try {
        // Sequential fetching with a small delay
        const maritalRes = await getMaritalStatuses();
        await delay(500); // Wait 500ms before the next request
        const genderRes = await getGenders();
        await delay(500);
        const countryRes = await getCountries();
        await delay(500);
        const regionRes = await getRegions();
        await delay(500);
        const industryRes = await getIndustry();
        await delay(500);
        const majorRes = await getMajor();
        await delay(500);
        const courseRes = await getCourse();
        await delay(500);
        const educationLevelRes = await getEducationLevel();
        await delay(500);
        const positionRes = await getPosition();
        await delay(500);
        const positionLevelRes = await getPositionLevel();
        await delay(500);
        const siteStatsRes = await getSiteStatistics();
        await delay(500);
        const jobTypesRes = await getJobTypes();

        // Fetch job count by region, job category summary, and job count by industry
        const jobCountByRegionRes = await getJobCountByRegion();
        await delay(500);
        const jobCategorySummaryRes = await getJobCategorySummary();
        await delay(500);
        const clientsJobCountByIndustryRes = await getClientsJobCountByIndustry();

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
          types: jobTypesRes?.data || [],
          jobCountByRegion: jobCountByRegionRes || [],
          jobCategorySummary: jobCategorySummaryRes || [],
          clientsJobCountByIndustry: clientsJobCountByIndustryRes || [], // Added job count by industry
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
