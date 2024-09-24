import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


function EmployeeList() {

  const navigate = useNavigate();
  const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employeeData);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);

    // Filter employees based on the search query matching name or empid
    if (newValue.trim() === "") {
      setFilteredEmployees(employeeData);
    } else {
      const filtered = employeeData.filter(
        (employee) =>
          employee.name.toLowerCase().includes(newValue.toLowerCase()) ||
          employee.empid.toLowerCase().includes(newValue.toLowerCase()) ||
          employee.mobile.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };
ls

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredEmployees(employeeData);
  };

  const handleViewClick = (employee) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
    navigate("/employee-detail");
  };

  const handleEditClick = (employee) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
    navigate("/edit-employee");
  };

  const handleDeleteClick = (index) => {
    alert("Do You Want to Delete the Data of this Employee..")
    const updatedEmployeeData = employeeData.filter((_, i) => i !== index);
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployeeData));
    setFilteredEmployees(updatedEmployeeData);
    window.location.reload();
  };

  const handleAddEmployee = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 flex flex-col">
          <h2 className="font-semibold text-xl text-gray-600">Employee List</h2>

          {/* Search Input */}
          <div className="flex mb-4 mt-2 w-1/3 relative">
            <input
              type="search"
              placeholder="Search by name, empid or mobileno."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-2 text-gray-500"
              >
                {/* cross symbol */}
                {/* &#10005;  */}
              </button>
            )}
          </div>

          <button
            onClick={handleAddEmployee}
            className="text-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-96 my-3"
          >
            Add Employee
          </button>

          {!filteredEmployees && <LoadingSpinner />}

          {filteredEmployees.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    empid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.empid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parseFloat(employee.salary.replace(/,/g, '')).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
                      <button
                        onClick={() => handleViewClick(employee)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(employee)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employee data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
