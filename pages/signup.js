import styles from "../styles/style_login.module.css";
import Layout from "../components/Layout_Login";

import React, { Component } from "react";
import {useRouter} from "next/router";

export default function SignUp() {
//const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const router = useRouter();

  const errors = {
    email: "Email ya registrado",
    pass: "Minimo 8 caracteres"
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  const collectData = async () => {  
    let config = {
        method: 'Post',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
        
    }          
      let result = await fetch("http://localhost:3010/api/users/register",config);    
      result = await result.json();
      console.warn(result);
      if("email" === result.error){
        console.log("entra");
        setErrorMessages({ name: "email", message: errors.email });
      }else{
        console.log("no entra");
        if(result.error === "password"){
          setErrorMessages({ name: "pass", message: errors.pass });
        }else{            
          console.warn(result);
          router.push('/tablero'); 
        }
        
      }
    }  

  return (
    <Layout title="signup">
      <div className={styles.app}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Registrar usuario</div>
          <div className={styles.form}>            
              <div className={styles.inputContainer}>
                <label> Usuario </label>
                <input type="text" required className={styles.inputText} onChange={(e) => setEmail(e.target.value)} value={email}/>
                {renderErrorMessage("email")}
              </div>
              <div className={styles.inputContainer}>
                <label> Contraseña </label>
                <input type="password" required className={styles.inputPass} onChange={(e) => setPassword(e.target.value)} value={password}/>
                {renderErrorMessage("pass")}
              </div>
              <div className={styles.buttonContainer}>                
                <button onClick={collectData} type="button" className={styles.inputVolver}>Registrar</button>
              </div>            
          </div>
        </div>
      </div>
    </Layout>
  );
}