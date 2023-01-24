import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Post(props) {
  console.log(props.hadLiked);
  const [isClicked, setisClicked] = useState(props.hadLiked);
  const [likes, setlikes] = useState(props.likes);

  
  console.log(props.isMyPost);
  console.log(props.hadLiked);
  console.log(props.id);

  const like = (e) => {
    e.preventDefault();
    setisClicked(true);
    setlikes(likes + 1 )
    const objectLike = {
      _id: props.id,
      like: 1,
    };
    fetch("http://51.91.99.62:3000/api/post/" + props.id + "/like", {
      method: "put",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectLike),
    })
      .then((res) => {

        return res.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removelike = (e) => {
    e.preventDefault();
    setisClicked(false);
    setlikes(likes - 1 )
    const objectLike = {
      _id: props.id,
      like: 0,
    };
    fetch("http://51.91.99.62:3000/api/post/" + props.id + "/like", {
      method: "put",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectLike),
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="post">
      <div className="box_pseudo">
        <p className="pseudo">{props.name}</p>
      </div>
      <div className="box_title">
        <h2 className="title">{props.title}</h2>
      </div>
      <div className="box_description">
        <p className="description">{props.description}</p>
      </div>
      <div className="box_img">
        <img src={props.imageURL} alt={props.imageURL} />
      </div>
      <div className="social_bar">
        <div>
          {isClicked /*|| props.hadLiked*/ ? (
            <div className="box_like">
              <button onClick={removelike} className="red_like like_button">
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
              {/* {props.hadLiked ? (
                <p className="likes_counter">{props.likes}</p>
              ) : (
                <p className="likes_counter">{props.likes + 1}</p>
              )} */}
              <p className="likes_counter">{likes}</p>
            </div>
          ) : (
            <div className="box_like">
              <button onClick={like} className="like_button">
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
              {/* {props.hadLiked ? (
                <p className="likes_counter">{props.likes - 1}</p>
              ) : (
                <p className="likes_counter">{props.likes}</p>
              )} */}
              <p className="likes_counter">{likes}</p>
            </div>
          )}
        </div>

        <div className="box_social_button">
          {props.isMyPost || props.isAdmin ? (
            <Link to={"/" + props.id}>
              <i className="fa-solid fa-gear"></i>
            </Link>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
