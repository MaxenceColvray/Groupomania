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
  useEffect(() => {
    fetch("http://localhost:3000/api/post", {
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
      .then((data) => {
        console.log(data);


        let newpostsArray = [];
        data.map((objet) => {
          let isMyPostValue = false;

          if (objet.userId === JSON.parse(localStorage.getItem("user"))[0].userId) {
            isMyPostValue = true;
          }         

          let newObjet = {
            name: objet.name,
            title: objet.title,
            description: objet.description,
            imageURL: objet.imageURL,
            likes: objet.likes,
            _id: objet._id,
            isMyPost: isMyPostValue,
            hadLiked: objet.usersLiked.includes(objet.userId)
          };
          newpostsArray.push(newObjet);
        });
        console.log(newpostsArray)
        setPosts(newpostsArray);
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
          likes={post.likes}
          id={post._id}
          key={post._id}
          isMyPost={post.isMyPost}
          hadLiked={post.hadLiked}
        />
      ))}
    </section>
  );
}

export default Feed;
