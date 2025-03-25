// OutputContext.js
import React, { createContext, useContext, useState } from 'react';

const OutputContext = createContext();

export const useOutput = () => useContext(OutputContext);

export const OutputProvider = ({ children }) => {
    const [output, setOutput] = useState("");

    return (
        <OutputContext.Provider value={{ output, setOutput }}>
            {children}
        </OutputContext.Provider>
    );
};