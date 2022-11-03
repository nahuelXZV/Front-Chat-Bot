import Layout from "../components/Layout_Login";
import React, { Component } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function SignUp() {
  const [nombre, setNombre] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState(null);

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      // router.push('/tablero');
      window.location.href = "/tablero";
    }
  }, []);

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
      let result = await fetch("http://localhost:3010/api/users/register", config);
      result = await result.json();
      console.warn(result);
      if (result.error?.statusCode == 400 || result.error?.statusCode == 401) {
        setErrorLogin('Verifique los datos ingresados!');
        return;
      }
      if (result.status == 200) {
        localStorage.setItem("user", JSON.stringify(result));
        // router.push('/tablero');
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
            <a className="text-sm text-blue-500 font-bold hover:text-blue-700"> Tengo Cuenta</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}