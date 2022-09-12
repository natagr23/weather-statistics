import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GraphPage from './pages/GraphPage';
import { ContextProvider } from './context/Context';
import { Outlet } from 'react-router-dom';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Dashboard />
          <Routes>
            <Route
              path="/"
              element={[<About />, <Dashboard />, <GraphPage />]}
            />
            <Route path="/pages/GraphPage" element={[<GraphPage />]} />
          </Routes>
          <Outlet />
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
