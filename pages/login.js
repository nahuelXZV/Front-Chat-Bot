import Layout from "../components/Layout_Login";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { setCookie } from 'cookies-next';

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const [passError, setPassError] = React.useState(null);
  const [errorLogin, setErrorLogin] = React.useState(null);

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      let config = {
        method: 'Post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
      //let result = await fetch("https://chat-bot-topicos.herokuapp.com/api/auth/login", config);
      console.log(config);
      let result = await fetch("http://localhost:3010/api/auth/login", config);
      result = await result.json();
      console.log(result);
      if (result.error?.statusCode == 400 || result.error?.statusCode == 401) {
        setErrorLogin('Usuario o contraseña incorrectos!');
        return;
      }
      if (result.status == 200) {
        // guardar en los cookies token y usuario 
        setCookie('auth', 'true', { maxAge: 60 * 60 * 24 * 7 });
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "/tablero";
        return;
      }
    }
    email === "" ? setEmailError("El campo email es requerido") : "";
    password === "" ? setPassError("El campo password es requerido") : "";
    return;
  };

  return (
    <Layout title="login">
      <div className="w-full md:w-1/2 flex flex-col items-center " >
        {/* <!-- text login --> */}
        <h1 className="text-center text-2xl font-bold text-black mb-6">LOGIN</h1>

        {/* <!-- email input --> */}
        <div className="w-3/4 mb-6">
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="User Name" />
          {/* mensaje de error */}
          {emailError ? <div className="text-sm text-red-500 mt-2">{emailError}</div> : ""}
        </div>
        {/* <!-- password input -->{} */}
        <div className="w-3/4 mb-6">
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 " placeholder="Password" />
          {passError ? <div className="text-sm text-red-500 mt-2">{passError}</div> : ""}
        </div>
        {errorLogin ? <div className="text-md text-red-500 mb-4 fond-bold">{errorLogin}</div> : ""}
        {/* <!-- button --> */}
        <div className="w-3/4 mt-4">
          <button onClick={handleLogin} type="submit" className="py-4 bg-aside w-full rounded text-blue-50 font-bold hover:bg-blue-700"> LOGIN</button>
        </div>
        {/* registrarse */}
        <div className="w-3/4 mt-4">
          {/* texto de registrarse con LINK */}
          <Link href="/signup">
            <a className="text-sm text-blue-500 font-bold hover:text-blue-700"> Registrarse</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
