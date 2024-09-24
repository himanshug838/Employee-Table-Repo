import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css' 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Components/Form";
import EmployeeList from "./Components/EmployeeList";
import EmployeeDetail from "./Components/Employeedetail";
import EditEmployee from "./Components/EditEmployee";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-detail" element={<EmployeeDetail />} />
        <Route path="/edit-employee" element={<EditEmployee />} />
      </Routes>
      
    </Router>
  );
}

export default App;
