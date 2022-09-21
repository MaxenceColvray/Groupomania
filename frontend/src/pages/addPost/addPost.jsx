import PostForm from "../../components/addPost/postForm";
import React from "react";
import Header from "../../components/header/header";

import "./addPost.css";

function AddPost() {
  return (
    <React.Fragment>
      <Header
        logout={false}
        addPost={false}
        backtoFeed={true}
        signup={false}
        login={false}
      />
    <section className="addpost">
      <PostForm />
    </section>
    </React.Fragment>
  );
}

export default AddPost;
