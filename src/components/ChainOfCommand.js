import React, { useEffect, useState } from "react";
import { jsonServerUrl } from "./API/jsonServerURL";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Spin } from "antd";

const EmployeeNode = ({ employee, index }) => {
  if (!employee || !employee.subordinates) {
    return null; // Return null or handle the case where employee or subordinates are undefined/null
  }

  return (
    <Draggable draggableId={employee.id + 100} index={index}>
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
    setLoading(true); // Set loading state to true
    try {
      const res = await fetch(`${jsonServerUrl}/employees`);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        setLoading(false);
        const employeesMap = new Map(); // Map to store employees by ID for quick lookup
        const hierarchy = []; // Array to store top-level supervisors

        // Build employees map for quick lookup
        data.forEach((employee) => {
          employeesMap.set(employee?.name, { ...employee, subordinates: [] });
        });

        // Iterate through employees to build hierarchy
        data.forEach((employee) => {
          const supervisorId = employee.supervisor;
          const supervisor = employeesMap.get(supervisorId);

          if (supervisor) {
            supervisor.subordinates.push(employeesMap.get(employee?.name));
          } else {
            hierarchy.push(employeesMap.get(employee?.name)); // Supervisor with no supervisor
          }
        });
        setDataSource(hierarchy); // Set the hierarchical data as the data source
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
      return; // Dragged outside the droppable area, do nothing
    }

    const { source, destination } = result;
    if (source.index === destination.index) {
      return; // Item was dropped in the same position, no reordering needed
    }

    const updatedDataSource = [...dataSource];
    const [removed] = updatedDataSource.splice(source.index, 1); // Remove dragged item
    updatedDataSource.splice(destination.index, 0, removed); // Insert dragged item at new position

    // Update the state with the reordered data source
    setDataSource(updatedDataSource);
  };

  return loading ? (
    <Spin />
  ) : (
    <section className="max-h-[500px]">
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
