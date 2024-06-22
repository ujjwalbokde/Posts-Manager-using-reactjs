import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from "react-router-dom";

const Edit = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { id } = useParams();

  // Initialize with default values
  const [data, setData] = useState("");
  const navigate=useNavigate();
  // Function to fetch data
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      // Set initial values for the form fields
      setData(result);
      setValue(result.title);
      setValue(result.description);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Data updated successfully:", result);
      alert("Posts updated Successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="text-center mx-[32%] my-[6%]">
      <form
        className="rounded-[30px] p-4 pt-8 px-0 w-[500px] h-[360px] bg-purple-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl mb-4 font-bold">Edit Post here!</h1>
        <input
          type="text"
          className="border border-black rounded-md p-1 mb-2 w-60"
          placeholder="Title"
          defaultValue={data.title}
          {...register("title", {
            minLength: { value: 3, message: "Title is too small" },
            maxLength: { value: 16, message: "Title is too big" },
            onChange: (e) => setData({ ...data, title: e.target.value }) // Update local state
          })}
        />
        {errors.title && (
          <div className="text-red-600">{errors.title.message}</div>
        )}
        <br />
        <textarea
          className="border border-black rounded-md p-1 mb-2"
          rows={3}
          cols={29}
          placeholder="Description"
          defaultValue={data.description}
          {...register("description", {
            minLength: { value: 6, message: "Description is too small" },
            onChange: (e) => setData({ ...data, description: e.target.value }) // Update local state
          })}
        ></textarea>
        {errors.description && (
          <div className="text-red-600">{errors.description.message}</div>
        )}
        <br />
        <input
          type="submit"
          className="border border-black rounded-md bg-purple-600 text-white p-1 w-16"
          value="Edit"
        />
      </form>
    </div>
  );
};

export default Edit;
