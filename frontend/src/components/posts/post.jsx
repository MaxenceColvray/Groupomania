import "./post.css";
import { Link } from "react-router-dom";


function Post(props) {
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
          <button>
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <p>0</p>
        </div>

        <div>
          <button>
            <Link to="/:postId">
              <i class="fa-solid fa-comments"></i>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
