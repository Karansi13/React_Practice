import React from "react";
import "../App.css";
const Post = ({ value, handleSubmit, handlePageChange, posts }) => {
  return (
    <>
      <div className="postCont">
        <div className="input">
          <input
            type="text"
            placeholder="Enter post number"
            value={value}
            onChange={handlePageChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="text">{posts && posts?.title}</div>
      </div>
    </>
  );
};

export default Post;
