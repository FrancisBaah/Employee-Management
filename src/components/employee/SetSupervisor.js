import { Button, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { jsonServerUrl } from "../API/jsonServerURL";

const SetSupervisor = ({ record, dataSource, fetchEmployee, handleCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    supervisor: "",
  });
  const { name, supervisor, id } = formData;

  useEffect(() => {
    //Setting form data to received props
    record &&
      setFormData({
        id: record?.id || "",
        name: record?.name || "",
        supervisor: record?.supervisor || "",
      });
  }, [record]);

  //Picking input values
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //API Call to set Supervisor
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!id || !supervisor) {
      message.error("Please select supervisor");
      return;
    }
    // Configure the fetch options for the POST request
    const requestOptions = {
      method: "PUT",
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
        message.success("Supervisor Assigned");
        fetchEmployee();
        handleCancel();
        setFormData({});
      }
    } catch (error) {
      message.error("Failed, Please check and try again");
    }
  };
  return (
    <div className="p-5">
      <h1 className="title capitalize">Assign Supervisor to Employee</h1>
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

export default SetSupervisor;
