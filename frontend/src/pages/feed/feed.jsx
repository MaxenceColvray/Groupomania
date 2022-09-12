import Post from "../../components/posts/post";
import { Link } from "react-router-dom";


function Feed() {
  return (
    <div>
      <Post />
      <Link to="/addpost">Ajouter un post</Link>

    </div>
  );
}

export default Feed;
