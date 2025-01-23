import axios from 'axios';
 import React, { createContext, useState, useEffect } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ekazi.co.tz/api/applicant/CvSubscription`)
      .then((response) => {
        console.log("API Response:", response); // Debug API response
        if (response ) {
          const data = response.data.cv_plan_subscription
          setSubscription(data);
          console.log("test cv sub", data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching CV Subscription data:", error.message);
      });
  }, []); // Empty dependency array means this runs only once on component mount

  return (
    <SubscriptionContext.Provider value={{ subscription, setSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;




