import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./updatePostForm.css";

function UpdatePostForm(props) {
  const navigate = useNavigate();
  const varUrl = useParams();

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  useEffect(() => {
    setInputTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setInputDescription(props.description);
  }, [props.description]);

  const modifyPost = (e) => {
    e.preventDefault();
    console.log(document.getElementById("my_file").files[0]);

    const formData = new FormData();
    formData.append("title", inputTitle);
    formData.append("description", inputDescription);
    formData.append("image", document.getElementById("my_file").files[0]);

    console.log(formData);

    fetch("http://51.91.99.62:3000/api/post/" + varUrl.id, {
      method: "put",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
      },
      body: formData,
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);

        let errorPostMsg = document.getElementById("errorPostMsg");
        if (response.status !== 200) {
          errorPostMsg.textContent =
            "Tous les champs sont requis.  Erreur: " + response.status;
        } else {
          alert("Votre post '" + inputTitle + "' a bien été modifé");
          navigate("/feed");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };
  const deletePost = (e) => {
    e.preventDefault();

    fetch("http://51.91.99.62:3000/api/post/" + varUrl.id, {
      method: "delete",
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))[0].token
        }`,
      },
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);

        let errorPostMsg = document.getElementById("errorPostMsg");
        if (response.status !== 200) {
          errorPostMsg.textContent =
            "Tous les champs sont requis.  Erreur: " + response.status;
        } else {
          alert("Votre post '" + inputTitle + "' a bien été supprimé");
          navigate("/feed");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form className="update_postform">
      <h2 className="loginForm_title">Modifier votre post</h2>
      <div className="update_field">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>

      <div className="update_field">
        <input id="my_file" type="file" />
        <div className="box_img_input">
          <img src={props.imageURL} alt={props.imageURL} />
        </div>
      </div>

      <div className="update_field">
        <label htmlFor="text">Description</label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="10"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="box_submit">
      <input type="submit" value=" Modifier le Post"  className="UpdateForm_submit" onClick={modifyPost} />

      <input type="submit" value=" supprimer le Post"  className="UpdateForm_delete" onClick={deletePost} />
      </div>

      <p id="errorPostMsg"></p>
    </form>
  );
}

export default UpdatePostForm;
