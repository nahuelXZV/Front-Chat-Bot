import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/style_login.module.css";
import Layout from "../components/Layout_Login";

export default function Login() {  
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Username </label>
          <input type="text" name="uname" required className={styles.inputText}/>
          {renderErrorMessage("uname")}
        </div>
        <div className={styles.inputContainer}>
          <label>Password </label>
          <input type="password" name="pass" required className={styles.inputPass}/>
          {renderErrorMessage("pass")}
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" className={styles.inputSubmit}/>
        </div>
      </form>
    </div>
  );

  return (
      <Layout title="login_prueba">
        <div className={styles.app}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Sign In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
      </Layout>      
    );
}
