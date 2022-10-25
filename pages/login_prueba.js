import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/style_login.module.css";
import Layout from "../components/Layout_Login";
import script from "../script"

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
  //{renderErrorMessage("uname")}            
  //{renderErrorMessage("pass")}
  const renderForm = (
    <div className={styles.form}>
      <form id="cuenta_login"> 
        <div className={styles.inputContainer}>
          <label for="user"> Usuario </label>                      
          <input id="user" type="text" name="uname" required className={styles.inputText}/>
          
        </div>
        <div className={styles.inputContainer}>
          <label for="password"> Contraseña </label>
          <input id="password" type="password" name="pass" required className={styles.inputPass}/>
          
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" className={styles.inputSubmit}/>
          <input type="button" className={styles.inputVolver} value="Volver"/>
        </div>        
      </form>
    </div>
  );
//{isSubmitted ? <div>User is successfully logged in</div> : renderForm}
  return (
      <Layout title="login_prueba">
        <div className={styles.app}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Iniciar Sesion</div>
          {renderForm}
        </div>
      </div>
      <script src={script}></script>
      </Layout>      
    );
}