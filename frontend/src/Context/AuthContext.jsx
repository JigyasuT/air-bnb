import React, { createContext, useState } from "react";
export const authDataContext = createContext();
const AuthContext = ({ children }) => {
  let serverUrl = "hhttps://airbnb-site-aeer.onrender.com";
  
  let [loading,setLoading]=useState(false)

  let value = {
    serverUrl,
    loading,setLoading
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
};

export default AuthContext;
