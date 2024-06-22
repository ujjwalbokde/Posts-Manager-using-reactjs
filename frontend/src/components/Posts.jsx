import React, { useState, useEffect } from "react";

const Posts = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete=async(id)=>{
    const response = await fetch(`http://localhost:8080/${id}`,
      {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
          },
      }
    );
    const result = await response.json();
    if (response.ok) {
      getData();
    }
  }

  return (
    <div className="container mt-3">
      <div className="mx-20">
      <div className="row">
        {data.map((post) => (
          <div
            key={post._id}
            className="card m-2 border-2 border-black bg-purple-200"
            style={{ width: "20rem" }}
          >
            <div className="card-body">
              <h5 style={{ textAlign: "start" }} className="card-title">
                Title : <b>{post.title}</b>
              </h5>
              <p className="card-text">
                Description : <b>{post.description}</b>
              </p>
              <div className="btn-div flex mt-3">
                <form method="get" action={`/${post._id}`}>
                  <button className=" rounded-md "
                  >
                  <i class="fa-solid fa-pen-to-square text-purple-600 text-xl"></i>
                  </button>
                </form>
                <form className="">
                  <button
                    className=" mx-3 rounded-md"
                    onClick={()=>{handleDelete(post._id)}}
                  >
                  <i className="fa-solid fa-trash text-purple-600 text-xl"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Posts;
