import SignupForm from "../../components/connectionForms/signupForm/signupForm";
import React from "react";
import Header from "../../components/header/header";
import "./signup.css";

function signup() {
  return (
    <React.Fragment>
      <Header
        logout={false}
        addPost={false}
        backtoFeed={false}
        signup={false}
        login={true}
      />
      <section className="signup">
        <SignupForm />
      </section>
    </React.Fragment>
  );
}

export default signup;
