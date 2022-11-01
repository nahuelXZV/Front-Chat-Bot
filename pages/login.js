import styles from "../styles/style_login.module.css";
import Layout from "../components/Layout_Login";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  //const login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState({});

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth){
      router.push('/tablero');
    }
  }, [])

  const errors = {
    uname: "invalid email",
    pass: "invalid password"
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  const handleLogin = async (e) => {
    e.preventDefault();
    let config = {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    let result = await fetch("http://localhost:3010/api/auth/login", config);    
    result = await result.json();
    console.warn(result);
    if ("email" === result.error) {      
      setErrorMessages({ name: "uname", message: errors.uname });
    } else {      
      if (result.error === "password") {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result));
        router.push('/tablero');
      }
    }
  };

  return (
    <Layout title="login">
      <div className={styles.app}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Iniciar Sesion</div>
          <div className={styles.form}>
            <form id="cuenta_login" onSubmit={handleLogin}>
              <div className={styles.inputContainer}>
                <label> Usuario </label>
                <input type="text" name="uname" required className={styles.inputText}
                  onChange={(e) => setEmail(e.target.value)} value={email} />
                {renderErrorMessage("uname")}
              </div>
              <div className={styles.inputContainer}>
                <label> Contraseña </label>
                <input type="password" name="pass" required className={styles.inputPass}
                  onChange={(e) => setPassword(e.target.value)} value={password} />
                {renderErrorMessage("pass")}
              </div>
              <div className={styles.buttonContainer}>
                <input type="submit" className={styles.inputSubmit} />

                <button onClick={handleLogin} type="button" className={styles.inputVolver}>Volver</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
