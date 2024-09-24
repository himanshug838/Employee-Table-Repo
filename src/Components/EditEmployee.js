import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditEmployee() {
  const navigate = useNavigate();

  //employee data from localStorage
  const selectedEmployee = JSON.parse(localStorage.getItem("selectedEmployee"));

  const [name, setName] = useState(selectedEmployee.name);
  const [designation, setDesignation] = useState(selectedEmployee.designation);
  const [empid, setempid] = useState(selectedEmployee.empid);
  const [mobile, setMobile] = useState(selectedEmployee.mobile);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !designation || !empid || !mobile || !salary) {
        setErrorMessage("Please fill out all fields.");
  
        setTimeout(() => {
          setErrorMessage("");
        }, 3000)
  
  
        return;
      }

      // Get existing employee data from localStorage
    const existingEmployees = JSON.parse(localStorage.getItem("employeeData")) || []; 

    // Check if empid already exists and is not the same as the current employee's empid
    const empidExists = existingEmployees.some(employee => employee.empid === empid && employee.empid !== selectedEmployee.empid);
    if (empidExists) {
      setErrorMessage("employee with this empid already exists.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const mobileExists = existingEmployees.some(employee => employee.mobile === mobile && employee.mobile !== selectedEmployee.mobile);
    if (mobileExists) {
      setErrorMessage("employee with this mobile already exists.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const updatedEmployee = {
      name,
      designation,
      empid,
      mobile,
      salary
    };

    let employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
    
    // Update the employee in the array
    employeeData = employeeData.map((employee) =>
      employee.empid === selectedEmployee.empid ? updatedEmployee : employee
    );

    localStorage.setItem("employeeData", JSON.stringify(employeeData));

    alert("Do You update the data of this employee")

    navigate("/employee-list");
  };

  const formatSalary = (value) => {
    const [integerPart, decimalPart] = value.replace(/,/g, "").split(".");
    
    // Format the integer part with commas
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  
    // Reconstruct the formatted salary with a decimal part (if it exists)
    const formattedSalary = otherNumbers 
      ? formattedOtherNumbers + "," + lastThree 
      : lastThree;
  
    return decimalPart !== undefined ? `${formattedSalary}.${decimalPart}` : formattedSalary;
  };
  
  const handleSalaryChange = (e) => {
    const value = e.target.value;
    
    // Allow numbers and at most one decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    
    // Call the formatSalary function
    const formattedSalary = formatSalary(sanitizedValue);
    setSalary(formattedSalary);
  };


  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Edit Employee Details</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      type="text"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      id="designation"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="salary">Salary</label>
                    <input
                      type="text"
                      id="salary"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={salary}
                      onChange={handleSalaryChange}
                      // pattern="[\d,]*"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="text"
                      id="mobile"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/, ''))}
                      pattern="\d*"
                      maxLength="10"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="empid">empid</label>
                    <input
                      type="empid"
                      id="empid"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={empid}
                      onChange={(e) => setempid(e.target.value.replace(/\D/, ''))}
                      pattern="\d*"
                      maxLength="3"
                      placeholder="empid"
                    />
                  </div>

                  {/* error msg for empty fields */}
                  {errorMessage && (
                    <div className="col-span-5 text-center text-red-500">
                      {errorMessage}
                    </div>
                  )}

                  <div className="md:col-span-5 text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
