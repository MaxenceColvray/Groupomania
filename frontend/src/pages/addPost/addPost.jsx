import PostForm from "../../components/addPost/postForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import "./addPost.css"


function AddPost() {
  return (
    <section>
      <div>
      <h1>Ajouter un post</h1>
      <Link to="/feed"><FontAwesomeIcon icon="fa-solid fa-hand-back-point-left" /></Link>
      </div>
      <PostForm/>
  </section>
  );
}

export default AddPost;
