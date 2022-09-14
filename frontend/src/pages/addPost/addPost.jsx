import PostForm from "../../components/addPost/postForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "./addPost.css";

function AddPost() {
  return (
    <section className="addpost">
      <div>
        <h1>Ajouter un post</h1>
        <Link to="/feed"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      </div>
      <PostForm />
    </section>
  );
}

export default AddPost;
