import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDetail() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedEmployee = localStorage.getItem("selectedEmployee");

    if (selectedEmployee) {
      const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
      const employee = JSON.parse(selectedEmployee);

      // Check if the employee still exists in the employeeData
      const exists = employeeData.some(emp => emp.empid === employee.empid);

      if (exists) {
        setEmployee(employee);
      } else {
        setEmployee(null);
        alert("The employee has been deleted.");

        navigate("/employee-list");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <h2 className="font-semibold text-xl text-gray-600">Employee Details</h2>
          {employee ? (
            <div className="mt-4">
              <p><strong>Full Name:</strong> {employee.name}</p>
              <p><strong>Mobile:</strong> {employee.mobile}</p>
              <p><strong>empid:</strong> {employee.empid}</p>
              <p><strong>Salary:</strong> {parseFloat(employee.salary.replace(/,/g, '')).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p><strong>Designation:</strong> {employee.designation}</p>
            </div>
          ) : (
            <p>No employee details available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
