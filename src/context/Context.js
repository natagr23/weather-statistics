import React, { useState, createContext } from 'react';

import parametersData from '../data/parameters.json';

export const Context = createContext({});

export const ContextProvider = (props) => {
  const [nameParameter, setNameParameter] = useState('Discharge');
  const [parameters] = useState(parametersData);

  const getName = (name) => {
    setNameParameter(name);
  };

  return (
    <Context.Provider
      value={{
        getName: getName,
        nameParameter: nameParameter,
        parameters: parameters,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
