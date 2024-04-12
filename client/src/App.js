import React, { useState, useEffect } from "react";
import axios from "axios";
import RightComponent from "./Right.component";
import DisplayComponent from "./Display.component";

const App = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("default");
  const [statusFilter, setStatusFilter] = useState("default");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [priorityFilter, statusFilter]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/tasks`);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchTerm = e.target.value;
      const filtered = tasks.filter(
        (item) =>
          item.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleFilter = () => {
    let filtered = tasks;
    if (priorityFilter !== "default") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    if (statusFilter !== "default") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    setFilteredTasks(filtered);
  };

  const handleDelete = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.delete(`${SERVER_URL}/tasks/${taskId}`);
      console.log(response);
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handlePriorityChange = async (taskId, priority) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/tasks/${taskId}`, {
        priority,
      });
      console.log(response);
      fetchData();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/tasks/${taskId}`, {
        status,
      });
      console.log(response);
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen w-[1440px] mx-auto grid grid-cols-3 justify-center p-2">
      <div className="col-span-2 w-full border-2 border-black space-y-5">
        <div className="w-full text-center text-3xl font-semibold">
          TODO LIST
        </div>
        <div className="flex gap-5 px-10">
          <input
            type="text"
            className="w-full border-2 border-black p-2"
            placeholder="Search Task and press enter..."
            onKeyDown={(e) => handleSearch(e)}
          />
          <div>
            <select
              className="w-[10rem] border-2 border-black p-2"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="default">Priority - All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <select
              className="w-[10rem] border-2 border-black p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="default">Status - All</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>
        <DisplayComponent
          filteredTasks={filteredTasks}
          handleDelete={handleDelete}
          handlePriorityChange={handlePriorityChange}
          handleStatusChange={handleStatusChange}
        />
      </div>
      <RightComponent fetchData={fetchData} />
    </div>
  );
};

export default App;
