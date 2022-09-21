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

    fetch("http://localhost:3000/api/post/" + varUrl.id, {
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

    fetch("http://localhost:3000/api/post/" + varUrl.id, {
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
    <form className="postform">
      <div>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>

      <div>
        <input id="my_file" type="file" />
        <img src={props.imageURL} alt={props.imageURL} />
      </div>

      <div>
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

      <input type="submit" value=" Modifier le Post" onClick={modifyPost} />

      <input type="submit" value=" supprimer le Post" onClick={deletePost} />

      <p id="errorPostMsg"></p>
    </form>
  );
}

export default UpdatePostForm;
