import Postcomponent from "../../components/posts/post";
//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);

  //Recupere le Token LocalStaorage
  //Condition si 'il n'y a pas de token -> naviaget to login
  // if(!maVariable){
  //return navigate to login
  // }
  const token = JSON.parse(localStorage.getItem("user"))[0].token;
  useEffect(() => {
    fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();                            
      })
      .then((result) => {
        setPosts(result);           
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="feed">
      {posts.map((post) => (
        <Postcomponent
          name={post.name}
          title={post.title}
          description={post.description}
          imageURL={post.imageURL}
          key={post._id}
        />
      ))}
    </section>
  );
}

export default Feed;
