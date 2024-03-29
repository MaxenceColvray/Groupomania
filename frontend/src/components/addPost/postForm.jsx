import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./postForm.css";

function PostForm() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const navigate = useNavigate();

  const post = (e) => {
    e.preventDefault();
    console.log(document.getElementById("my_file").files[0]);

    const formData = new FormData();
    formData.append("title", inputTitle);
    formData.append("description", inputDescription);
    formData.append("image", document.getElementById("my_file").files[0]);

    console.log(formData);

    const token = (JSON.parse(localStorage.getItem('user')))[0].token
    fetch("http://51.91.99.62:3000/api/post", {
      method: "post",
      headers: {
        authorization: `bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);

        let errorPostMsg = document.getElementById("errorPostMsg");
        if (response.status !== 201) {
          errorPostMsg.textContent =
            "Tous les champs sont requis.  Erreur: " + response.status;
        } else {
          alert("Votre post '" + inputTitle + "' a bien été crée");
          navigate("/feed");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form className="postform">
      <h2 className="postForm_title">Ajouter un post</h2>
      <div className="post_field">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>

      <div className="post_field">
        <input
          id="my_file"
          type="file"
          name="file"
        />
      </div>

      <div className="post_field">
        <label htmlFor="text">Description</label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="10"
          onChange={(e) => setInputDescription(e.target.value)}
        ></textarea>
      </div>

      <input type="submit" value="Poster !" className="PostForm_submit" onClick={post} />

      <p id="errorPostMsg"></p>
    </form>
  );
}

export default PostForm;
