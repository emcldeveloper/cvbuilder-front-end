import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async'; // Use AsyncSelect for async loading
import Languages from '../language';
 

const SpeakLanguage = ({   label, onSelect, onOptionsLoad, initialValue }) => {
 
  const [options, setOptions] = useState(null); // Store fetched options
  const [selected, setSelected] = useState(null); // To store the selected option
  const [error, setError] = useState(null); // For error handling

  // Fetch options from API once when component mounts
  const fetchOptions = async () => {
    try {
      const response = await fetch('https://ekazi.co.tz/api/applicant/language_speak');
      const data = await response.json();

      // Format options for react-select
      const formattedOptions = Array.isArray(data.language_speak)
      ? data.language_speak.map(option => ({
          // value: option.education_level,
          value: option.id,
          label: option.speak_ability,
        }))
      : [];

      console.log('check language speak',formattedOptions);
      setOptions(formattedOptions);
         // Call the onOptionsLoad callback to pass options back to parent
         if (onOptionsLoad) {
          onOptionsLoad(formattedOptions);
        }
  
        // If there's an initial value, find and set it as the selected option
        if (initialValue) {
          const selectedOption = formattedOptions.find(option => option.value === initialValue);
          setSelected(selectedOption || null);
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load options');
    }
    
  };

  // Function to load options asynchronously based on user input
 
 const loadOptions = (inputValue, callback) => {
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  // Handle select option change
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ''); // Pass selected value to parent
  };

  // Fetch options once when the component mounts
  useEffect(() => {
    fetchOptions();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <AsyncSelect
        value={selected} // Should be an array if isMulti is true
        onChange={handleSelect} // Handle selection change
        loadOptions={loadOptions} // Function to load options asynchronously
        defaultOptions={options} // Options to preload for faster initial load
        placeholder=" speak ability" // Placeholder text
        // isMulti // Enable multi-select
       // isClearable // Allow clearing the selected options
        styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '30px', // Adjust the minimum height
              height: '32px',    // Set a fixed height if desired
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: '0px 8px', // Adjust padding for a smaller container
            }),
            input: (provided) => ({
              ...provided,
              margin: '0px', // Remove margins for a tighter input field
            }),
          }}
    />
</div>


  );
};

export default SpeakLanguage
