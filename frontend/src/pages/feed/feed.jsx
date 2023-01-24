import Postcomponent from "../../components/posts/post";
//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);

  fetch("http://51.91.99.62:3000/api/auth/verify", {
    method: "GET",
    headers: {
      authorization: `bearer ${
        JSON.parse(localStorage.getItem("user"))[0].token
      }`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      if (response.isAdmin) {
        setisAdmin(true);
      } else {
        setisAdmin(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    fetch("http://51.91.99.62:3000/api/post", {
      method: "GET",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        let newpostsArray = [];
        data.forEach((objet) => {
          let isMyPostValue = false;

          if (
            objet.userId === JSON.parse(localStorage.getItem("user"))[0].userId
          ) {
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
            hadLiked: objet.usersLiked.includes(JSON.parse(localStorage.getItem("user"))[0].userId),
          };
          newpostsArray.push(newObjet);
        });
        console.log(newpostsArray);
        setPosts(newpostsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Header
        logout={true}
        addPost={true}
        backtoFeed={false}
        signup={false}
        login={false}
      />
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
            isAdmin={isAdmin}
          />
        ))}
      </section>
    </React.Fragment>
  );
}

export default Feed;
