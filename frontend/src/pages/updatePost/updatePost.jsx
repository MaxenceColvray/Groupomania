import UpdatePostForm from "../../components/updatePostForm/updatePostForm";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "./updatePost.css";

function UpdatePost() {
  const varUrl = useParams();
  console.log(varUrl);


  const [getTitleValue, setgetTitleValue] = useState("");


// call api ////////////////////////////
fetch("http://localhost:3000/api/post/" + varUrl.id, {
      method: "GET",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
      },
    })
      .then((res) => {
        console.log(res);

        return res.json();
      })
      .then((response) => {
        console.log(response);
        setgetTitleValue(response.title)


      })
      .catch((error) => {
        console.log(error);
      });


//////////////////////////////////////








  return (
    <section className="addpost">
      <div>
        <h1>Modifier un post</h1>
        <Link to="/feed"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      </div>
      <UpdatePostForm 
      title={getTitleValue}/>
    </section>
  );
}


export default UpdatePost;