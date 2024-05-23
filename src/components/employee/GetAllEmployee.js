import { useEffect, useState } from "react";
import { serverURI } from "../API/API_URI";

const GetAllEmployee = () => {
  const [employeData, setEmployeData] = useState([]);
  const [loading, setLoading] = useState(false);

  //API call to get Employee Data
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(serverURI);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        setLoading(false);
        setEmployeData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);
  return { employeData, loading, fetchEmployee, setLoading };
};

export default GetAllEmployee;
