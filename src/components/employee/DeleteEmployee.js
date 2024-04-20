import { Button, Input, message } from "antd";
import { useState, useEffect } from "react";
import { jsonServerUrl } from "../API/jsonServerURL";

const DeleteEmployee = ({ record, fetchEmployee, handleCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (record) {
      setFormData({
        id: record.id || "",
        name: record.name || "",
      });
    }
  }, [record]);

  const { name, id } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const res = await fetch(
        `${jsonServerUrl}/employees/${id}`,
        requestOptions
      );
      if (res) {
        message.success("Deleted Successfully");
        fetchEmployee();
        handleCancel();
        setFormData({ id: "", name: "" }); // Reset formData after delete
      }
    } catch (error) {
      message.error("Failed, Please check and try again");
    }
  };

  return (
    <div className="p-5">
      <h1 className="title capitalize">Delete Employee</h1>
      <label className="labelStyle mt-4">Employee Name</label>
      <Input
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Type Employee name here"
        className="w-full border-black"
      />
      <Button
        onClick={onSubmit}
        className="button-bar m-5 list-btn float-right"
      >
        Delete Employee
      </Button>
    </div>
  );
};

export default DeleteEmployee;
