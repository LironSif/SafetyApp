import React, { useEffect, useState } from "react";
import { useGetDepartmentsByFactoryIdQuery } from "../../services/departmentApi";
import Spinner3 from "../Spinner/Spinner3";
import DeptCard from "../Cards/DeptSetup/DeptCard"; // Make sure the path is correct
import MessageWithTypingEffect from "../TypeEffect/TypeEffect.jsx";
import welcomeMessage from "../TypeEffect/Message.js";

const ConfigDept = () => {
  // Retrieve the factoryId from localStorage
  const [factoryId, setFactoryId] = useState(localStorage.getItem("factoryId"));

  // Now use the factoryId in your query
  const {
    data: departments,
    error,
    isLoading,
  } = useGetDepartmentsByFactoryIdQuery(factoryId);

  // You can also check if the factoryId is not undefined or null before making the query
  useEffect(() => {
    const id = localStorage.getItem("factoryId");
    if (id) {
      setFactoryId(id);
    } else {
      console.warn("No factoryId found in localStorage");
      // Handle the case where factoryId is not found, maybe set a default or show an error
    }
  }, []);

  if (isLoading) return <Spinner3 />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!factoryId)
    return <div>Please select a factory to configure departments.</div>;

  return (
    <div className="setup-div">
      <h3 className="setup-name">Configure Your Departments</h3>
      <div className="msg">
        <MessageWithTypingEffect message={welcomeMessage} />
      </div>
      <div className="factory-details-form">
        <div className="first-ses"> 
      <div className="department-cards-container">
        {departments?.map((dept) => (
          <DeptCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ConfigDept;
