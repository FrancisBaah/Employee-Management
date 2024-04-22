import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Spin } from "antd";
import GetAllEmployee from "./employee/GetAllEmployee";
import ChainOfCommand from "./ChainOfCommand";

const EmployeeNode = ({ employee, index }) => {
  if (!employee || !employee.subordinates) {
    return null;
  }

  return (
    <Draggable draggableId={employee.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={employee.id}
          className=""
        >
          <span className="button-bar m-1">{employee.name}</span>
          {employee.subordinates.length > 0 && (
            <ul className="p-1 pl-[70px] border-black border-l-[1px]">
              {employee.subordinates.map((subordinate, idx) => (
                <EmployeeNode
                  key={subordinate.id}
                  employee={subordinate}
                  index={idx}
                />
              ))}
            </ul>
          )}
        </li>
      )}
    </Draggable>
  );
};

const ReOrganize = () => {
  const [dataSource, setDataSource] = useState([]);

  //Getting fetched Employee Data
  const { employeData, loading, fetchEmployee, setLoading } = GetAllEmployee();

  //Mapping employee to Subordinate
  const GetEmployee = async () => {
    setLoading(true);
    try {
      if (employeData && Array.isArray(employeData)) {
        setLoading(false);
        const employeesMap = new Map();
        const hierarchy = [];
        employeData.forEach((employee) => {
          employeesMap.set(employee?.name, { ...employee, subordinates: [] });
        });
        employeData.forEach((employee) => {
          const supervisorId = employee.supervisor;
          const supervisor = employeesMap.get(supervisorId);
          if (supervisor) {
            supervisor.subordinates.push(employeesMap.get(employee?.name));
          } else {
            hierarchy.push(employeesMap.get(employee?.name));
          }
        });
        setDataSource(hierarchy);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetEmployee();
    employeData.length === 0 && fetchEmployee();
  }, [employeData]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.index === destination.index) {
      return;
    }
    const updatedDataSource = [...dataSource];
    const [removed] = updatedDataSource.splice(source.index, 1);
    updatedDataSource.splice(destination.index, 0, removed);
    setDataSource(updatedDataSource);
  };

  return loading ? (
    <Spin />
  ) : (
    <section className="max-h-[500px] overflow-auto flex justify-between">
      <ChainOfCommand />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="employees">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=""
            >
              {dataSource.map((employee, index) => (
                <EmployeeNode
                  key={employee?.id}
                  employee={employee}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default ReOrganize;
