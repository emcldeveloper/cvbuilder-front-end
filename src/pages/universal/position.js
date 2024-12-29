import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FixedSizeList as List } from 'react-window';

const Positions = ({ label = "Select a position", onSelect, initialValue }) => {
  const [options, setOptions] = useState([]); // Store fetched options
  const [selected, setSelected] = useState(null); // To store the selected option
  const [error, setError] = useState(null); // For error handling

  // Fetch options from API (supports search filtering)
  const fetchOptions = async (inputValue = '') => {
    try {
      const response = await fetch(`https://test.ekazi.co.tz/api/applicant/position?search=${inputValue}`);
      const data = await response.json();

      const formattedOptions = Array.isArray(data.position)
        ? data.position.map(option => ({
            value: option.position_name,
            label: option.position_name,
          }))
        : [];

      setOptions(formattedOptions);

      if (initialValue) {
        const selectedOption = formattedOptions.find(option => option.value === initialValue);
        setSelected(selectedOption || null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load options');
    }
  };

  // Handle option selection or creation
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ''); // Pass selected value to parent

    // If the option is a new one (not in the existing list), you can trigger custom logic here
    if (selectedOption && !options.some(option => option.value === selectedOption.value)) {
      // Handle creation of a new option (e.g., call an API to create the option)
      console.log('New option selected:', selectedOption);
    }
  };

  // Function to load options asynchronously based on user input (search)
  const loadOptions = (inputValue, callback) => {
    // Fetch options from the API based on user input
    fetchOptions(inputValue)
      .then(() => {
        // Filter options based on inputValue for client-side search
        const filteredOptions = options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(filteredOptions);
      })
      .catch(() => {
        callback([]); // In case of an error, return empty array
      });
  };

  // Fetch options once when the component mounts
  useEffect(() => {
    fetchOptions(); // Initially fetch all options
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Virtualized List rendering for dropdown options
  const renderRow = ({ index, style }) => (
    <div
      style={style}
      className="menu-item"
      onClick={() => handleSelect(options[index])}
    >
      {options[index].label}
    </div>
  );
  


  return (
    
    <div>
     
      <div className="select-container">
        <AsyncCreatableSelect
          value={selected}
          onChange={handleSelect}
          loadOptions={loadOptions}
          placeholder="Select a position"
          isClearable
          cacheOptions
          defaultOptions={options}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '30px',
              height: '35px',
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: '0px 8px',
            }),
            input: (provided) => ({
              ...provided,
              margin: '0px',
            }),
          }}
        
        />
      </div>
    </div>
  );
};

export default Positions;
