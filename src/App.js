import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GraphPage from './pages/GraphPage';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Dashboard />
          <Routes>
            <Route path="/" element={[<Dashboard />]} />
            <Route path="/pages/GraphPage" element={[<GraphPage />]} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
