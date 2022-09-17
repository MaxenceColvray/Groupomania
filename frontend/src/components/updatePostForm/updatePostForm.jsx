import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./updatePostForm.css";

async function UpdatePostForm() {
  const navigate = useNavigate();
  const varUrl = useParams();
  const y = "10"
  const [inputTitle, setInputTitle] = useState(y);
  const [inputDescription, setInputDescription] = useState("");
  const [inputUrl, setinputUrl] = useState("");

  const [getTitleValue, setgetTitleValue] = useState("");

  //const [getDescriptionValue, setgetDescriptionValue] = useState("");
  //const [getUrlValue, setgetUrlValue] = useState("");
  const o = ""
   await fetch("http://localhost:3000/api/post/" + varUrl.id, {
    method: "get",
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
     .then((result) => {
     console.log(result);
      const o = result.title


      //setgetTitleValue(result.title);
    })
    .catch(() => {
      console.log("erreur");
    });

    console.log(o)
    



  /*const modifyPost = (e) => {
      e.preventDefault();
      console.log(document.getElementById("my_file").files[0]);
  
      const formData = new FormData();
      formData.append("title", inputTitle);
      formData.append("description", inputDescription);
      formData.append("image", document.getElementById("my_file").files[0]);
  
      console.log(formData);
  
      fetch("http://localhost:3000/api/post/"+ varUrl.id, {
        method: "put",
        headers: {
          authorization: `bearer ${(JSON.parse(localStorage.getItem('user')))[0].token}`,
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
    };*/

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

      <input type="submit" value=" Modifier le Post" /*onClick={modifyPost}*/ />

      <p id="errorPostMsg"></p>
    </form>
  );
}

export default UpdatePostForm;
