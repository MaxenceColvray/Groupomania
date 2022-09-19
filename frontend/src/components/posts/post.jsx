import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Post(props) {
  const [isClicked, setisClicked] = useState(props.hadLiked);

  
  //props.hadLiked ? setisClicked(true) : setisClicked(false);


  console.log(props.hadLiked);
  const like = (e) => {
    e.preventDefault();
    setisClicked(true);
    const objectLike = {
      _id: props.id,
      like: 1,
    };
    fetch("http://localhost:3000/api/post/" + props.id + "/like", {
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
    const objectLike = {
      _id: props.id,
      like: 0,
    };
    fetch("http://localhost:3000/api/post/" + props.id + "/like", {
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
          {isClicked ? (
            <div>
              <button onClick={removelike} className="displayGreen">
                <i className="fa-regular fa-thumbs-up"></i>
              </button>
              <p>{props.likes + 1}</p>
            </div>
          ) : (
            <div>
              <button onClick={like}>
                <i className="fa-regular fa-thumbs-up"></i>
              </button>
              <p>{props.likes}</p>
            </div>
          )}
        </div>

        <div>
          {props.isMyPost ? (
            <button>
              <Link to={"/" + props.id}>
                <i className="fa-solid fa-comments"></i>
              </Link>
            </button>
          ) : (
            <button>
              <Link to="/">
                <i className="fa-regular fa-thumbs-up"></i>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
