
// Define the base URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Login Function
export async function loginUser(email, password) {
  const url = `${API_BASE_URL}auth/login`; // Dynamically build the URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.email || data?.error || 'Login failed');
    }

    return data; // Should contain token
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

// Register Function
export async function registerUser(formData) {
  const url = `${API_BASE_URL}auth/register`; // Dynamically build the URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include Authorization if needed, e.g. token
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message || 'Registration failed'}`);
      return;
    }

    const result = await response.json();
    alert('Candidate registered successfully!');
    return result; // Return result for use in other parts of your application if needed
  } catch (error) {
    console.error('Registration error:', error);
    alert('Something went wrong while registering. Please try again.');
  }
}
