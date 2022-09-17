import UpdatePostForm from "../../components/updatePostForm/updatePostForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "./updatePost.css";

function UpdatePost() {
  return (
    <section className="addpost">
      <div>
        <h1>Modifier un post</h1>
        <Link to="/feed"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      </div>
      <UpdatePostForm />
    </section>
  );
}

export default UpdatePost;