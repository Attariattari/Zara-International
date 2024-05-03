import React, { createContext, useContext, useState } from "react";

const MeasureContext = createContext();

export const useMeasureContext = () => useContext(MeasureContext);

export const MeasureProvider = ({ children }) => {
  const [MEASURE, setMEASURE] = useState(false);

  return (
    <MeasureContext.Provider value={{ MEASURE, setMEASURE }}>
      {children}
    </MeasureContext.Provider>
  );
};
