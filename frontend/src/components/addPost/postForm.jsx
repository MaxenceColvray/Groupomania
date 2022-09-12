import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputUrl, setinputUrl] = useState("");

  const navigate = useNavigate();

  /*const ss = (e) => {
    console.log(e.target.files)
    console.log(e.target.files[0])

  }*/

  const post = (e) => {
    e.preventDefault();
    let postObject = { title: inputTitle, description: inputDescription, imageURL: inputUrl  };

    const formData  = new FormData();
    formData.append('title', inputTitle);
    formData.append('image', document.getElementById('my_file').files);
    
    console.log(postObject);
    fetch("http://localhost:3000/api/post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => {
        console.log(response.status);
        let errorPostMsg = document.getElementById("errorPostMsg");
        if (response.status !== 201) {
          errorPostMsg.textContent =
            "Tous les champs sont requis.  Erreur: " + response.status;
            console.log(inputUrl)
        } else {
          alert("Votre post " + postObject.title + " a bien été crée");
          navigate("/feed");
        }
      })
      .catch(() => {
        console.log("erreur");
      });
  };

  return (
    <form /*method="post" enctype="multipart/form-data"*/ >
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        id="title"
        name="title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
      />

      <input id="my_file" type="file" value={inputUrl} onChange={(e) => setinputUrl(e.target.value)} />

      <input type="submit" value="Poster" onClick={post}/>

      <p id="errorPostMsg"></p>
    </form>
  );
}

export default PostForm;
