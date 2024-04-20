import { Button, Input, Modal, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { jsonServerUrl } from "../API/jsonServerURL";
import AddEmployee from "./AddEmployee";
import { MdEdit } from "react-icons/md";
import SetSupervisor from "./SetSupervisor";
import DeleteEmployee from "./DeleteEmployee";

const Employee = () => {
  //Setting Popup States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [modalType, setModalType] = useState(null);

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  //Search Filters
  const filteredData = dataSource.filter((item) => {
    return (
      item.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()) ||
      item.supervisor.toLowerCase().includes(nameFilter.toLocaleLowerCase())
    );
  });

  //Closing Popups
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalType(null);
  };
  // Handling Popup events
  const handleModalOpen = (type, record) => {
    setModalType(type);
    setIsModalOpen(true);
    setRowData(record);
  };

  //API Call to fetch employees
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${jsonServerUrl}/employees`);
      const data = await res.json();
      //   console.log(data);
      if (data) {
        const tableArray = data?.map((item) => ({
          key: item.id || "",
          id: item.id || "",
          name: item.name || "",
          supervisor: item.supervisor || "",
        }));
        setDataSource(tableArray);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name of Employee",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : ""),
    },
    {
      title: "supervisor",
      dataIndex: "supervisor",
      key: "supervisor",
      sorter: (a, b) =>
        a.supervisor ? a.supervisor.localeCompare(b.supervisor) : "",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span className="w-full flex justify-center">
          <Popover
            content={
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleModalOpen("setSupervisor", record)}
                  className="action-btn"
                >
                  Set Supervisor
                </Button>
                <Button
                  onClick={() => handleModalOpen("deleteEmployee", record)}
                  className="action-btn"
                >
                  Delete
                </Button>
              </div>
            }
          >
            <MdEdit className="w-6 h-6 rounded-full bg-[#0c2d4c] text-white p-1" />
          </Popover>
          <Modal
            styles={{ mask: { opacity: 0.2 } }}
            footer={false}
            open={
              isModalOpen &&
              (modalType === "deleteEmployee" || modalType === "setSupervisor")
            }
            onOk={handleCancel}
            onCancel={handleCancel}
          >
            {isModalOpen && modalType === "setSupervisor" && (
              <SetSupervisor
                record={rowData}
                dataSource={dataSource}
                fetchEmployee={fetchEmployee}
                handleCancel={handleCancel}
              />
            )}
            {isModalOpen && modalType === "deleteEmployee" && (
              <DeleteEmployee
                record={rowData}
                fetchEmployee={fetchEmployee}
                handleCancel={handleCancel}
              />
            )}
          </Modal>
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between mb-2">
        <div className="flex">
          <Input
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="search-bar"
            prefix={<SearchOutlined />}
            placeholder="Search Name of Employee or Supervisor"
          />
        </div>
        <Button
          onClick={() => handleModalOpen("addEmployee")}
          className="button-bar"
          icon={<PlusOutlined />}
        >
          Add Employee
        </Button>
        <Modal
          className=""
          footer={false}
          open={isModalOpen && modalType === "addEmployee"}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <AddEmployee
            dataSource={dataSource}
            fetchEmployee={fetchEmployee}
            handleCancel={handleCancel}
          />
        </Modal>
      </div>
      <Table
        size="small"
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        loading={loading}
      />
    </section>
  );
};

export default Employee;
