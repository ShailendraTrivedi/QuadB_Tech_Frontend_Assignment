import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RightComponent = ({fetchData}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full space-y-5 p-2">
      <Formik
        initialValues={{
          category: "",
          task: "",
          priority: "High",
          status: "Not Started",
        }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            setLoading(true);
            const response = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/tasks`,
              values
            );
            console.log(response);
            if (response.status === 201) {
              toast.success("Added successfully");
            }
          } catch (error) {
            toast.error(error);
            return;
          } finally {
            setLoading(false);
            fetchData()
          }
        }}
      >
        {() => (
          <Form className="flex flex-col gap-5 items-center shadow-[0_0_2px_2px_rgba(0,0,0,0.5)] p-5">
            <div className="text-center text-2xl font-bold">Add Task</div>
            <div className="w-full">
              <label htmlFor="category" className="font-semibold">
                Category:
              </label>
              <Field
                id="category"
                name="category"
                className="w-full p-2 border-2 border-black focus:outline-none"
                placeholder="Enter Category Here..."
              />
            </div>
            <div className="w-full">
              <label htmlFor="task" className="font-semibold">
                Task:
              </label>
              <Field
                id="task"
                as="textarea"
                name="task"
                className="w-full h-[10rem] p-2 border-2 border-black focus:outline-none"
                placeholder="Enter Your Task Here..."
              />
            </div>
            <div className="w-full">
              <label htmlFor="priority" className="font-semibold">
                Priority:
              </label>
              <Field
                id="priority"
                as="select"
                name="priority"
                className="p-2 w-full border-2 border-black"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Field>
            </div>
            <button
              type="submit"
              className="w-[10rem] p-2 bg-blue-500 text-white"
            >
              {loading ? "Loading..." : "Add Task"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RightComponent;
