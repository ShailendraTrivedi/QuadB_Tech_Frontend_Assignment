import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

const DisplayComponent = ({
  filteredTasks,
  handleDelete,
  handlePriorityChange,
  handleStatusChange,
}) => {
  return (
    <div className="space-y-2 px-10">
      {filteredTasks.map((item) => (
        <div key={item._id} className="flex border-b-2 border-black">
          <p className="w-full p-2">{item.task}</p>
          <div className="flex gap-2 items-center justify-around w-[20rem]">
            <select
              className="focus:outline-none"
              value={item.status}
              onChange={(e) => handleStatusChange(item._id, e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
            <select
              className="focus:outline-none"
              value={item.priority}
              onChange={(e) => handlePriorityChange(item._id, e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={() => handleDelete(item._id)}>
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayComponent;
