import React, { useEffect, useState } from "react";
import { jsonServerUrl } from "./API/jsonServerURL";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Spin } from "antd";

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
            <ul className="p-2 pl-[70px] border-black border-l-[1px]">
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

const ChainOfCommand = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${jsonServerUrl}`);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        const employeesMap = new Map();
        const hierarchy = [];
        data.forEach((employee) => {
          employeesMap.set(employee?.id, { ...employee, subordinates: [] });
        });
        data.forEach((employee) => {
          const supervisorId = employee.supervisor;
          const supervisor = employeesMap.get(supervisorId);
          if (supervisor) {
            supervisor.subordinates.push(employeesMap.get(employee?.id));
          } else {
            hierarchy.push(employeesMap.get(employee?.id));
          }
        });
        setDataSource(hierarchy);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    <section className="max-h-[500px] overflow-auto">
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

export default ChainOfCommand;
