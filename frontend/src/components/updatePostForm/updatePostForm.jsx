import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types'


import "./updatePostForm.css";

 function UpdatePostForm({title}) {

  const navigate = useNavigate();
  const varUrl = useParams();
  console.log(title)


  const [inputTitle, setInputTitle] = useState(title); //Ici je récup ma props title que j'insére dans ma state.
  // Ensuite je fais appel à ma state dans la value de InputTitle comme tu peux le voir plus bas.
  //Le probleme est que ma value ne s'affiche pas dans mon input quand j'utilise une props
  
  const [inputDescription, setInputDescription] = useState("");
  const [inputUrl, setinputUrl] = useState("");


  

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
      <div>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          value= {inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>

      <div>
        <input
          id="my_file"
          type="file"
          //value={}
          onChange={(e) => setinputUrl(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="text">Description</label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="10"
          //value={}
          onChange={(e) => setInputDescription(e.target.value)}
        ></textarea>
      </div>

      <input type="submit" value=" Modifier le Post" onClick={modifyPost} />

      <p id="errorPostMsg"></p>
    </form>
  );
}

UpdatePostForm.propTypes = {
  title: PropTypes.string,
}

export default UpdatePostForm;
