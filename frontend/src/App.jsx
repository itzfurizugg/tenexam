import * as React from "react";

import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


import Dashboard from "./pages/dashboard/Index";
import Login from "./pages/auth";
import Register from "./pages/register/index";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
