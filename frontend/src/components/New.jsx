import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const New = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Post created successfully!");
      navigate('/show');
      
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="text-center mx-[32%] my-[6%]">
      <form
        className="rounded-[30px] p-4 pt-8 px-0 w-[500px] h-[360px] bg-purple-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl mb-4 font-bold">Post here!</h1>
        <input
          type="text"
          className="border border-black rounded-md p-1 mb-2 w-60"
          placeholder="Title"
          {...register("title", {
            required: { value: true, message: "This field is required" },
            minLength: { value: 3, message: "Title is too small" },
            maxLength: { value: 16, message: "Title is too big" },
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
          {...register("description", {
            required: { value: true, message: "This field is required" },
            minLength: { value: 6, message: "Description is too small" },
          })}
        ></textarea>
        {errors.description && (
          <div className="text-red-600">{errors.description.message}</div>
        )}
        <br />
        <input
          type="submit"
          className="border border-black rounded-md bg-purple-600 text-white p-1"
          value="Create"
        />
      </form>
    </div>
  );
};

export default New;
