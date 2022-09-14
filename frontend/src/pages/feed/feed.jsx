import Postcomponent from "../../components/posts/post";
//import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./feed.css"

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
    <section className="feed">
      {posts.map((post) => (
        <Postcomponent
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
