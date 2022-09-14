//import Post from "../../components/posts/post";
//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*const posts = [
  {
    name: "monstera",
    category: "classique",
    id: "1ed",
  },
  {
    name: "ficus lyrata",
    category: "classique",
    id: "2ab",
  },
  {
    name: "pothos argenté",
    category: "classique",
    id: "3sd",
  },
];*/

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/post")
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
    <div>
      {posts.map((post, index) => (
        <div key={`${post}-${index}`}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default Feed;
