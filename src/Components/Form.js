import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reusable InputField Component
const InputField = ({ label, id, value, onChange, placeholder, type = "text", maxLength }) => (
  <div className="md:col-span-5">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  </div>
);

function Form() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [empid, setEmpid] = useState("");
  const [mobile, setMobile] = useState("");
  const [salary, setSalary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const areFieldsEmpty = () => !name || !designation || !empid || !mobile || !salary;

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
    
    // Allow only numbers and one decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    
    // Call the formatSalary function to format the value with commas
    const formattedSalary = formatSalary(sanitizedValue);
    setSalary(formattedSalary);
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (areFieldsEmpty()) {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const existingEmployees = JSON.parse(localStorage.getItem("employeeData")) || [];

    //Check for duplicate empid or mobile
    const isDuplicate = (field, value) =>
      existingEmployees.some((employee) => employee[field] === value);

    if (isDuplicate("empid", empid)) {
      setErrorMessage("An employee with this empid already exists.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (isDuplicate("mobile", mobile)) {
      setErrorMessage("An employee with this mobile number already exists.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const data = {
      name,
      designation,
      empid,
      mobile,
      salary
    };

    //Save employee data to localStorage
    localStorage.setItem(
      "employeeData",
      JSON.stringify([...existingEmployees, data])
    );

    navigate("/employee-list");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <InputField
                    label="Full Name"
                    id="full_name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                  />
                  <InputField
                    label="Designation"
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Enter Designation"
                  />
                  <InputField
                    label="Salary"
                    id="salary"
                    value={salary}
                    onChange={handleSalaryChange}
                    placeholder="Enter Salary"
                  />
                  <InputField
                    label="Mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
                    placeholder="Enter Mobile Number"
                    maxLength="10"
                  />
                  <InputField
                    label="Employee ID"
                    id="empid"
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value.replace(/\D/, ""))}
                    placeholder="Employee ID"
                    maxLength="3"
                  />

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
                      Submit
                    </button>
                    <button
                      onClick={() => navigate("/employee-list")}
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
                    >
                      View List
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

export default Form;
