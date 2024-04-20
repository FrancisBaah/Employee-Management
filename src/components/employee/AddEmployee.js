import { Button, Input, Select, message } from "antd";
import { useState } from "react";
import { jsonServerUrl } from "../API/jsonServerURL";

const AddEmployee = ({ dataSource, fetchEmployee, handleCancel }) => {
  const [formData, setFormData] = useState({ name: "", supervisor: "" });
  const { name, supervisor } = formData;

  //Picking input value
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //API call to Add employee
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      message.error("Employee name is required");
      return;
    }

    // Configure the fetch options for the POST request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert data to JSON string
    };
    try {
      const res = await fetch(`${jsonServerUrl}/employees`, requestOptions);
      if (res) {
        message.success("Employee has been Added Successfully");
        fetchEmployee();
        handleCancel();
        setFormData({});
      }
    } catch (error) {
      message.error("Failed to Add Employee, Please check and try again");
    }
  };
  return (
    <div className="p-5">
      <h1 className="title capitalize">add Employee</h1>
      <label className="labelStyle mt-4">Employee Name</label>
      <Input
        name="name"
        value={name}
        onChange={onChange}
        placeholder="type Employee name here"
        className="w-full border-black"
      />
      <label className="labelStyle mt-4">Supervisor</label>
      <Select
        value={supervisor}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, supervisor: value }))
        }
        className="border-black w-full"
        showSearch
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        options={dataSource.map((item) => ({
          key: item.id,
          value: item.name ? item.name : "",
          label: item.name ? item.name : "",
        }))}
      />
      <Button
        onClick={onSubmit}
        className="button-bar m-5 list-btn float-right"
      >
        Save
      </Button>
    </div>
  );
};

export default AddEmployee;
