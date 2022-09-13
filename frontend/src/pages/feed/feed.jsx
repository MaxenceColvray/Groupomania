import Post from "../../components/posts/post";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const plantList = [
  "monstera",
  "ficus lyrata",
  "pothos argenté",
  "yucca",
  "palmier",
];

const posts = [
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
];
function Feed() {
  useEffect(() => {
    fetch("http://localhost:3000/api/post")
      .then((response) => {
        return response.json();
      })
      .then((o) => {
        console.log(o);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      
      <Link to="/addpost">Ajouter un post</Link>
      {posts.map((post, index) => (
        <div key={`${post}-${index}`}>
          <h1>{post.name}</h1> 
          <p>{post.category}</p>
          if (post.name == ficus lyrata) {
            <h1>{post.name}</h1>
            
          }



        </div>
      ))}
    </div>
  );
}

export default Feed;
