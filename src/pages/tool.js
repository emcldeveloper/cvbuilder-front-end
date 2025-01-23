import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async'; // Use AsyncSelect for async loading
import Creatable from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';

const Tool = ({ label, onSelect , onOptionsLoad, initialValue }) => {
    const [options, setOptions] = useState([]); // Store fetched options
    const [selected, setSelected] = useState([]); // To store the selected option
    const [error, setError] = useState(null); // For error handling

    // Fetch options from API once when component mounts
    const fetchOptions = async () => {
        try {
            const response = await fetch('https://ekazi.co.tz/api/applicant/tool');
            const data = await response.json();

            // Format options for react-select
            const formattedOptions = Array.isArray(data.tool)
                ? data.tool.map(option => ({
                    value: option.id,
                    label: option.tool_name,
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
      <AsyncCreatableSelect
        value={selected} // Set the current selected option
        onChange={handleSelect} // Handle option change
        loadOptions={loadOptions} // Async loading of options based on input
        defaultOptions={options} // Preload options for faster initial load
        placeholder="Select a Tools" // Placeholder text
        isMulti // Enable multi-select
        isClearable // Allow clearing the selected option
      />
        </div>
    );
};

export default Tool;
