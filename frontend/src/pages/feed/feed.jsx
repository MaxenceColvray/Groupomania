import Postcomponent from "../../components/posts/post";
//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./feed.css"

function Feed() {
  const [posts, setPosts] = useState([]);

  //Recupere le Token LocalStaorage
  //Condition si 'il n'y a pas de token -> naviaget to login
  // if(!maVariable){
    //return navigate to login
  // }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzIzMjRmOTYwZmQyNDRmYWY5N2VkNTEiLCJpYXQiOjE2NjMyNTE4MzUsImV4cCI6MTY2MzMzODIzNX0.Puo0bAPzNdjKwuHUVYWKYkRLKd9-rNTWAkHRVCIovAw";

  useEffect(() => {
    fetch("http://localhost:3000/api/post", 
    { method: 'GET',
      headers: {
        authorization : `bearer ${token}`
      },
    })
      .then((res) => {
        return res.json(); //                                Voir avec thomas !
      })
      .then((result) => {
        console.log(result);

        setPosts(result);
        //console.log(posts)                                 Voir avec Thomas !
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="feed">
      {posts.map((post) => (
        <Postcomponent
          title={post.title}
          name={post.name}
          description={post.description}
          imageURL={post.imageURL}
          key={post._id}
        />
      ))}
    </section>
  );
}

export default Feed;
