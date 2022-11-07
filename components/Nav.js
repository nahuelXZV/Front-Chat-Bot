import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/LayoutContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';

export default function Nav() {
  const router = useRouter();
  const layotContext = useAppContext();
  const [open, setOpen] = useState(false);
  const [usuario, setUser] = useState('');
  const [email, setEmail] = useState('');

  function local() {
    if (typeof window !== 'undefined') {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user?.body?.empleado?.nombre ? user.body.empleado.nombre : "Usuario";
    }
  }

  function local2() {
    if (typeof window !== 'undefined') {
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user?.body?.user?.email ? user.body.user.email : "correo@live.com";
    }
  }

  useEffect(() => {
    setUser(local());
    setEmail(local2());
  }, []);


  function exit() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
      deleteCookie('auth');
      router.push("/login");
    }
  }

  function toggle() {
    layotContext.toggleSidbarMenu();
  }

  function toggleD() {
    setOpen(!open);
  }

  function handlerSearchOpen() {
    layotContext.setIsSettingsPanelOpen();
  }

  let styleOpen = layotContext.isSidebarOpen
    ? "w-5 h-5 text-gray-600"
    : "w-5 h-5 text-gray-600 transform transition-transform -rotate-180";

  let styleOpenD = open
    ? `absolute right-0 z-20 w-60 py-2 mt-2 mr-8 overflow-hidden bg-white rounded-md shadow-xl`
    : "hidden absolute right-0 z-20 w-60 py-2 mt-2 mr-8 overflow-hidden bg-white rounded-md shadow-xl";


  return (
    <header className="flex-shrink-0 border-b-2 bg-fondo p-1">
      <div className="flex items-center justify-between p-2">
        {/* Navbar left */}
        <div className="flex items-center">
          <Link href="/" className="lg:hidden">
            <a className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
              Pizzaria
            </a>
          </Link>
          <button
            className="p-2 rounded-md focus:outline-none focus:ring text-gray-500"
            onClick={toggle}          >
            <svg className={styleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="relative flex justify-center space-x-3 mr-8">
          <div className="relative">
            <button onClick={toggleD} className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-fondo border border-transparent rounded-md">
              <span className="mx-1 font-bold">{usuario}</span>
              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styleOpenD}>
        <button className="w-full flex items-start p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100 ">
          <div className="mx-4 ml-2 w-full">
            {/* imagen redonda */}
            <div className="relative w-12 h-12 mx-auto mb-2 overflow-hidden rounded-full">
              <Image
                src="/images/user.png"
                alt="user"
                layout="fill"
                objectFit="cover"
                width={20}
                height={20}
              />
            </div>
            <h1 className="text-sm font-semibold text-gray-700">
              {usuario}
              <p className="text-sm text-gray-500">{email}</p>
            </h1>
          </div>
        </button>
        <hr className="border-gray-200" />
        <button onClick={exit} className="font-bold w-full block px-4 py-3 text-md text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100">
          {/* icono de cerrar sesion felcha saliendo*/}
          <h4 className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline-block mr-2 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar Sesion
          </h4>
        </button>
      </div>
    </header >
  );
}
