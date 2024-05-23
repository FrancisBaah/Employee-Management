import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Spin } from "antd";
import { serverURI } from "./API/API_URI";

//Nested Employee to Get Hierarchy
const EmployeeNode = ({ employee, index }) => {
  if (!employee || !employee.subordinates) {
    return null;
  }

  return (
    <Draggable draggableId={employee._id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={employee._id}
          className=""
        >
          <span className="button-bar m-1">{employee.name}</span>
          {employee.subordinates.length > 0 && (
            <ul className="p-2 pl-[70px] border-black border-l-[1px]">
              {employee.subordinates.map((subordinate, idx) => (
                <EmployeeNode
                  key={subordinate._id}
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

const ChainOfCommand = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  //Fetching employess and Mapping employee to Subordinate
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(serverURI);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        setLoading(false);
        const employeesMap = new Map();
        const hierarchy = [];
        data?.forEach((employee) => {
          employeesMap.set(employee?._id, { ...employee, subordinates: [] });
        });
        data?.forEach((employee) => {
          const supervisorId = employee.supervisor;
          const supervisor = employeesMap.get(supervisorId);
          if (supervisor) {
            supervisor.subordinates.push(employeesMap.get(employee?._id));
          } else {
            hierarchy.push(employeesMap.get(employee?._id));
          }
        });
        setDataSource(hierarchy);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

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
    <section className="">
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
                  key={employee?._id}
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

export default ChainOfCommand;
