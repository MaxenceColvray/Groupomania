import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Feed from "./pages/feed/feed";
import AddPost from "./pages/addPost/addPost"
import UpdatePost from "./pages/updatePost/updatePost"


function App() {
  return (
    <React.Fragment>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/:id" element={<UpdatePost />} />
        


      </Routes>
    </React.Fragment>
  );
}

export default App;
