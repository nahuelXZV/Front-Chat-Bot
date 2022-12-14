import Layout from "../components/Layout_Login";
import React, { Component } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { setCookie } from 'cookies-next';

export default function SignUp() {
  const [nombre, setNombre] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState(null);

  const collectData = async () => {
    if (email !== "" && password !== "" && nombre !== "" && direccion !== "" && telefono !== "") {
      let config = {
        method: 'Post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, direccion, telefono, email, password })
      }
      let result = await fetch("https://chat-bot-topicos.herokuapp.com/api/users", config);
      result = await result.json();
      console.warn(result);
      if (result.error?.statusCode == 400 || result.error?.statusCode == 401) {
        setErrorLogin('Verifique los datos ingresados!');
        return;
      }
      if (result.status == 200 || result.status == 201) {
        setCookie('auth', 'true', { maxAge: 60 * 60 * 24 * 7 });
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "/tablero";
        return;
      }
    } else {
      setErrorLogin('Rellene todos los campos!!');
    }
  }

  return (
    <Layout title="Sign Up">
      <div className="w-full md:w-1/2 flex flex-col items-center " >
        {/* <!-- text login --> */}
        <h1 className="text-center text-2xl font-bold text-black mb-6">Registrarse</h1>
        {/* <!-- email input --> */}
        <div className="w-3/4 mb-4">
          <input onChange={(e) => setNombre(e.target.value)} value={nombre} type="text" name="Nombre" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Nombre" />
        </div>
        <div className="w-3/4 mb-4">
          <input onChange={(e) => setDireccion(e.target.value)} value={direccion} type="text" name="Direccion" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Direccion" />
        </div>
        <div className="w-3/4 mb-4">
          <input onChange={(e) => setTelefono(e.target.value)} value={telefono} type="text" name="Telefono" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Telefono" />
        </div>
        <div className="w-3/4 mb-4">
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="Email" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Email" />
        </div>
        <div className="w-3/4 mb-4">
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="Password" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Password" />
        </div>
        {errorLogin ? <div className="text-md text-red-500 mb-1 fond-bold">{errorLogin}</div> : ""}

        {/* <!-- button --> */}
        <div className="w-3/4 mt-4">
          <button onClick={collectData} type="submit" className="py-4 bg-aside w-full rounded text-blue-50 font-bold hover:bg-blue-700"> LOGIN</button>
        </div>
        <div className="w-3/4 mt-4">
          <Link href="/login">
            <button className="text-sm text-blue-500 font-bold hover:text-blue-700"> Tengo Cuenta</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}