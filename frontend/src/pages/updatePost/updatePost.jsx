import UpdatePostForm from "../../components/updatePostForm/updatePostForm";
import {  useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";

import Header from "../../components/header/header";
import "./updatePost.css";

function UpdatePost() {
  const varUrl = useParams();
  console.log(varUrl);


  const [getTitleValue, setgetTitleValue] = useState("");
  const [getDescriptionValue, setgetDescriptionValue] = useState("");
  const [getUrlValue, setgetUrlValue] = useState("");


fetch("http://51.91.99.62:3000/api/post/" + varUrl.id, {
      method: "GET",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
      },
    })
      .then((res) => {
        console.log(res);

        return res.json();
      })
      .then((response) => {
        console.log(response);
        setgetTitleValue(response.title)
        setgetDescriptionValue(response.description)
        setgetUrlValue(response.imageURL)
      })
      .catch((error) => {
        console.log(error);
      });



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
      <UpdatePostForm 
      title={getTitleValue}
      description={getDescriptionValue}
      imageURL={getUrlValue}
      />
    </section>
    </React.Fragment>
  );
}


export default UpdatePost;