import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={[<Dashboard />]} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
