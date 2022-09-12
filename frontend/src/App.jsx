import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Feed from "./pages/feed/feed";
import AddPost from "./pages/addPost/addPost"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
