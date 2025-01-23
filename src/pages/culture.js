import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async'; // Use AsyncSelect for async loading

const Culture = ({ label, onSelect, onOptionsLoad, initialValue }) => {
  const [options, setOptions] = useState([]); // Store fetched options
  const [selected, setSelected] = useState([]); // To store the selected options
  const [error, setError] = useState(null); // For error handling

  // Fetch options from API once when component mounts
  const fetchOptions = async () => {
    try {
      const response = await fetch('https://ekazi.co.tz/api/applicant/culture');
      const data = await response.json();

      // Format options for react-select
      const formattedOptions = Array.isArray(data.culture)
        ? data.culture.map(option => ({
            value: option.id,
            label: option.culture_name,
          }))
        : [];

      setOptions(formattedOptions);

      // Call the onOptionsLoad callback to pass options back to parent
      if (onOptionsLoad) {
        onOptionsLoad(formattedOptions);
      }

      // If there's an initial value, find and set it as the selected option(s)
      if (initialValue) {
        const selectedOptions = formattedOptions.filter(option =>
          initialValue.includes(option.value)
        );
        setSelected(selectedOptions); // For multi-select, set an array of options
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
    onSelect(selectedOption ? selectedOption.map(opt => opt.value) : []); // Pass selected values to parent
  };

  // Fetch options once when the component mounts
  useEffect(() => {
    fetchOptions();
  }, []); // Empty dependency array ensures it runs only once after the component mounts

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
        placeholder="Select culture" // Placeholder text
        isMulti // Enable multi-select
        isClearable // Allow clearing the selected options
      />
    </div>
  );
};

export default Culture;
