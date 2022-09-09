import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";

import Login from "./pages/login/login";
import Signin from ".//pages/signin/signin";
import Feed from "./pages/feed/feed";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
